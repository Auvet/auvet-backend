import { ClinicaService } from '../service';
import { ValidatorUtils } from '../../../utils/validators';

// Mock do Prisma
jest.mock('../../../config/database', () => ({
  clinica: {
    create: jest.fn(),
    findUnique: jest.fn(),
    findMany: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  },
  funcionario: {
    findUnique: jest.fn(),
  },
  usuario: {
    findUnique: jest.fn(),
  },
}));

describe('ClinicaService - Testes Unitários', () => {
  let clinicaService: ClinicaService;

  beforeEach(() => {
    clinicaService = new ClinicaService();
    jest.clearAllMocks();
  });

  function createMockFuncionario() {
    return {
      cpf: ValidatorUtils.generateRandomCPF(),
      cargo: 'Administrador',
      status: 'ativo',
      nivelAcesso: 3
    };
  }

  describe('createClinica', () => {
    it('deve falhar ao criar clínica com dados inválidos', async () => {
      const clinicaData = {
        cnpj: '123',
        nome: 'Clínica Teste',
        administradorCpf: '123',
        endereco: null,
        telefone: null,
        email: null,
        dataCadastro: new Date()
      };

      await expect(clinicaService.createClinica(clinicaData))
        .rejects.toThrow();
    });

    it('deve falhar ao criar clínica com CNPJ inválido', async () => {
      const funcionario = createMockFuncionario();
      
      const clinicaData = {
        cnpj: '123456789012345',
        nome: 'Clínica Teste',
        administradorCpf: funcionario.cpf,
        endereco: null,
        telefone: null,
        email: null,
        dataCadastro: new Date()
      };

      await expect(clinicaService.createClinica(clinicaData))
        .rejects.toThrow();
    });
  });

  describe('getByCnpj', () => {
    it('deve retornar null para clínica inexistente', async () => {
      const prisma = require('../../../config/database');
      prisma.clinica.findUnique.mockResolvedValue(null);
      
      const result = await clinicaService.getByCnpj('12345678901234');
      expect(result).toBeNull();
    });
  });

  describe('getAll', () => {
    it('deve retornar array vazio quando não há clínicas', async () => {
      const prisma = require('../../../config/database');
      prisma.clinica.findMany.mockResolvedValue([]);
      
      const result = await clinicaService.getAll();
      expect(Array.isArray(result)).toBe(true);
      expect(result.length).toBe(0);
    });
  });

  describe('update', () => {
    it('deve retornar null para clínica inexistente', async () => {
      const updateData = { nome: 'Clínica Atualizada' };
      const result = await clinicaService.update('12345678901234', updateData);
      expect(result).toBeNull();
    });
  });

  describe('delete', () => {
    it('deve retornar false para clínica inexistente', async () => {
      const result = await clinicaService.delete('12345678901234');
      expect(result).toBe(false);
    });
  });
});