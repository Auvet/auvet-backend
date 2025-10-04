import { AnimalService } from '../service';

// Mock do Prisma
jest.mock('../../../config/database', () => ({
  animal: {
    create: jest.fn(),
    findUnique: jest.fn(),
    findMany: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  },
  tutor: {
    findUnique: jest.fn(),
  },
}));

describe('AnimalService - Testes Unitários', () => {
  let animalService: AnimalService;

  beforeEach(() => {
    animalService = new AnimalService();
    jest.clearAllMocks();
  });

  describe('createAnimal', () => {
    it('deve falhar ao criar animal com dados inválidos', async () => {
      const animalData = {
        nome: '',
        especie: 'Cão',
        raca: 'Golden Retriever',
        sexo: 'M',
        idade: 3,
        peso: 25.5,
        tutorCpf: '123',
      };

      await expect(animalService.createAnimal(animalData))
        .rejects.toThrow();
    });

    it('deve falhar ao criar animal com sexo inválido', async () => {
      const animalData = {
        nome: 'Rex',
        especie: 'Cão',
        raca: 'Golden Retriever',
        sexo: 'X',
        idade: 3,
        peso: 25.5,
        tutorCpf: '12345678901'
      };

      await expect(animalService.createAnimal(animalData))
        .rejects.toThrow();
    });
  });

  describe('getById', () => {
    it('deve retornar null para animal inexistente', async () => {
      const result = await animalService.getById(999);
      expect(result).toBeNull();
    });
  });

  describe('getByTutorCpf', () => {
    it('deve retornar lista vazia para tutor sem animais', async () => {
      const prisma = require('../../../config/database');
      prisma.animal.findMany.mockResolvedValue([]);
      
      const result = await animalService.getByTutorCpf('99999999999');
      expect(result).toHaveLength(0);
    });
  });

  describe('getAll', () => {
    it('deve retornar array vazio quando não há animais', async () => {
      const prisma = require('../../../config/database');
      prisma.animal.findMany.mockResolvedValue([]);
      
      const result = await animalService.getAll();
      expect(result).toHaveLength(0);
    });
  });

  describe('update', () => {
    it('deve retornar null para animal inexistente', async () => {
      const prisma = require('../../../config/database');
      prisma.animal.findUnique.mockResolvedValue(null);
      
      const updateData = { nome: 'Teste' };
      const result = await animalService.update(999, updateData);
      expect(result).toBeNull();
    });
  });

  describe('delete', () => {
    it('deve retornar false para animal inexistente', async () => {
      const prisma = require('../../../config/database');
      prisma.animal.delete.mockRejectedValue(new Error('Animal não encontrado'));
      
      const result = await animalService.delete(999);
      expect(result).toBe(false);
    });
  });
});