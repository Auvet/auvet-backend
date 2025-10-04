import { Animal } from '../../types';
import { AnimalRepository } from './repository';
import { AnimalValidator } from '../../utils/validators';

export class AnimalService {
  private animalRepository: AnimalRepository;

  constructor() {
    this.animalRepository = new AnimalRepository();
  }

  async createAnimal(animalData: Omit<Animal, 'id'>): Promise<Animal> {
    console.log(`Iniciando criação de animal: ${animalData.nome}`);
    
    const validation = AnimalValidator.validateAnimalData(animalData);
    if (!validation.isValid) {
      throw new Error(validation.errors.join(', '));
    }

    if (animalData.especie && animalData.especie.trim().length > 50) {
      throw new Error('Espécie deve ter no máximo 50 caracteres');
    }

    if (animalData.raca && animalData.raca.trim().length > 50) {
      throw new Error('Raça deve ter no máximo 50 caracteres');
    }

    if (animalData.sexo && !['M', 'F', 'm', 'f'].includes(animalData.sexo.trim())) {
      throw new Error('Sexo deve ser M (macho) ou F (fêmea)');
    }

    if (animalData.idade !== undefined && animalData.idade !== null) {
      if (animalData.idade < 0 || animalData.idade > 30) {
        throw new Error('Idade deve estar entre 0 e 30 anos');
      }
    }

    if (animalData.peso !== undefined && animalData.peso !== null) {
      if (animalData.peso <= 0 || animalData.peso > 1000) {
        throw new Error('Peso deve estar entre 0.1 e 1000 kg');
      }
    }

    const animal = await this.animalRepository.create(animalData);
    console.log(`Animal criado com sucesso: ${animal.id} - ${animal.nome}`);
    
    return animal;
  }

  async getById(id: number): Promise<Animal | null> {
    console.log(`Buscando animal por ID: ${id}`);
    
    const animal = await this.animalRepository.findById(id);
    
    if (animal) {
      console.log(`Animal encontrado: ${animal.id} - ${animal.nome}`);
    } else {
      console.log(`Animal não encontrado para ID: ${id}`);
    }
    
    return animal;
  }

  async getByTutorCpf(tutorCpf: string): Promise<Animal[]> {
    console.log(`Buscando animais do tutor: ${tutorCpf}`);
    
    const animais = await this.animalRepository.findByTutorCpf(tutorCpf);
    
    console.log(`Encontrados ${animais.length} animais para o tutor ${tutorCpf}`);
    
    return animais;
  }

  async getAll(): Promise<Animal[]> {
    console.log('Buscando todos os animais');
    
    const animais = await this.animalRepository.findAll();
    
    console.log(`Encontrados ${animais.length} animais`);
    
    return animais;
  }

  async update(id: number, updateData: Partial<Animal>): Promise<Animal | null> {
    console.log(`Atualizando animal ID: ${id}`);
    
    const animal = await this.animalRepository.update(id, updateData);
    
    if (animal) {
      console.log(`Animal atualizado com sucesso: ${animal.id}`);
    } else {
      console.log(`Falha ao atualizar animal ID: ${id}`);
    }
    
    return animal;
  }

  async delete(id: number): Promise<boolean> {
    console.log(`Deletando animal ID: ${id}`);
    
    const deleted = await this.animalRepository.delete(id);
    
    if (deleted) {
      console.log(`Animal deletado com sucesso: ${id}`);
    } else {
      console.log(`Falha ao deletar animal ID: ${id}`);
    }
    
    return deleted;
  }
}

export default new AnimalService();
