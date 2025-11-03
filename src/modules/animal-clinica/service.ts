import { AnimalClinicaRepository } from './repository';
import { AnimalClinica } from '../../types';

export class AnimalClinicaService {
  private animalClinicaRepository: AnimalClinicaRepository;

  constructor() {
    this.animalClinicaRepository = new AnimalClinicaRepository();
  }

  async create(data: AnimalClinica): Promise<AnimalClinica> {
    console.log(`Criando relação animal-clínica: ${data.animalId} - ${data.clinicaCnpj}`);

    const existing = await this.animalClinicaRepository.findByAnimalIdAndCnpj(
      data.animalId,
      data.clinicaCnpj,
    );

    if (existing) {
      throw new Error('Relação animal-clínica já existe');
    }

    const animalClinica = await this.animalClinicaRepository.create(data);
    console.log('Relação animal-clínica criada com sucesso');
    return animalClinica;
  }

  async findByAnimalIdAndCnpj(animalId: number, clinicaCnpj: string): Promise<AnimalClinica | null> {
    console.log(`Buscando relação animal-clínica: ${animalId} - ${clinicaCnpj}`);
    const animalClinica = await this.animalClinicaRepository.findByAnimalIdAndCnpj(animalId, clinicaCnpj);
    return animalClinica;
  }

  async getAll(): Promise<AnimalClinica[]> {
    console.log('Buscando todas as relações animal-clínica');
    const animaisClinicas = await this.animalClinicaRepository.findAll();
    console.log(`Encontradas ${animaisClinicas.length} relações`);
    return animaisClinicas;
  }

  async getByAnimal(animalId: number) {
    console.log(`Buscando clínicas do animal: ${animalId}`);
    const resultados = await this.animalClinicaRepository.findByAnimal(animalId);
    console.log(`Encontradas ${resultados.length} clínicas`);
    return resultados;
  }

  async getByClinica(clinicaCnpj: string) {
    console.log(`Buscando animais da clínica: ${clinicaCnpj}`);
    const resultados = await this.animalClinicaRepository.findByClinica(clinicaCnpj);
    console.log(`Encontrados ${resultados.length} animais`);
    return resultados;
  }

  async delete(animalId: number, clinicaCnpj: string): Promise<boolean> {
    console.log(`Deletando relação animal-clínica: ${animalId} - ${clinicaCnpj}`);

    const existing = await this.animalClinicaRepository.findByAnimalIdAndCnpj(animalId, clinicaCnpj);

    if (!existing) {
      console.log('Relação não encontrada');
      return false;
    }

    const deleted = await this.animalClinicaRepository.delete(animalId, clinicaCnpj);

    if (deleted) {
      console.log('Relação deletada com sucesso');
    } else {
      console.log('Falha ao deletar relação');
    }

    return deleted;
  }
}

export default new AnimalClinicaService();

