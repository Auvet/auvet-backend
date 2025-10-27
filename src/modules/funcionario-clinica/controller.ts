import { Router, Request, Response } from 'express';
import { FuncionarioClinicaService } from './service';
import { ApiResponse } from '../../types';

export class FuncionarioClinicaController {
  public router: Router;
  private funcionarioClinicaService: FuncionarioClinicaService;

  constructor() {
    this.router = Router();
    this.funcionarioClinicaService = new FuncionarioClinicaService();
    this.setupRoutes();
  }

  private setupRoutes() {
    this.router.post('/', this.create.bind(this));
    this.router.get('/', this.getAll.bind(this));
    this.router.get('/funcionario/:cpf', this.getByFuncionario.bind(this));
    this.router.get('/clinica/:cnpj', this.getByClinica.bind(this));
    this.router.delete('/funcionario/:cpf/clinica/:cnpj', this.delete.bind(this));
  }

  async create(req: Request, res: Response) {
    try {
      const data = {
        funcionarioCpf: req.body.funcionarioCpf,
        clinicaCnpj: req.body.clinicaCnpj,
      };

      const funcionarioClinica = await this.funcionarioClinicaService.create(data);

      const response: ApiResponse = {
        success: true,
        data: funcionarioClinica,
        message: 'Relação funcionário-clínica criada com sucesso',
      };

      res.status(201).json(response);
    } catch (error) {
      console.error('Erro ao criar relação funcionário-clínica:', error);

      const response: ApiResponse = {
        success: false,
        error: error instanceof Error ? error.message : 'Erro interno do servidor',
      };

      res.status(500).json(response);
    }
  }

  async getAll(_req: Request, res: Response) {
    try {
      const funcionariosClinicas = await this.funcionarioClinicaService.getAll();

      const response: ApiResponse = {
        success: true,
        data: funcionariosClinicas,
        count: funcionariosClinicas.length,
        message: 'Relações funcionário-clínica listadas com sucesso',
      };

      res.status(200).json(response);
    } catch (error) {
      console.error('Erro ao listar relações funcionário-clínica:', error);

      const response: ApiResponse = {
        success: false,
        error: error instanceof Error ? error.message : 'Erro interno do servidor',
      };

      res.status(500).json(response);
    }
  }

  async getByFuncionario(req: Request, res: Response) {
    try {
      const { cpf } = req.params;

      if (!cpf) {
        const response: ApiResponse = {
          success: false,
          error: 'CPF é obrigatório',
        };
        res.status(400).json(response);
        return;
      }

      const resultados = await this.funcionarioClinicaService.getByFuncionario(cpf);

      const response: ApiResponse = {
        success: true,
        data: resultados,
        count: resultados.length,
        message: 'Clínicas do funcionário listadas com sucesso',
      };

      res.status(200).json(response);
    } catch (error) {
      console.error('Erro ao buscar clínicas do funcionário:', error);

      const response: ApiResponse = {
        success: false,
        error: error instanceof Error ? error.message : 'Erro interno do servidor',
      };

      res.status(500).json(response);
    }
  }

  async getByClinica(req: Request, res: Response) {
    try {
      const { cnpj } = req.params;

      if (!cnpj) {
        const response: ApiResponse = {
          success: false,
          error: 'CNPJ é obrigatório',
        };
        res.status(400).json(response);
        return;
      }

      const resultados = await this.funcionarioClinicaService.getByClinica(cnpj);

      const response: ApiResponse = {
        success: true,
        data: resultados,
        count: resultados.length,
        message: 'Funcionários da clínica listados com sucesso',
      };

      res.status(200).json(response);
    } catch (error) {
      console.error('Erro ao buscar funcionários da clínica:', error);

      const response: ApiResponse = {
        success: false,
        error: error instanceof Error ? error.message : 'Erro interno do servidor',
      };

      res.status(500).json(response);
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const { cpf, cnpj } = req.params;

      if (!cpf || !cnpj) {
        const response: ApiResponse = {
          success: false,
          error: 'CPF e CNPJ são obrigatórios',
        };
        res.status(400).json(response);
        return;
      }

      const deleted = await this.funcionarioClinicaService.delete(cpf, cnpj);

      if (!deleted) {
        const response: ApiResponse = {
          success: false,
          error: 'Relação não encontrada',
        };
        res.status(404).json(response);
        return;
      }

      const response: ApiResponse = {
        success: true,
        message: 'Relação funcionário-clínica deletada com sucesso',
      };

      res.status(200).json(response);
    } catch (error) {
      console.error('Erro ao deletar relação funcionário-clínica:', error);

      const response: ApiResponse = {
        success: false,
        error: error instanceof Error ? error.message : 'Erro interno do servidor',
      };

      res.status(500).json(response);
    }
  }
}

export default new FuncionarioClinicaController();

