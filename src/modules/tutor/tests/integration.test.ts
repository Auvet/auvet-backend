import request from 'supertest';
import express from 'express';
import { TutorController } from '../controller';

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

describe('TutorController - Testes de Integração', () => {
  let app: express.Application;
  let tutorController: TutorController;

  beforeEach(() => {
    app = express();
    app.use(express.json());
    tutorController = new TutorController();

    app.post('/tutores', tutorController.create.bind(tutorController));
    app.get('/tutores', tutorController.getAll.bind(tutorController));
    app.get('/tutores/:cpf', tutorController.getByCpf.bind(tutorController));
    app.put('/tutores/:cpf', tutorController.update.bind(tutorController));
    app.delete('/tutores/:cpf', tutorController.delete.bind(tutorController));

    const prisma = require('../../../config/database');
    prisma.tutor.findMany.mockResolvedValue([]);
    prisma.tutor.findUnique.mockResolvedValue(null);
    prisma.tutor.create.mockResolvedValue({});
    prisma.tutor.update.mockResolvedValue(null);
    prisma.tutor.delete.mockResolvedValue({});

    jest.clearAllMocks();
  });

  describe('POST /tutores', () => {
    it('deve falhar ao criar tutor sem clínicas vinculadas', async() => {
      const tutorData = {
        cpf: '12345678901',
        nome: 'João Silva',
        email: 'joao@email.com',
        senha: 'senha123',
        telefone: '11999999999',
        endereco: 'Rua das Flores, 123',
      };

      const response = await request(app)
        .post('/tutores')
        .send(tutorData);

      expect(response.status).toBe(400);
      expect(response.body.success).toBe(false);
      expect(response.body.error).toContain('clínica');
    });

    it('deve falhar ao criar tutor com dados inválidos', async() => {
      const tutorData = {
        cpf: '',
        nome: 'João Silva',
        email: 'joao@email.com',
        senha: 'senha123',
        telefone: '11999999999',
        endereco: 'Rua das Flores, 123',
        clinicas: ['12345678000190'],
      };

      const response = await request(app)
        .post('/tutores')
        .send(tutorData);

      expect(response.status).toBe(400);
      expect(response.body.success).toBe(false);
    });

    it('deve falhar ao criar tutor com telefone inválido', async() => {
      const tutorData = {
        cpf: '12345678901',
        nome: 'João Silva',
        email: 'joao@email.com',
        senha: 'senha123',
        telefone: '',
        endereco: 'Rua das Flores, 123',
        clinicas: ['12345678000190'],
      };

      const response = await request(app)
        .post('/tutores')
        .send(tutorData);

      expect(response.status).toBe(500);
      expect(response.body.success).toBe(false);
    });
  });

  describe('GET /tutores', () => {
    it('deve retornar lista vazia quando não há tutores', async() => {
      const response = await request(app)
        .get('/tutores');

      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(Array.isArray(response.body.data)).toBe(true);
      expect(response.body.data.length).toBe(0);
    });
  });

  describe('GET /tutores/:cpf', () => {
    it('deve retornar erro para tutor inexistente', async() => {
      const response = await request(app)
        .get('/tutores/99999999999');

      expect(response.status).toBe(404);
      expect(response.body.success).toBe(false);
    });
  });

  describe('PUT /tutores/:cpf', () => {
    it('deve retornar erro para tutor inexistente', async() => {
      const updateData = { telefone: '11988888888' };

      const response = await request(app)
        .put('/tutores/99999999999')
        .send(updateData);

      expect(response.status).toBe(404);
      expect(response.body.success).toBe(false);
    });
  });

  describe('DELETE /tutores/:cpf', () => {
    it('deve retornar erro para tutor inexistente', async() => {
      const prisma = require('../../../config/database');
      prisma.tutor.delete.mockRejectedValue(new Error('Tutor não encontrado'));

      const response = await request(app)
        .delete('/tutores/99999999999');

      expect(response.status).toBe(404);
      expect(response.body.success).toBe(false);
    });
  });
});
