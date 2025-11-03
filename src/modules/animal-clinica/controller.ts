import { Router, Request, Response } from 'express';
import { AnimalClinicaService } from './service';
import { ApiResponse } from '../../types';

export class AnimalClinicaController {
  public router: Router;
  private animalClinicaService: AnimalClinicaService;

  constructor() {
    this.router = Router();
    this.animalClinicaService = new AnimalClinicaService();
    this.setupRoutes();
  }

  private setupRoutes() {
    this.router.post('/', this.create.bind(this));
    this.router.get('/', this.getAll.bind(this));
    this.router.get('/animal/:animalId', this.getByAnimal.bind(this));
    this.router.get('/clinica/:cnpj', this.getByClinica.bind(this));
    this.router.delete('/animal/:animalId/clinica/:cnpj', this.delete.bind(this));
  }

  async create(req: Request, res: Response) {
    try {
      const data = {
        animalId: parseInt(req.body.animalId),
        clinicaCnpj: req.body.clinicaCnpj,
      };

      if (isNaN(data.animalId) || data.animalId <= 0) {
        const response: ApiResponse = {
          success: false,
          error: 'ID do animal é obrigatório e deve ser um número positivo',
        };
        res.status(400).json(response);
        return;
      }

      const animalClinica = await this.animalClinicaService.create(data);

      const response: ApiResponse = {
        success: true,
        data: animalClinica,
        message: 'Relação animal-clínica criada com sucesso',
      };

      res.status(201).json(response);
    } catch (error) {
      console.error('Erro ao criar relação animal-clínica:', error);

      const response: ApiResponse = {
        success: false,
        error: error instanceof Error ? error.message : 'Erro interno do servidor',
      };

      res.status(500).json(response);
    }
  }

  async getAll(_req: Request, res: Response) {
    try {
      const animaisClinicas = await this.animalClinicaService.getAll();

      const response: ApiResponse = {
        success: true,
        data: animaisClinicas,
        count: animaisClinicas.length,
        message: 'Relações animal-clínica listadas com sucesso',
      };

      res.status(200).json(response);
    } catch (error) {
      console.error('Erro ao listar relações animal-clínica:', error);

      const response: ApiResponse = {
        success: false,
        error: error instanceof Error ? error.message : 'Erro interno do servidor',
      };

      res.status(500).json(response);
    }
  }

  async getByAnimal(req: Request, res: Response) {
    try {
      const { animalId } = req.params;
      const animalIdNumber = parseInt(animalId!);

      if (!animalId || isNaN(animalIdNumber) || animalIdNumber <= 0) {
        const response: ApiResponse = {
          success: false,
          error: 'ID do animal é obrigatório e deve ser um número positivo',
        };
        res.status(400).json(response);
        return;
      }

      const resultados = await this.animalClinicaService.getByAnimal(animalIdNumber);

      const response: ApiResponse = {
        success: true,
        data: resultados,
        count: resultados.length,
        message: 'Clínicas do animal listadas com sucesso',
      };

      res.status(200).json(response);
    } catch (error) {
      console.error('Erro ao buscar clínicas do animal:', error);

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

      const resultados = await this.animalClinicaService.getByClinica(cnpj);

      const response: ApiResponse = {
        success: true,
        data: resultados,
        count: resultados.length,
        message: 'Animais da clínica listados com sucesso',
      };

      res.status(200).json(response);
    } catch (error) {
      console.error('Erro ao buscar animais da clínica:', error);

      const response: ApiResponse = {
        success: false,
        error: error instanceof Error ? error.message : 'Erro interno do servidor',
      };

      res.status(500).json(response);
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const { animalId, cnpj } = req.params;
      const animalIdNumber = parseInt(animalId!);

      if (!animalId || isNaN(animalIdNumber) || animalIdNumber <= 0 || !cnpj) {
        const response: ApiResponse = {
          success: false,
          error: 'ID do animal e CNPJ são obrigatórios',
        };
        res.status(400).json(response);
        return;
      }

      const deleted = await this.animalClinicaService.delete(animalIdNumber, cnpj);

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
        message: 'Relação animal-clínica deletada com sucesso',
      };

      res.status(200).json(response);
    } catch (error) {
      console.error('Erro ao deletar relação animal-clínica:', error);

      const response: ApiResponse = {
        success: false,
        error: error instanceof Error ? error.message : 'Erro interno do servidor',
      };

      res.status(500).json(response);
    }
  }
}

export default new AnimalClinicaController();

