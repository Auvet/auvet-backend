import { VacinaService } from '../service';

// Mock do Prisma
jest.mock('../../../config/database', () => ({
  vacina: {
    create: jest.fn(),
    findUnique: jest.fn(),
    findMany: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  },
  animal: {
    findUnique: jest.fn(),
  },
}));

describe('VacinaService - Testes Unitários', () => {
  let vacinaService: VacinaService;

  beforeEach(() => {
    vacinaService = new VacinaService();
    jest.clearAllMocks();
  });

  describe('createVacina', () => {
    it('deve falhar ao criar vacina com dados inválidos', async () => {
      const vacinaData = {
        nome: '',
        fabricante: 'Zoetis',
        dataAplicacao: new Date('2024-01-15'),
        dataValidade: new Date('2024-12-31'),
        animalId: -1,
      };

      await expect(vacinaService.createVacina(vacinaData))
        .rejects.toThrow();
    });

    it('deve falhar ao criar vacina com data futura', async () => {
      const vacinaData = {
        nome: 'V10',
        fabricante: 'Zoetis',
        dataAplicacao: new Date('2030-01-01'),
        dataValidade: new Date('2030-12-31'),
        animalId: 1
      };

      await expect(vacinaService.createVacina(vacinaData))
        .rejects.toThrow();
    });
  });

  describe('getById', () => {
    it('deve retornar null para vacina inexistente', async () => {  
      const prisma = require('../../../config/database');
      prisma.vacina.findUnique.mockResolvedValue(null);
      
      const result = await vacinaService.getById(999);
      expect(result).toBeNull();
    });
  });

  describe('getByAnimalId', () => {
    it('deve retornar lista vazia para animal sem vacinas', async () => {
      const prisma = require('../../../config/database');
      prisma.vacina.findMany.mockResolvedValue([]);
      
      const result = await vacinaService.getByAnimalId(999);
      expect(result).toHaveLength(0);
    });
  });

  describe('getAll', () => {
    it('deve retornar array vazio quando não há vacinas', async () => {
      const prisma = require('../../../config/database');
      prisma.vacina.findMany.mockResolvedValue([]);
      
      const result = await vacinaService.getAll();
      expect(result).toHaveLength(0);
    });
  });

  describe('update', () => {
    it('deve retornar null para vacina inexistente', async () => {
      const prisma = require('../../../config/database');
      prisma.vacina.update.mockRejectedValue(new Error('Vacina não encontrada'));
      
      const updateData = { nome: 'V10 Atualizada' };
      const result = await vacinaService.update(999, updateData);   
      expect(result).toBeNull();
    });
  });

  describe('delete', () => {
    it('deve retornar false para vacina inexistente', async () => { 
      const prisma = require('../../../config/database');
      prisma.vacina.delete.mockRejectedValue(new Error('Vacina não encontrada'));
      
      const result = await vacinaService.delete(999);
      expect(result).toBe(false);
    });
  });
});