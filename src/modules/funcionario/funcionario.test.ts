import request from 'supertest';
import express from 'express';
import { FuncionarioController } from './controller';
import { FuncionarioService } from './service';
import { FuncionarioRepository } from './repository';
import prisma from '../../config/database';

describe('FuncionarioController', () => {
  let app: express.Application;
  let funcionarioController: FuncionarioController;

  beforeEach(() => {
    app = express();
    app.use(express.json());
    funcionarioController = new FuncionarioController();
    app.use('/funcionarios', funcionarioController.router);
  });

  describe('POST /funcionarios', () => {
    it('deve criar um funcionário com sucesso', async () => {
      const funcionarioData = {
        cpf: '12345678901',
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
        .send(funcionarioData)
        .expect(201);

      expect(response.body.success).toBe(true);
      expect(response.body.data.cpf).toBe(funcionarioData.cpf);
      expect(response.body.data.cargo).toBe(funcionarioData.cargo);
      expect(response.body.message).toBe('Funcionário criado com sucesso');
    });

    it('deve retornar erro 400 quando dados obrigatórios estão faltando', async () => {
      const funcionarioData = {
        cpf: '12345678901',
        nome: 'João Silva',
        cargo: 'Veterinário'
      };

      const response = await request(app)
        .post('/funcionarios')
        .send(funcionarioData)
        .expect(400);

      expect(response.body.success).toBe(false);
      expect(response.body.error).toBe('CPF, nome, email, senha e cargo são obrigatórios');
    });

    it('deve retornar erro 500 quando tentar criar funcionário com CPF duplicado', async () => {
      const funcionarioData = {
        cpf: '12345678901',
        nome: 'João Silva',
        email: 'joao@clinica.com',
        senha: 'senha123',
        cargo: 'Veterinário'
      };

      await request(app)
        .post('/funcionarios')
        .send(funcionarioData)
        .expect(201);
      const response = await request(app)
        .post('/funcionarios')
        .send(funcionarioData)
        .expect(500);

      expect(response.body.success).toBe(false);
      expect(response.body.error).toBe('Usuário já cadastrado com este CPF');
    });
  });

  describe('GET /funcionarios', () => {
    it('deve retornar lista vazia quando não há funcionários', async () => {
      const response = await request(app)
        .get('/funcionarios')
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.data).toEqual([]);
      expect(response.body.count).toBe(0);
    });

    it('deve retornar lista de funcionários quando existem funcionários', async () => {
      const funcionarioData = {
        cpf: '12345678901',
        nome: 'João Silva',
        email: 'joao@clinica.com',
        senha: 'senha123',
        cargo: 'Veterinário'
      };

      await request(app)
        .post('/funcionarios')
        .send(funcionarioData)
        .expect(201);
      const response = await request(app)
        .get('/funcionarios')
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.data).toHaveLength(1);
      expect(response.body.count).toBe(1);
      expect(response.body.data[0].cpf).toBe(funcionarioData.cpf);
    });
  });

  describe('GET /funcionarios/:cpf', () => {
    it('deve retornar funcionário quando CPF existe', async () => {
      const funcionarioData = {
        cpf: '12345678901',
        nome: 'João Silva',
        email: 'joao@clinica.com',
        senha: 'senha123',
        cargo: 'Veterinário'
      };

      await request(app)
        .post('/funcionarios')
        .send(funcionarioData)
        .expect(201);
      const response = await request(app)
        .get('/funcionarios/12345678901')
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.data.cpf).toBe(funcionarioData.cpf);
    });

    it('deve retornar erro 404 quando CPF não existe', async () => {
      const response = await request(app)
        .get('/funcionarios/99999999999')
        .expect(404);

      expect(response.body.success).toBe(false);
      expect(response.body.error).toBe('Funcionário não encontrado');
    });

    it('deve retornar erro 404 quando rota não existe', async () => {
      await request(app)
        .get('/funcionarios/rota-inexistente')
        .expect(404);
    });
  });

  describe('PUT /funcionarios/:cpf', () => {
    it('deve atualizar funcionário com sucesso', async () => {
      const funcionarioData = {
        cpf: '12345678901',
        nome: 'João Silva',
        email: 'joao@clinica.com',
        senha: 'senha123',
        cargo: 'Veterinário'
      };

      await request(app)
        .post('/funcionarios')
        .send(funcionarioData)
        .expect(201);
      const updateData = {
        cargo: 'Veterinário Chefe',
        status: 'inativo'
      };

      const response = await request(app)
        .put('/funcionarios/12345678901')
        .send(updateData)
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.data.cargo).toBe(updateData.cargo);
      expect(response.body.data.status).toBe(updateData.status);
      expect(response.body.message).toBe('Funcionário atualizado com sucesso');
    });

    it('deve retornar erro 404 quando tentar atualizar funcionário inexistente', async () => {
      const updateData = {
        cargo: 'Veterinário Chefe'
      };

      const response = await request(app)
        .put('/funcionarios/99999999999')
        .send(updateData)
        .expect(404);

      expect(response.body.success).toBe(false);
      expect(response.body.error).toBe('Funcionário não encontrado');
    });
  });

  describe('DELETE /funcionarios/:cpf', () => {
    it('deve deletar funcionário com sucesso', async () => {
      const funcionarioData = {
        cpf: '12345678901',
        nome: 'João Silva',
        email: 'joao@clinica.com',
        senha: 'senha123',
        cargo: 'Veterinário'
      };

      await request(app)
        .post('/funcionarios')
        .send(funcionarioData)
        .expect(201);
      const response = await request(app)
        .delete('/funcionarios/12345678901')
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.message).toBe('Funcionário deletado com sucesso');
    });

    it('deve retornar erro 404 quando tentar deletar funcionário inexistente', async () => {
      const response = await request(app)
        .delete('/funcionarios/99999999999')
        .expect(404);

      expect(response.body.success).toBe(false);
      expect(response.body.error).toBe('Funcionário não encontrado');
    });
  });
});

