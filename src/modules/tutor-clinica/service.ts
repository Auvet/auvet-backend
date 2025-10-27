import { TutorClinicaRepository } from './repository';
import { TutorClinica } from '../../types';

export class TutorClinicaService {
  private tutorClinicaRepository: TutorClinicaRepository;

  constructor() {
    this.tutorClinicaRepository = new TutorClinicaRepository();
  }

  async create(data: TutorClinica): Promise<TutorClinica> {
    console.log(`Criando relação tutor-clínica: ${data.tutorCpf} - ${data.clinicaCnpj}`);

    const existing = await this.tutorClinicaRepository.findByCpfAndCnpj(
      data.tutorCpf,
      data.clinicaCnpj,
    );

    if (existing) {
      throw new Error('Relação tutor-clínica já existe');
    }

    const tutorClinica = await this.tutorClinicaRepository.create(data);
    console.log('Relação tutor-clínica criada com sucesso');
    return tutorClinica;
  }

  async findByCpfAndCnpj(tutorCpf: string, clinicaCnpj: string): Promise<TutorClinica | null> {
    console.log(`Buscando relação tutor-clínica: ${tutorCpf} - ${clinicaCnpj}`);
    const tutorClinica = await this.tutorClinicaRepository.findByCpfAndCnpj(tutorCpf, clinicaCnpj);
    return tutorClinica;
  }

  async getAll(): Promise<TutorClinica[]> {
    console.log('Buscando todas as relações tutor-clínica');
    const tutoresClinicas = await this.tutorClinicaRepository.findAll();
    console.log(`Encontradas ${tutoresClinicas.length} relações`);
    return tutoresClinicas;
  }

  async getByTutor(tutorCpf: string) {
    console.log(`Buscando clínicas do tutor: ${tutorCpf}`);
    const resultados = await this.tutorClinicaRepository.findByTutor(tutorCpf);
    console.log(`Encontradas ${resultados.length} clínicas`);
    return resultados;
  }

  async getByClinica(clinicaCnpj: string) {
    console.log(`Buscando tutores da clínica: ${clinicaCnpj}`);
    const resultados = await this.tutorClinicaRepository.findByClinica(clinicaCnpj);
    console.log(`Encontrados ${resultados.length} tutores`);
    return resultados;
  }

  async delete(tutorCpf: string, clinicaCnpj: string): Promise<boolean> {
    console.log(`Deletando relação tutor-clínica: ${tutorCpf} - ${clinicaCnpj}`);

    const existing = await this.tutorClinicaRepository.findByCpfAndCnpj(tutorCpf, clinicaCnpj);

    if (!existing) {
      console.log('Relação não encontrada');
      return false;
    }

    const clínicas = await this.tutorClinicaRepository.findByTutor(tutorCpf);
    if (clínicas.length === 1) {
      throw new Error('Tutor deve estar vinculado a pelo menos uma clínica. Não é possível remover a última clínica.');
    }

    const deleted = await this.tutorClinicaRepository.delete(tutorCpf, clinicaCnpj);

    if (deleted) {
      console.log('Relação deletada com sucesso');
    } else {
      console.log('Falha ao deletar relação');
    }

    return deleted;
  }
}

export default new TutorClinicaService();

