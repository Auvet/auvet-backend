import { UsuarioService } from '../service';

jest.mock('../../../config/database', () => ({
  usuario: {
    create: jest.fn(),
    findUnique: jest.fn(),
    findMany: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  },
}));

describe('UsuarioService - Testes Unitários', () => {
  let usuarioService: UsuarioService;

  beforeEach(() => {
    usuarioService = new UsuarioService();
    jest.clearAllMocks();
  });

  describe('create', () => {
    it('deve falhar ao criar usuário com dados inválidos', async () => {
      const usuarioData = {
        cpf: '', 
        nome: 'João Silva',
        email: 'joao@test.com',
        senha: 'senha123',
        dataCadastro: new Date()
      };

      await expect(usuarioService.create(usuarioData)).rejects.toThrow();
    });

    it('deve falhar ao criar usuário com email inválido', async () => {
      const usuarioData = {
        cpf: '12345678901',
        nome: 'João Silva',
        email: 'email-invalido',
        senha: 'senha123',
        dataCadastro: new Date()
      };

      await expect(usuarioService.create(usuarioData)).rejects.toThrow();
    });

    it('deve falhar ao criar usuário com senha muito curta', async () => {
      const usuarioData = {
        cpf: '12345678901',
        nome: 'João Silva',
        email: 'joao@test.com',
        senha: '123', 
        dataCadastro: new Date()
      };

      await expect(usuarioService.create(usuarioData)).rejects.toThrow();
    });
  });

  describe('getByCpf', () => {
    it('deve retornar null para usuário inexistente', async () => { 
      const prisma = require('../../../config/database');
      prisma.usuario.findUnique.mockResolvedValue(null);
      
      const result = await usuarioService.getByCpf('99999999999');
      expect(result).toBeNull();
    });
  });


  describe('getAll', () => {
    it('deve retornar array vazio quando não há usuários', async () => {
      const prisma = require('../../../config/database');
      prisma.usuario.findMany.mockResolvedValue([]);
      
      const result = await usuarioService.getAll();
      expect(result).toHaveLength(0);
    });
  });

  describe('update', () => {
    it('deve falhar ao atualizar usuário inexistente', async () => {
      const updateData = { nome: 'João Atualizado' };
      await expect(usuarioService.update('99999999999', updateData)).rejects.toThrow();
    });
  });

  describe('delete', () => {
    it('deve falhar ao deletar usuário inexistente', async () => {
      await expect(usuarioService.delete('99999999999')).rejects.toThrow();
    });
  });
});