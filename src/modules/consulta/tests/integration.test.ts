import request from 'supertest';
import express from 'express';
import { ConsultaController } from '../controller';

// Mock do Prisma
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

describe('ConsultaController - Testes de Integração', () => {
  let app: express.Application;
  let consultaController: ConsultaController;

  beforeEach(() => {
    app = express();
    app.use(express.json());
    consultaController = new ConsultaController();

    app.post('/consultas', consultaController.create.bind(consultaController));
    app.get('/consultas', consultaController.getAll.bind(consultaController));
    app.get('/consultas/:id', consultaController.getById.bind(consultaController));
    app.put('/consultas/:id', consultaController.update.bind(consultaController));
    app.delete('/consultas/:id', consultaController.delete.bind(consultaController));

    const prisma = require('../../../config/database');
    prisma.consulta.findMany.mockResolvedValue([]);
    prisma.consulta.findUnique.mockResolvedValue(null);
    prisma.consulta.create.mockResolvedValue({});
    prisma.consulta.update.mockResolvedValue(null);
    prisma.consulta.delete.mockResolvedValue({});

    jest.clearAllMocks();
  });

  describe('POST /consultas', () => {
    it('deve falhar ao criar consulta com dados inválidos', async() => {
      const consultaData = {
        data: '2025-12-25',
        hora: '14:30:00',
        motivo: 'Consulta de rotina',
        status: 'agendada',
        animalId: -1,
        funcionarioCpf: '123',
        clinicaCnpj: '11222333000181',
        observacoes: null,
      };

      const response = await request(app)
        .post('/consultas')
        .send(consultaData);

      expect(response.status).toBe(500);
      expect(response.body.success).toBe(false);
    });

    it('deve falhar ao criar consulta com status inválido', async() => {
      const consultaData = {
        data: '2025-12-25',
        hora: '14:30:00',
        motivo: 'Consulta de rotina',
        status: 'status_invalido',
        animalId: 1,
        funcionarioCpf: '12345678901',
        clinicaCnpj: '11222333000181',
        observacoes: null,
      };

      const response = await request(app)
        .post('/consultas')
        .send(consultaData);

      expect(response.status).toBe(500);
      expect(response.body.success).toBe(false);
    });
  });

  describe('GET /consultas', () => {
    it('deve retornar lista vazia quando não há consultas', async() => {
      const response = await request(app)
        .get('/consultas');

      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(Array.isArray(response.body.data)).toBe(true);
      expect(response.body.data.length).toBe(0);
    });
  });

  describe('GET /consultas/:id', () => {
    it('deve retornar erro para consulta inexistente', async() => {
      const response = await request(app)
        .get('/consultas/999');

      expect(response.status).toBe(404);
      expect(response.body.success).toBe(false);
    });
  });

  describe('PUT /consultas/:id', () => {
    it('deve retornar erro para consulta inexistente', async() => {
      const updateData = { status: 'realizada' };

      const response = await request(app)
        .put('/consultas/999')
        .send(updateData);

      expect(response.status).toBe(404);
      expect(response.body.success).toBe(false);
    });
  });

  describe('DELETE /consultas/:id', () => {
    it('deve retornar erro para consulta inexistente', async() => {
      const prisma = require('../../../config/database');
      prisma.consulta.delete.mockRejectedValue(new Error('Consulta não encontrada'));

      const response = await request(app)
        .delete('/consultas/999');

      expect(response.status).toBe(404);
      expect(response.body.success).toBe(false);
    });
  });
});
