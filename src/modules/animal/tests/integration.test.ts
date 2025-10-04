import request from 'supertest';
import express from 'express';
import { AnimalController } from '../controller';

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

describe('AnimalController - Testes de Integração', () => {
  let app: express.Application;
  let animalController: AnimalController;

  beforeEach(() => {
    app = express();
    app.use(express.json());
    animalController = new AnimalController();
    
    app.post('/animais', animalController.create.bind(animalController));
    app.get('/animais', animalController.getAll.bind(animalController));
    app.get('/animais/:id', animalController.getById.bind(animalController));
    app.get('/animais/tutor/:tutorCpf', animalController.getByTutorCpf.bind(animalController));
    app.put('/animais/:id', animalController.update.bind(animalController));
    app.delete('/animais/:id', animalController.delete.bind(animalController));
    
    const prisma = require('../../../config/database');
    prisma.animal.findMany.mockResolvedValue([]);
    prisma.animal.findUnique.mockResolvedValue(null);
    prisma.animal.create.mockResolvedValue({});
    prisma.animal.update.mockResolvedValue(null);
    prisma.animal.delete.mockResolvedValue({});
    
    jest.clearAllMocks();
  });

  describe('POST /animais', () => {
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

      const response = await request(app)
        .post('/animais')
        .send(animalData);

      expect(response.status).toBe(400);
      expect(response.body.success).toBe(false);
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

      const response = await request(app)
        .post('/animais')
        .send(animalData);

      expect(response.status).toBe(400);
      expect(response.body.success).toBe(false);
    });
  });

  describe('GET /animais', () => {
    it('deve retornar lista vazia quando não há animais', async () => {
      const response = await request(app)
        .get('/animais');

      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(Array.isArray(response.body.data)).toBe(true);
      expect(response.body.data.length).toBe(0);
    });
  });

  describe('GET /animais/:id', () => {
    it('deve retornar erro para animal inexistente', async () => {
      const response = await request(app)
        .get('/animais/999');

      expect(response.status).toBe(404);
      expect(response.body.success).toBe(false);
    });
  });

  describe('GET /animais/tutor/:tutorCpf', () => {
    it('deve retornar lista vazia para tutor sem animais', async () => {
      const response = await request(app)
        .get('/animais/tutor/99999999999');

      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(Array.isArray(response.body.data)).toBe(true);
      expect(response.body.data.length).toBe(0);
    });
  });

  describe('PUT /animais/:id', () => {
    it('deve retornar erro para animal inexistente', async () => {
      const prisma = require('../../../config/database');
      prisma.animal.findUnique.mockResolvedValue(null);
      
      const updateData = { nome: 'Teste' };
      
      const response = await request(app)
        .put('/animais/999')
        .send(updateData);

      expect(response.status).toBe(404);
      expect(response.body.success).toBe(false);
    });
  });

  describe('DELETE /animais/:id', () => {
    it('deve retornar erro para animal inexistente', async () => {
      const prisma = require('../../../config/database');
      prisma.animal.delete.mockRejectedValue(new Error('Animal não encontrado'));
      
      const response = await request(app)
        .delete('/animais/999');

      expect(response.status).toBe(404);
      expect(response.body.success).toBe(false);
    });
  });
});