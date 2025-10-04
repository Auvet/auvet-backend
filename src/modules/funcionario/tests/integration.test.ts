import request from 'supertest';
import express from 'express';
import { FuncionarioController } from '../controller';

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

describe('FuncionarioController - Testes de Integração', () => {
  let app: express.Application;
  let funcionarioController: FuncionarioController;

  beforeEach(() => {
    app = express();
    app.use(express.json());
    funcionarioController = new FuncionarioController();
    
    app.post('/funcionarios', funcionarioController.create.bind(funcionarioController));
    app.get('/funcionarios', funcionarioController.getAll.bind(funcionarioController));
    app.get('/funcionarios/:cpf', funcionarioController.getByCpf.bind(funcionarioController));
    app.put('/funcionarios/:cpf', funcionarioController.update.bind(funcionarioController));
    app.delete('/funcionarios/:cpf', funcionarioController.delete.bind(funcionarioController));
    
    const prisma = require('../../../config/database');
    prisma.funcionario.findMany.mockResolvedValue([]);
    prisma.funcionario.findUnique.mockResolvedValue(null);
    prisma.funcionario.create.mockResolvedValue({});
    prisma.funcionario.update.mockResolvedValue(null);
    prisma.funcionario.delete.mockResolvedValue({});
    
    jest.clearAllMocks();
  });

  describe('POST /funcionarios', () => {
    it('deve falhar ao criar funcionário com dados inválidos', async () => {
      const funcionarioData = {
        cpf: '',
        nome: 'João Silva',
        email: 'joao@clinica.com',
        senha: 'senha123',
        cargo: 'Veterinário',
        registroProfissional: 'CRMV-12345',
        status: 'ativo',
        nivelAcesso: 2
      };

      const response = await request(app)
        .post('/funcionarios')
        .send(funcionarioData);

      expect(response.status).toBe(400);
      expect(response.body.success).toBe(false);
    });

    it('deve falhar ao criar funcionário com cargo inválido', async () => {
      const funcionarioData = {
        cpf: '12345678901',
        nome: 'João Silva',
        email: 'joao@clinica.com',
        senha: 'senha123',
        cargo: '',
        registroProfissional: 'CRMV-12345',
        status: 'ativo',
        nivelAcesso: 2
      };

      const response = await request(app)
        .post('/funcionarios')
        .send(funcionarioData);

      expect(response.status).toBe(400);
      expect(response.body.success).toBe(false);
    });
  });

  describe('GET /funcionarios', () => {
    it('deve retornar lista vazia quando não há funcionários', async () => {
      const response = await request(app)
        .get('/funcionarios');

      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(Array.isArray(response.body.data)).toBe(true);
      expect(response.body.data.length).toBe(0);
    });
  });

  describe('GET /funcionarios/:cpf', () => {
    it('deve retornar erro para funcionário inexistente', async () => {
      const response = await request(app)
        .get('/funcionarios/99999999999');

      expect(response.status).toBe(404);
      expect(response.body.success).toBe(false);
    });
  });

  describe('PUT /funcionarios/:cpf', () => {
    it('deve retornar erro para funcionário inexistente', async () => {
      const updateData = { cargo: 'Veterinário Sênior' };
      
      const response = await request(app)
        .put('/funcionarios/99999999999')
        .send(updateData);

      expect(response.status).toBe(404);
      expect(response.body.success).toBe(false);
    });
  });

  describe('DELETE /funcionarios/:cpf', () => {
    it('deve retornar erro para funcionário inexistente', async () => {
      const prisma = require('../../../config/database');
      prisma.funcionario.delete.mockRejectedValue(new Error('Funcionário não encontrado'));
      
      const response = await request(app)
        .delete('/funcionarios/99999999999');

      expect(response.status).toBe(404);
      expect(response.body.success).toBe(false);
    });
  });
});