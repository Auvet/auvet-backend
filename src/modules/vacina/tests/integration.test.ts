import request from 'supertest';
import express from 'express';
import { VacinaController } from '../controller';

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

describe('VacinaController - Testes de Integração', () => {
  let app: express.Application;
  let vacinaController: VacinaController;

  beforeEach(() => {
    app = express();
    app.use(express.json());
    vacinaController = new VacinaController();

    app.post('/vacinas', vacinaController.create.bind(vacinaController));
    app.get('/vacinas', vacinaController.getAll.bind(vacinaController));
    app.get('/vacinas/:id', vacinaController.getById.bind(vacinaController));
    app.get('/vacinas/animal/:animalId', vacinaController.getByAnimalId.bind(vacinaController));
    app.put('/vacinas/:id', vacinaController.update.bind(vacinaController));
    app.delete('/vacinas/:id', vacinaController.delete.bind(vacinaController));

    const prisma = require('../../../config/database');
    prisma.vacina.findMany.mockResolvedValue([]);
    prisma.vacina.findUnique.mockResolvedValue(null);
    prisma.vacina.create.mockResolvedValue({});
    prisma.vacina.update.mockResolvedValue(null);
    prisma.vacina.delete.mockResolvedValue({});

    jest.clearAllMocks();
  });

  describe('POST /vacinas', () => {
    it('deve falhar ao criar vacina com dados inválidos', async() => {
      const vacinaData = {
        nome: '',
        fabricante: 'Zoetis',
        dataAplicacao: '2024-01-15',
        dataValidade: '2024-12-31',
        animalId: -1,
      };

      const response = await request(app)
        .post('/vacinas')
        .send(vacinaData);

      expect(response.status).toBe(400);
      expect(response.body.success).toBe(false);
    });

    it('deve falhar ao criar vacina com data futura', async() => {
      const vacinaData = {
        nome: 'V10',
        fabricante: 'Zoetis',
        dataAplicacao: '2030-01-01',
        dataValidade: '2030-12-31',
        animalId: 1,
      };

      const response = await request(app)
        .post('/vacinas')
        .send(vacinaData);

      expect(response.status).toBe(400);
      expect(response.body.success).toBe(false);
    });
  });

  describe('GET /vacinas', () => {
    it('deve retornar lista vazia quando não há vacinas', async() => {
      const response = await request(app)
        .get('/vacinas');

      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(Array.isArray(response.body.data)).toBe(true);
      expect(response.body.data.length).toBe(0);
    });
  });

  describe('GET /vacinas/:id', () => {
    it('deve retornar erro para vacina inexistente', async() => {
      const response = await request(app)
        .get('/vacinas/999');

      expect(response.status).toBe(404);
      expect(response.body.success).toBe(false);
    });
  });

  describe('GET /vacinas/animal/:animalId', () => {
    it('deve retornar lista vazia para animal sem vacinas', async() => {
      const response = await request(app)
        .get('/vacinas/animal/999');

      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(Array.isArray(response.body.data)).toBe(true);
      expect(response.body.data.length).toBe(0);
    });
  });

  describe('PUT /vacinas/:id', () => {
    it('deve retornar erro para vacina inexistente', async() => {
      const prisma = require('../../../config/database');
      prisma.vacina.findUnique.mockResolvedValue(null);

      const updateData = { nome: 'V10 Atualizada' };

      const response = await request(app)
        .put('/vacinas/999')
        .send(updateData);

      expect(response.status).toBe(404);
      expect(response.body.success).toBe(false);
    });
  });

  describe('DELETE /vacinas/:id', () => {
    it('deve retornar erro para vacina inexistente', async() => {
      const prisma = require('../../../config/database');
      prisma.vacina.delete.mockRejectedValue(new Error('Vacina não encontrada'));

      const response = await request(app)
        .delete('/vacinas/999');

      expect(response.status).toBe(404);
      expect(response.body.success).toBe(false);
    });
  });
});
