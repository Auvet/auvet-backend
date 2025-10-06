import { FuncionarioService } from '../service';

// Mock do Prisma
jest.mock('../../../config/database', () => ({
  funcionario: {
    create: jest.fn(),
    findUnique: jest.fn(),
    findMany: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  },
  usuario: {
    findUnique: jest.fn(),
  },
}));

describe('FuncionarioService - Testes Unitários', () => {
  let funcionarioService: FuncionarioService;

  beforeEach(() => {
    funcionarioService = new FuncionarioService();
    jest.clearAllMocks();
  });

  describe('createFuncionario', () => {
    it('deve falhar ao criar funcionário com dados inválidos', async() => {
      const usuarioData = {
        cpf: '',
        nome: 'João Silva',
        email: 'joao@clinica.com',
        senha: 'senha123',
        dataCadastro: new Date(),
      };

      const funcionarioData = {
        cargo: 'Veterinário',
        registroProfissional: 'CRMV-12345',
        status: 'ativo',
        nivelAcesso: 2,
      };

      await expect(funcionarioService.createFuncionario(usuarioData, funcionarioData))
        .rejects.toThrow();
    });

    it('deve falhar ao criar funcionário com cargo inválido', async() => {
      const usuarioData = {
        cpf: '12345678901',
        nome: 'João Silva',
        email: 'joao@clinica.com',
        senha: 'senha123',
        dataCadastro: new Date(),
      };

      const funcionarioData = {
        cargo: '',
        registroProfissional: 'CRMV-12345',
        status: 'ativo',
        nivelAcesso: 2,
      };

      await expect(funcionarioService.createFuncionario(usuarioData, funcionarioData))
        .rejects.toThrow();
    });
  });

  describe('getByCpf', () => {
    it('deve retornar null para funcionário inexistente', async() => {
      const prisma = require('../../../config/database');
      prisma.funcionario.findUnique.mockResolvedValue(null);

      const result = await funcionarioService.getByCpf('99999999999');
      expect(result).toBeNull();
    });
  });

  describe('getAll', () => {
    it('deve retornar array vazio quando não há funcionários', async() => {
      const prisma = require('../../../config/database');
      prisma.funcionario.findMany.mockResolvedValue([]);

      const result = await funcionarioService.getAll();
      expect(result).toHaveLength(0);
    });
  });

  describe('update', () => {
    it('deve retornar null para funcionário inexistente', async() => {
      const prisma = require('../../../config/database');
      prisma.funcionario.update.mockRejectedValue(new Error('Funcionário não encontrado'));

      const updateData = { cargo: 'Veterinário Sênior' };
      const result = await funcionarioService.update('99999999999', updateData);
      expect(result).toBeNull();
    });
  });

  describe('delete', () => {
    it('deve retornar false para funcionário inexistente', async() => {
      const prisma = require('../../../config/database');
      prisma.funcionario.delete.mockRejectedValue(new Error('Funcionário não encontrado'));

      const result = await funcionarioService.delete('99999999999');
      expect(result).toBe(false);
    });
  });
});
