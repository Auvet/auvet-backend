import { Vacina } from '../../types';
import { VacinaRepository } from './repository';
import { VacinaValidator } from '../../utils/validators';

export class VacinaService {
  private vacinaRepository: VacinaRepository;

  constructor() {
    this.vacinaRepository = new VacinaRepository();
  }

  async createVacina(vacinaData: Omit<Vacina, 'id'>): Promise<Vacina> {
    console.log(`Iniciando criação de vacina: ${vacinaData.nome}`);

    const validation = VacinaValidator.validateVacinaData(vacinaData);

    if (!validation.isValid) {
      throw new Error(validation.errors.join(', '));
    }

    const vacina = await this.vacinaRepository.create(vacinaData);

    console.log(`Vacina criada com sucesso: ${vacina.id} - ${vacina.nome}`);

    return vacina;
  }

  async getById(id: number): Promise<Vacina | null> {
    console.log(`Buscando vacina por ID: ${id}`);

    const vacina = await this.vacinaRepository.findById(id);

    if (vacina) {
      console.log(`Vacina encontrada: ${vacina.id} - ${vacina.nome}`);
    } else {
      console.log(`Vacina não encontrada para ID: ${id}`);
    }

    return vacina;
  }

  async getByAnimalId(animalId: number): Promise<Vacina[]> {
    console.log(`Buscando vacinas do animal: ${animalId}`);

    const vacinas = await this.vacinaRepository.findByAnimalId(animalId);

    console.log(`Encontradas ${vacinas.length} vacinas para o animal ${animalId}`);

    return vacinas;
  }

  async getAll(): Promise<Vacina[]> {
    console.log('Buscando todas as vacinas');

    const vacinas = await this.vacinaRepository.findAll();

    console.log(`Encontradas ${vacinas.length} vacinas`);

    return vacinas;
  }

  async update(id: number, updateData: Partial<Vacina>): Promise<Vacina | null> {
    console.log(`Atualizando vacina ID: ${id}`);

    const vacina = await this.vacinaRepository.update(id, updateData);

    if (vacina) {
      console.log(`Vacina atualizada com sucesso: ${vacina.id}`);
    } else {
      console.log(`Falha ao atualizar vacina ID: ${id}`);
    }

    return vacina;
  }

  async delete(id: number): Promise<boolean> {
    console.log(`Deletando vacina ID: ${id}`);

    const deleted = await this.vacinaRepository.delete(id);

    if (deleted) {
      console.log(`Vacina deletada com sucesso: ${id}`);
    } else {
      console.log(`Falha ao deletar vacina ID: ${id}`);
    }

    return deleted;
  }
}

export default new VacinaService();
