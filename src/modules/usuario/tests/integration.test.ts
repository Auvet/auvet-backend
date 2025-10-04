import request from 'supertest';
import express from 'express';
import { UsuarioController } from '../controller';

// Mock do Prisma
jest.mock('../../../config/database', () => ({
  usuario: {
    create: jest.fn(),
    findUnique: jest.fn(),
    findMany: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  },
}));

describe('UsuarioController - Testes de Integração', () => {
  let app: express.Application;
  let usuarioController: UsuarioController;

  beforeEach(() => {
    app = express();
    app.use(express.json());
    usuarioController = new UsuarioController();
    
    app.post('/usuarios', usuarioController.create.bind(usuarioController));
    app.get('/usuarios', usuarioController.getAll.bind(usuarioController));
    app.get('/usuarios/:cpf', usuarioController.getByCpf.bind(usuarioController));
    app.put('/usuarios/:cpf', usuarioController.update.bind(usuarioController));
    app.delete('/usuarios/:cpf', usuarioController.delete.bind(usuarioController));
    
    const prisma = require('../../../config/database');
    prisma.usuario.findMany.mockResolvedValue([]);
    prisma.usuario.findUnique.mockResolvedValue(null);
    prisma.usuario.create.mockResolvedValue({});
    prisma.usuario.update.mockResolvedValue(null);
    prisma.usuario.delete.mockResolvedValue({});
    
    jest.clearAllMocks();
  });

  describe('POST /usuarios', () => {
    it('deve falhar ao criar usuário com dados inválidos', async () => {
      const usuarioData = {
        cpf: '',
        nome: 'João Silva',
        email: 'joao@test.com',
        senha: 'senha123'
      };

      const response = await request(app)
        .post('/usuarios')
        .send(usuarioData);

      expect(response.status).toBe(400);
      expect(response.body.success).toBe(false);
    });

    it('deve falhar ao criar usuário com email inválido', async () => {
      const usuarioData = {
        cpf: '12345678901',
        nome: 'João Silva',
        email: 'email-invalido',
        senha: 'senha123'
      };

      const response = await request(app)
        .post('/usuarios')
        .send(usuarioData);

      expect(response.status).toBe(400);
      expect(response.body.success).toBe(false);
    });
  });

  describe('GET /usuarios', () => {
    it('deve retornar lista vazia quando não há usuários', async () => {
      const response = await request(app)
        .get('/usuarios');

      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(Array.isArray(response.body.data)).toBe(true);
      expect(response.body.data.length).toBe(0);
    });
  });

  describe('GET /usuarios/:cpf', () => {
    it('deve retornar erro para usuário inexistente', async () => {
      const response = await request(app)
        .get('/usuarios/99999999999');

      expect(response.status).toBe(404);
      expect(response.body.success).toBe(false);
    });
  });


  describe('PUT /usuarios/:cpf', () => {
    it('deve retornar erro para usuário inexistente', async () => {
      const updateData = { nome: 'João Atualizado' };
      
      const response = await request(app)
        .put('/usuarios/99999999999')
        .send(updateData);

      expect(response.status).toBe(404);
      expect(response.body.success).toBe(false);
    });
  });

  describe('DELETE /usuarios/:cpf', () => {
    it('deve retornar erro para usuário inexistente', async () => {
      const prisma = require('../../../config/database');
      prisma.usuario.delete.mockRejectedValue(new Error('Usuário não encontrado'));
      
      const response = await request(app)
        .delete('/usuarios/99999999999');

      expect(response.status).toBe(404);
      expect(response.body.success).toBe(false);
    });
  });
});