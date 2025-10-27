import { TutorService } from '../service';

// Mock do Prisma
jest.mock('../../../config/database', () => ({
  tutor: {
    create: jest.fn(),
    findUnique: jest.fn(),
    findMany: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  },
  usuario: {
    findUnique: jest.fn(),
    create: jest.fn(),
  },
  tutorClinica: {
    create: jest.fn(),
  },
}));

describe('TutorService - Testes Unitários', () => {
  let tutorService: TutorService;

  beforeEach(() => {
    tutorService = new TutorService();
    jest.clearAllMocks();
  });

  describe('createTutor', () => {
    it('deve falhar ao criar tutor sem clínica vinculada', async() => {
      const usuarioData = {
        cpf: '12345678901',
        nome: 'João Silva',
        email: 'joao@email.com',
        senha: 'senha123',
        dataCadastro: new Date(),
      };

      const tutorData = {
        telefone: '11999999999',
        endereco: 'Rua das Flores, 123',
      };

      const clinicas: string[] = [];

      await expect(tutorService.createTutor(usuarioData, tutorData, clinicas))
        .rejects.toThrow('Tutor deve estar vinculado a pelo menos uma clínica');
    });

    it('deve falhar ao criar tutor com dados inválidos', async() => {
      const usuarioData = {
        cpf: '',
        nome: 'João Silva',
        email: 'joao@email.com',
        senha: 'senha123',
        dataCadastro: new Date(),
      };

      const tutorData = {
        telefone: '11999999999',
        endereco: 'Rua das Flores, 123',
      };

      const clinicas = ['12345678000190'];

      await expect(tutorService.createTutor(usuarioData, tutorData, clinicas))
        .rejects.toThrow();
    });

    it('deve falhar ao criar tutor com telefone inválido', async() => {
      const usuarioData = {
        cpf: '12345678901',
        nome: 'João Silva',
        email: 'joao@email.com',
        senha: 'senha123',
        dataCadastro: new Date(),
      };

      const tutorData = {
        telefone: '',
        endereco: 'Rua das Flores, 123',
      };

      const clinicas = ['12345678000190'];

      await expect(tutorService.createTutor(usuarioData, tutorData, clinicas))
        .rejects.toThrow();
    });
  });

  describe('getByCpf', () => {
    it('deve retornar null para tutor inexistente', async() => {
      const prisma = require('../../../config/database');
      prisma.tutor.findUnique.mockResolvedValue(null);

      const result = await tutorService.getByCpf('99999999999');
      expect(result).toBeNull();
    });
  });

  describe('getAll', () => {
    it('deve retornar array vazio quando não há tutores', async() => {
      const prisma = require('../../../config/database');
      prisma.tutor.findMany.mockResolvedValue([]);

      const result = await tutorService.getAll();
      expect(result).toHaveLength(0);
    });
  });

  describe('update', () => {
    it('deve retornar null para tutor inexistente', async() => {
      const prisma = require('../../../config/database');
      prisma.tutor.update.mockRejectedValue(new Error('Tutor não encontrado'));

      const updateData = { telefone: '11988888888' };
      const result = await tutorService.update('99999999999', updateData);
      expect(result).toBeNull();
    });
  });

  describe('delete', () => {
    it('deve retornar false para tutor inexistente', async() => {
      const prisma = require('../../../config/database');
      prisma.tutor.delete.mockRejectedValue(new Error('Tutor não encontrado'));

      const result = await tutorService.delete('99999999999');
      expect(result).toBe(false);
    });
  });
});