describe('FuncionarioService', () => {
  let funcionarioService: FuncionarioService;

  beforeEach(() => {
    funcionarioService = new FuncionarioService();
  });

  describe('createFuncionario', () => {
    it('deve criar funcionário e usuário com sucesso', async () => {
      const usuarioData = {
        cpf: '12345678901',
        nome: 'João Silva',
        email: 'joao@clinica.com',
        senha: 'senha123',
        dataCadastro: new Date()
      };

      const funcionarioData = {
        cargo: 'Veterinário',
        registroProfissional: 'CRMV-12345',
        status: 'ativo',
        nivelAcesso: 2
      };

      const result = await funcionarioService.createFuncionario(usuarioData, funcionarioData);

      expect(result.cpf).toBe(usuarioData.cpf);
      expect(result.cargo).toBe(funcionarioData.cargo);
      expect(result.status).toBe(funcionarioData.status);
    });

    it('deve lançar erro quando usuário já existe', async () => {
      const usuarioData = {
        cpf: '12345678901',
        nome: 'João Silva',
        email: 'joao@clinica.com',
        senha: 'senha123',
        dataCadastro: new Date()
      };

      const funcionarioData = {
        cargo: 'Veterinário',
        registroProfissional: 'CRMV-12345',
        status: 'ativo',
        nivelAcesso: 2
      };

      await funcionarioService.createFuncionario(usuarioData, funcionarioData);
      await expect(
        funcionarioService.createFuncionario(usuarioData, funcionarioData)
      ).rejects.toThrow('Usuário já cadastrado com este CPF');
    });
  });

  describe('getByCpf', () => {
    it('deve retornar funcionário quando CPF existe', async () => {
      const usuarioData = {
        cpf: '12345678901',
        nome: 'João Silva',
        email: 'joao@clinica.com',
        senha: 'senha123',
        dataCadastro: new Date()
      };

      const funcionarioData = {
        cargo: 'Veterinário',
        registroProfissional: 'CRMV-12345',
        status: 'ativo',
        nivelAcesso: 2
      };

      await funcionarioService.createFuncionario(usuarioData, funcionarioData);

      const result = await funcionarioService.getByCpf('12345678901');

      expect(result).not.toBeNull();
      expect(result?.cpf).toBe('12345678901');
      expect(result?.cargo).toBe('Veterinário');
    });

    it('deve retornar null quando CPF não existe', async () => {
      const result = await funcionarioService.getByCpf('99999999999');
      expect(result).toBeNull();
    });
  });

  describe('getAll', () => {
    it('deve retornar lista vazia quando não há funcionários', async () => {
      const result = await funcionarioService.getAll();
      expect(result).toEqual([]);
    });

    it('deve retornar lista de funcionários quando existem funcionários', async () => {
      const usuarioData = {
        cpf: '12345678901',
        nome: 'João Silva',
        email: 'joao@clinica.com',
        senha: 'senha123',
        dataCadastro: new Date()
      };

      const funcionarioData = {
        cargo: 'Veterinário',
        registroProfissional: 'CRMV-12345',
        status: 'ativo',
        nivelAcesso: 2
      };

      await funcionarioService.createFuncionario(usuarioData, funcionarioData);

      const result = await funcionarioService.getAll();

      expect(result).toHaveLength(1);
      expect(result[0]?.cpf).toBe('12345678901');
    });
  });
});

