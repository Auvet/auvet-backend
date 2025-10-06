import { ConsultaService } from '../service';

jest.mock('../../../config/database', () => ({
  consulta: {
    create: jest.fn(),
    findUnique: jest.fn(),
    findMany: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  },
  animal: {
    findUnique: jest.fn(),
  },
  funcionario: {
    findUnique: jest.fn(),
  },
}));

describe('ConsultaService - Testes Unitários', () => {
  let consultaService: ConsultaService;

  beforeEach(() => {
    consultaService = new ConsultaService();
    jest.clearAllMocks();
  });

  describe('createConsulta', () => {
    it('deve falhar ao criar consulta com dados inválidos', async() => {
      const consultaData = {
        data: new Date('2025-12-25'),
        hora: new Date('2025-12-25T14:30:00'),
        motivo: 'Consulta de rotina',
        status: 'agendada',
        animalId: -1,
        funcionarioCpf: '123',
        observacoes: null,
      };

      await expect(consultaService.createConsulta(consultaData))
        .rejects.toThrow();
    });

    it('deve falhar ao criar consulta com status inválido', async() => {
      const consultaData = {
        data: new Date('2025-12-25'),
        hora: new Date('2025-12-25T14:30:00'),
        motivo: 'Consulta de rotina',
        status: 'status_invalido',
        animalId: 1,
        funcionarioCpf: '12345678901',
        observacoes: null,
      };

      await expect(consultaService.createConsulta(consultaData))
        .rejects.toThrow();
    });
  });

  describe('getById', () => {
    it('deve retornar null para consulta inexistente', async() => {
      const prisma = require('../../../config/database');
      prisma.consulta.findUnique.mockResolvedValue(null);

      const result = await consultaService.getById(999);
      expect(result).toBeNull();
    });
  });

  describe('getAll', () => {
    it('deve retornar array vazio quando não há consultas', async() => {
      const prisma = require('../../../config/database');
      prisma.consulta.findMany.mockResolvedValue([]);

      const result = await consultaService.getAll();
      expect(Array.isArray(result)).toBe(true);
      expect(result.length).toBe(0);
    });
  });

  describe('update', () => {
    it('deve retornar null para consulta inexistente', async() => {
      const prisma = require('../../../config/database');
      prisma.consulta.update.mockRejectedValue(new Error('Consulta não encontrada'));

      const updateData = { status: 'realizada' };
      const result = await consultaService.update(999, updateData);
      expect(result).toBeNull();
    });
  });

  describe('delete', () => {
    it('deve retornar false para consulta inexistente', async() => {
      const prisma = require('../../../config/database');
      prisma.consulta.delete.mockRejectedValue(new Error('Consulta não encontrada'));

      const result = await consultaService.delete(999);
      expect(result).toBe(false);
    });
  });
});
