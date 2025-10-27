import { FuncionarioClinicaRepository } from './repository';
import { FuncionarioClinica } from '../../types';

export class FuncionarioClinicaService {
  private funcionarioClinicaRepository: FuncionarioClinicaRepository;

  constructor() {
    this.funcionarioClinicaRepository = new FuncionarioClinicaRepository();
  }

  async create(data: FuncionarioClinica): Promise<FuncionarioClinica> {
    console.log(`Criando relação funcionário-clínica: ${data.funcionarioCpf} - ${data.clinicaCnpj}`);

    const existing = await this.funcionarioClinicaRepository.findByCpfAndCnpj(
      data.funcionarioCpf,
      data.clinicaCnpj,
    );

    if (existing) {
      throw new Error('Relação funcionário-clínica já existe');
    }

    const funcionarioClinica = await this.funcionarioClinicaRepository.create(data);
    console.log('Relação funcionário-clínica criada com sucesso');
    return funcionarioClinica;
  }

  async findByCpfAndCnpj(funcionarioCpf: string, clinicaCnpj: string): Promise<FuncionarioClinica | null> {
    console.log(`Buscando relação funcionário-clínica: ${funcionarioCpf} - ${clinicaCnpj}`);
    const funcionarioClinica = await this.funcionarioClinicaRepository.findByCpfAndCnpj(
      funcionarioCpf,
      clinicaCnpj,
    );
    return funcionarioClinica;
  }

  async getAll(): Promise<FuncionarioClinica[]> {
    console.log('Buscando todas as relações funcionário-clínica');
    const funcionariosClinicas = await this.funcionarioClinicaRepository.findAll();
    console.log(`Encontradas ${funcionariosClinicas.length} relações`);
    return funcionariosClinicas;
  }

  async getByFuncionario(funcionarioCpf: string) {
    console.log(`Buscando clínicas do funcionário: ${funcionarioCpf}`);
    const resultados = await this.funcionarioClinicaRepository.findByFuncionario(funcionarioCpf);
    console.log(`Encontradas ${resultados.length} clínicas`);
    return resultados;
  }

  async getByClinica(clinicaCnpj: string) {
    console.log(`Buscando funcionários da clínica: ${clinicaCnpj}`);
    const resultados = await this.funcionarioClinicaRepository.findByClinica(clinicaCnpj);
    console.log(`Encontrados ${resultados.length} funcionários`);
    return resultados;
  }

  async delete(funcionarioCpf: string, clinicaCnpj: string): Promise<boolean> {
    console.log(`Deletando relação funcionário-clínica: ${funcionarioCpf} - ${clinicaCnpj}`);

    const existing = await this.funcionarioClinicaRepository.findByCpfAndCnpj(
      funcionarioCpf,
      clinicaCnpj,
    );

    if (!existing) {
      console.log('Relação não encontrada');
      return false;
    }

    const deleted = await this.funcionarioClinicaRepository.delete(funcionarioCpf, clinicaCnpj);

    if (deleted) {
      console.log('Relação deletada com sucesso');
    } else {
      console.log('Falha ao deletar relação');
    }

    return deleted;
  }
}

export default new FuncionarioClinicaService();

