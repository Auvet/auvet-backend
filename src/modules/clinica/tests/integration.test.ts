import request from 'supertest';
import express from 'express';
import { ClinicaController } from '../controller';

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

describe('ClinicaController - Testes de Integração', () => {
  let app: express.Application;
  let clinicaController: ClinicaController;

  beforeEach(() => {
    app = express();
    app.use(express.json());
    clinicaController = new ClinicaController();
    app.use('/clinicas', clinicaController.router);
  });

  beforeEach(() => {
    const prisma = require('../../../config/database');
    prisma.clinica.findMany.mockResolvedValue([]);
    prisma.clinica.findUnique.mockResolvedValue(null);
    prisma.clinica.create.mockResolvedValue({});
    prisma.clinica.update.mockResolvedValue(null);
    prisma.clinica.delete.mockResolvedValue({});

    jest.clearAllMocks();
  });

  describe('POST /clinicas', () => {
    it('deve falhar ao criar clínica com dados inválidos', async() => {
      const clinicaData = {
        cnpj: '123',
        nome: 'Clínica Teste',
        administradorCpf: '123',
      };

      const response = await request(app)
        .post('/clinicas')
        .send(clinicaData);

      expect(response.status).toBe(500);
      expect(response.body.success).toBe(false);
    });

    it('deve falhar ao criar clínica com CNPJ inválido', async() => {
      const clinicaData = {
        cnpj: '123456789012345',
        nome: 'Clínica Teste',
        administradorCpf: '12345678901',
        endereco: 'Rua Teste',
        telefone: '11999999999',
        email: 'teste@clinica.com',
      };

      const response = await request(app)
        .post('/clinicas')
        .send(clinicaData);

      expect(response.status).toBe(500);
      expect(response.body.success).toBe(false);
    });
  });

  describe('GET /clinicas', () => {
    it('deve retornar lista vazia quando não há clínicas', async() => {
      const response = await request(app)
        .get('/clinicas');

      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.data).toHaveLength(0);
    });
  });

  describe('GET /clinicas/:cnpj', () => {
    it('deve retornar erro para clínica inexistente', async() => {
      const response = await request(app)
        .get('/clinicas/12345678901234');

      expect(response.status).toBe(404);
      expect(response.body.success).toBe(false);
    });
  });

  describe('PUT /clinicas/:cnpj', () => {
    it('deve retornar erro para clínica inexistente', async() => {
      const updateData = { nome: 'Clínica Atualizada' };
      const response = await request(app)
        .put('/clinicas/12345678901234')
        .send(updateData);

      expect(response.status).toBe(404);
      expect(response.body.success).toBe(false);
    });
  });

  describe('DELETE /clinicas/:cnpj', () => {
    it('deve retornar erro para clínica inexistente', async() => {
      const response = await request(app)
        .delete('/clinicas/12345678901234');

      expect(response.status).toBe(404);
      expect(response.body.success).toBe(false);
    });
  });
});
