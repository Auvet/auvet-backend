import { Router, Request, Response } from 'express';
import { TutorClinicaService } from './service';
import { ApiResponse } from '../../types';

export class TutorClinicaController {
  public router: Router;
  private tutorClinicaService: TutorClinicaService;

  constructor() {
    this.router = Router();
    this.tutorClinicaService = new TutorClinicaService();
    this.setupRoutes();
  }

  private setupRoutes() {
    this.router.post('/', this.create.bind(this));
    this.router.get('/', this.getAll.bind(this));
    this.router.get('/tutor/:cpf', this.getByTutor.bind(this));
    this.router.get('/clinica/:cnpj', this.getByClinica.bind(this));
    this.router.delete('/tutor/:cpf/clinica/:cnpj', this.delete.bind(this));
  }

  async create(req: Request, res: Response) {
    try {
      const data = {
        tutorCpf: req.body.tutorCpf,
        clinicaCnpj: req.body.clinicaCnpj,
      };

      const tutorClinica = await this.tutorClinicaService.create(data);

      const response: ApiResponse = {
        success: true,
        data: tutorClinica,
        message: 'Relação tutor-clínica criada com sucesso',
      };

      res.status(201).json(response);
    } catch (error) {
      console.error('Erro ao criar relação tutor-clínica:', error);

      const response: ApiResponse = {
        success: false,
        error: error instanceof Error ? error.message : 'Erro interno do servidor',
      };

      res.status(500).json(response);
    }
  }

  async getAll(_req: Request, res: Response) {
    try {
      const tutoresClinicas = await this.tutorClinicaService.getAll();

      const response: ApiResponse = {
        success: true,
        data: tutoresClinicas,
        count: tutoresClinicas.length,
        message: 'Relações tutor-clínica listadas com sucesso',
      };

      res.status(200).json(response);
    } catch (error) {
      console.error('Erro ao listar relações tutor-clínica:', error);

      const response: ApiResponse = {
        success: false,
        error: error instanceof Error ? error.message : 'Erro interno do servidor',
      };

      res.status(500).json(response);
    }
  }

  async getByTutor(req: Request, res: Response) {
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

      const resultados = await this.tutorClinicaService.getByTutor(cpf);

      const response: ApiResponse = {
        success: true,
        data: resultados,
        count: resultados.length,
        message: 'Clínicas do tutor listadas com sucesso',
      };

      res.status(200).json(response);
    } catch (error) {
      console.error('Erro ao buscar clínicas do tutor:', error);

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

      const resultados = await this.tutorClinicaService.getByClinica(cnpj);

      const response: ApiResponse = {
        success: true,
        data: resultados,
        count: resultados.length,
        message: 'Tutores da clínica listados com sucesso',
      };

      res.status(200).json(response);
    } catch (error) {
      console.error('Erro ao buscar tutores da clínica:', error);

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

      const deleted = await this.tutorClinicaService.delete(cpf, cnpj);

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
        message: 'Relação tutor-clínica deletada com sucesso',
      };

      res.status(200).json(response);
    } catch (error) {
      console.error('Erro ao deletar relação tutor-clínica:', error);

      const response: ApiResponse = {
        success: false,
        error: error instanceof Error ? error.message : 'Erro interno do servidor',
      };

      res.status(500).json(response);
    }
  }
}

export default new TutorClinicaController();

