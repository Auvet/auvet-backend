import { Router, Request, Response } from 'express';
import { ClinicaService } from './service';
import { ApiResponse } from '../../types';

export class ClinicaController {
  public router: Router;
  private clinicaService: ClinicaService;

  constructor() {
    this.router = Router();
    this.clinicaService = new ClinicaService();
    this.setupRoutes();
  }

  private setupRoutes() {
    this.router.post('/', this.create.bind(this));
    this.router.get('/', this.getAll.bind(this));
    this.router.get('/:cnpj', this.getByCnpj.bind(this));
    this.router.put('/:cnpj', this.update.bind(this));
    this.router.delete('/:cnpj', this.delete.bind(this));
  }

  async create(req: Request, res: Response) {
    try {
      const clinicaData = {
        cnpj: req.body.cnpj,
        nome: req.body.nome,
        endereco: req.body.endereco || null,
        telefone: req.body.telefone || null,
        email: req.body.email || null,
        dataCadastro: new Date(),
        administradorCpf: req.body.administradorCpf,
      };

      const clinica = await this.clinicaService.createClinica(clinicaData);

      const response: ApiResponse = {
        success: true,
        data: clinica,
        message: 'Clínica criada com sucesso',
      };

      res.status(201).json(response);
    } catch (error) {
      console.error('Erro ao criar clínica:', error);

      const response: ApiResponse = {
        success: false,
        error: error instanceof Error ? error.message : 'Erro interno do servidor',
      };

      res.status(500).json(response);
    }
  }

  async getAll(_req: Request, res: Response) {
    try {
      const clinicas = await this.clinicaService.getAll();

      const response: ApiResponse = {
        success: true,
        data: clinicas,
        count: clinicas.length,
        message: 'Clínicas listadas com sucesso',
      };

      res.status(200).json(response);
    } catch (error) {
      console.error('Erro ao listar clínicas:', error);

      const response: ApiResponse = {
        success: false,
        error: error instanceof Error ? error.message : 'Erro interno do servidor',
      };

      res.status(500).json(response);
    }
  }

  async getByCnpj(req: Request, res: Response) {
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

      const clinica = await this.clinicaService.getByCnpj(cnpj);

      if (!clinica) {
        const response: ApiResponse = {
          success: false,
          error: 'Clínica não encontrada',
        };
        res.status(404).json(response);
        return;
      }

      const response: ApiResponse = {
        success: true,
        data: clinica,
        message: 'Clínica encontrada com sucesso',
      };

      res.status(200).json(response);
    } catch (error) {
      console.error('Erro ao buscar clínica:', error);

      const response: ApiResponse = {
        success: false,
        error: error instanceof Error ? error.message : 'Erro interno do servidor',
      };

      res.status(500).json(response);
    }
  }

  async update(req: Request, res: Response) {
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
      const updateData = {
        nome: req.body.nome,
        endereco: req.body.endereco || null,
        telefone: req.body.telefone || null,
        email: req.body.email || null,
        administradorCpf: req.body.administradorCpf,
      };

      const updatedClinica = await this.clinicaService.update(cnpj, updateData);

      if (!updatedClinica) {
        const response: ApiResponse = {
          success: false,
          error: 'Clínica não encontrada',
        };
        res.status(404).json(response);
        return;
      }

      const response: ApiResponse = {
        success: true,
        data: updatedClinica,
        message: 'Clínica atualizada com sucesso',
      };

      res.status(200).json(response);
    } catch (error) {
      console.error('Erro ao atualizar clínica:', error);

      const response: ApiResponse = {
        success: false,
        error: error instanceof Error ? error.message : 'Erro interno do servidor',
      };

      res.status(500).json(response);
    }
  }

  async delete(req: Request, res: Response) {
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

      const deleted = await this.clinicaService.delete(cnpj);

      if (!deleted) {
        const response: ApiResponse = {
          success: false,
          error: 'Clínica não encontrada',
        };
        res.status(404).json(response);
        return;
      }

      const response: ApiResponse = {
        success: true,
        message: 'Clínica deletada com sucesso',
      };

      res.status(200).json(response);
    } catch (error) {
      console.error('Erro ao deletar clínica:', error);

      const response: ApiResponse = {
        success: false,
        error: error instanceof Error ? error.message : 'Erro interno do servidor',
      };

      res.status(500).json(response);
    }
  }
}

export default new ClinicaController();
