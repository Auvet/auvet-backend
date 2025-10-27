import { Tutor, Usuario } from '../../types';
import { TutorRepository } from './repository';
import { UsuarioService } from '../usuario/service';
import { TutorClinicaService } from '../tutor-clinica/service';
import { TutorValidator } from '../../utils/validators';

export class TutorService {
  private tutorRepository: TutorRepository;
  private usuarioService: UsuarioService;
  private tutorClinicaService: TutorClinicaService;

  constructor() {
    this.tutorRepository = new TutorRepository();
    this.usuarioService = new UsuarioService();
    this.tutorClinicaService = new TutorClinicaService();
  }

  async createTutor(
    usuarioData: Usuario,
    tutorData: Omit<Tutor, 'cpf'>,
    clinicasCnpj: string[],
  ): Promise<Tutor> {
    console.log(`Iniciando criação de tutor para CPF: ${usuarioData.cpf}`);

    // Validar que pelo menos uma clínica foi informada
    if (!clinicasCnpj || clinicasCnpj.length === 0) {
      throw new Error('Tutor deve estar vinculado a pelo menos uma clínica');
    }

    const validation = TutorValidator.validateTutorData({
      cpf: usuarioData.cpf,
      nome: usuarioData.nome,
      email: usuarioData.email,
      senha: usuarioData.senha,
      telefone: tutorData.telefone,
      endereco: tutorData.endereco,
    });

    if (!validation.isValid) {
      throw new Error(validation.errors.join(', '));
    }

    const existingUsuario = await this.usuarioService.getByCpf(usuarioData.cpf);
    if (existingUsuario) {
      console.log(`Usuário já existe com CPF: ${usuarioData.cpf}`);
      throw new Error('Usuário já cadastrado com este CPF');
    }

    const existingTutor = await this.tutorRepository.findByCpf(usuarioData.cpf);
    if (existingTutor) {
      console.log(`Tutor já existe com CPF: ${usuarioData.cpf}`);
      throw new Error('Tutor já cadastrado com este CPF');
    }

    const usuario = await this.usuarioService.create(usuarioData);
    console.log(`Usuário criado com sucesso: ${usuario.cpf}`);

    const tutor = await this.tutorRepository.create({
      cpf: usuarioData.cpf,
      ...tutorData,
    });

    console.log(`Tutor criado com sucesso: ${tutor.cpf}`);

    for (const cnpj of clinicasCnpj) {
      try {
        await this.tutorClinicaService.create({
          tutorCpf: tutor.cpf,
          clinicaCnpj: cnpj,
        });
        console.log(`Tutor vinculado à clínica: ${cnpj}`);
      } catch (error) {
        console.error(`Erro ao vincular tutor à clínica ${cnpj}:`, error);
      }
    }

    return tutor;
  }

  async getByCpf(cpf: string): Promise<Tutor | null> {
    console.log(`Buscando tutor por CPF: ${cpf}`);

    const tutor = await this.tutorRepository.findByCpf(cpf);

    if (tutor) {
      console.log(`Tutor encontrado: ${tutor.cpf}`);
    } else {
      console.log(`Tutor não encontrado para CPF: ${cpf}`);
    }

    return tutor;
  }

  async getAll(): Promise<Tutor[]> {
    console.log('Buscando todos os tutores');

    const tutores = await this.tutorRepository.findAll();

    console.log(`Encontrados ${tutores.length} tutores`);

    return tutores;
  }

  async update(cpf: string, updateData: Partial<Tutor>): Promise<Tutor | null> {
    console.log(`Atualizando tutor CPF: ${cpf}`);

    const tutor = await this.tutorRepository.update(cpf, updateData);

    if (tutor) {
      console.log(`Tutor atualizado com sucesso: ${tutor.cpf}`);
    } else {
      console.log(`Falha ao atualizar tutor CPF: ${cpf}`);
    }

    return tutor;
  }

  async delete(cpf: string): Promise<boolean> {
    console.log(`Deletando tutor CPF: ${cpf}`);

    const deleted = await this.tutorRepository.delete(cpf);

    if (deleted) {
      console.log(`Tutor deletado com sucesso: ${cpf}`);
    } else {
      console.log(`Falha ao deletar tutor CPF: ${cpf}`);
    }

    return deleted;
  }
}

export default new TutorService();