describe('FuncionarioRepository', () => {
  let funcionarioRepository: FuncionarioRepository;

  beforeEach(() => {
    funcionarioRepository = new FuncionarioRepository();
  });

  describe('create', () => {
    it('deve criar funcionário no banco de dados', async () => {
      const usuarioData = {
        cpf: '12345678901',
        nome: 'João Silva',
        email: 'joao@clinica.com',
        senha: 'senha123',
        dataCadastro: new Date()
      };

      await prisma.usuario.create({
        data: usuarioData
      });

      const funcionarioData = {
        cpf: '12345678901',
        cargo: 'Veterinário',
        registroProfissional: 'CRMV-12345',
        status: 'ativo',
        nivelAcesso: 2
      };

      const result = await funcionarioRepository.create(funcionarioData);

      expect(result.cpf).toBe(funcionarioData.cpf);
      expect(result.cargo).toBe(funcionarioData.cargo);
      expect(result.status).toBe(funcionarioData.status);
    });
  });

  describe('findByCpf', () => {
    it('deve retornar funcionário quando CPF existe', async () => {
      const usuarioData = {
        cpf: '12345678901',
        nome: 'João Silva',
        email: 'joao@clinica.com',
        senha: 'senha123',
        dataCadastro: new Date()
      };

      await prisma.usuario.create({
        data: usuarioData
      });

      const funcionarioData = {
        cpf: '12345678901',
        cargo: 'Veterinário',
        registroProfissional: 'CRMV-12345',
        status: 'ativo',
        nivelAcesso: 2
      };

      await funcionarioRepository.create(funcionarioData);

      const result = await funcionarioRepository.findByCpf('12345678901');

      expect(result).not.toBeNull();
      expect(result?.cpf).toBe('12345678901');
    });

    it('deve retornar null quando CPF não existe', async () => {
      const result = await funcionarioRepository.findByCpf('99999999999');
      expect(result).toBeNull();
    });
  });

  describe('findAll', () => {
    it('deve retornar lista vazia quando não há funcionários', async () => {
      const result = await funcionarioRepository.findAll();
      expect(result).toEqual([]);
    });

    it('deve retornar lista de funcionários quando existem funcionários', async () => {
      const usuarioData = {
        cpf: '12345678901',
        nome: 'João Silva',
        email: 'joao@clinica.com',
        senha: 'senha123',
        dataCadastro: new Date()
      };

      await prisma.usuario.create({
        data: usuarioData
      });

      const funcionarioData = {
        cpf: '12345678901',
        cargo: 'Veterinário',
        registroProfissional: 'CRMV-12345',
        status: 'ativo',
        nivelAcesso: 2
      };

      await funcionarioRepository.create(funcionarioData);

      const result = await funcionarioRepository.findAll();

      expect(result).toHaveLength(1);
      expect(result[0]?.cpf).toBe('12345678901');
    });
  });

  describe('update', () => {
    it('deve atualizar funcionário no banco de dados', async () => {
      const usuarioData = {
        cpf: '12345678901',
        nome: 'João Silva',
        email: 'joao@clinica.com',
        senha: 'senha123',
        dataCadastro: new Date()
      };

      await prisma.usuario.create({
        data: usuarioData
      });

      const funcionarioData = {
        cpf: '12345678901',
        cargo: 'Veterinário',
        registroProfissional: 'CRMV-12345',
        status: 'ativo',
        nivelAcesso: 2
      };

      await funcionarioRepository.create(funcionarioData);

      const updateData = {
        cargo: 'Veterinário Chefe',
        status: 'inativo'
      };

      const result = await funcionarioRepository.update('12345678901', updateData);

      expect(result).not.toBeNull();
      expect(result?.cargo).toBe(updateData.cargo);
      expect(result?.status).toBe(updateData.status);
    });

    it('deve retornar null quando CPF não existe', async () => {
      const updateData = {
        cargo: 'Veterinário Chefe'
      };

      const result = await funcionarioRepository.update('99999999999', updateData);
      expect(result).toBeNull();
    });
  });

  describe('delete', () => {
    it('deve deletar funcionário do banco de dados', async () => {
      const usuarioData = {
        cpf: '12345678901',
        nome: 'João Silva',
        email: 'joao@clinica.com',
        senha: 'senha123',
        dataCadastro: new Date()
      };

      await prisma.usuario.create({
        data: usuarioData
      });

      const funcionarioData = {
        cpf: '12345678901',
        cargo: 'Veterinário',
        registroProfissional: 'CRMV-12345',
        status: 'ativo',
        nivelAcesso: 2
      };

      await funcionarioRepository.create(funcionarioData);

      const result = await funcionarioRepository.delete('12345678901');

      expect(result).toBe(true);

      const funcionario = await funcionarioRepository.findByCpf('12345678901');
      expect(funcionario).toBeNull();
    });

    it('deve retornar false quando CPF não existe', async () => {
      const result = await funcionarioRepository.delete('99999999999');
      expect(result).toBe(false);
    });
  });
});
