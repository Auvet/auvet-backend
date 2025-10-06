import { Request, Response, Router } from 'express';
import { VacinaService } from './service';
import { ApiResponse, Vacina } from '../../types';
import { VacinaValidator } from '../../utils/validators';

export class VacinaController {
  private vacinaService: VacinaService;
  public router: Router;

  constructor() {
    this.vacinaService = new VacinaService();
    this.router = Router();
    this.setupRoutes();
  }

  private setupRoutes(): void {
    this.router.post('/', this.create.bind(this));
    this.router.get('/', this.getAll.bind(this));
    this.router.get('/animal/:animalId', this.getByAnimalId.bind(this));
    this.router.get('/:id', this.getById.bind(this));
    this.router.put('/:id', this.update.bind(this));
    this.router.delete('/:id', this.delete.bind(this));
  }

  async create(req: Request, res: Response): Promise<void> {
    try {
      const { nome, fabricante, dataAplicacao, dataValidade, animalId } = req.body;

      const validation = VacinaValidator.validateVacinaData(req.body);
      if (!validation.isValid) {
        const response: ApiResponse = {
          success: false,
          error: validation.errors.join(', '),
        };
        res.status(400).json(response);
        return;
      }

      const vacinaData: Omit<Vacina, 'id'> = {
        nome,
        fabricante: fabricante || null,
        dataAplicacao: new Date(dataAplicacao),
        dataValidade: dataValidade ? new Date(dataValidade) : null,
        animalId,
      };

      const vacinaCriada = await this.vacinaService.createVacina(vacinaData);

      const response: ApiResponse<Vacina> = {
        success: true,
        data: vacinaCriada,
        message: 'Vacina criada com sucesso',
      };

      res.status(201).json(response);
    } catch (error) {
      console.error('Erro ao criar vacina:', error);

      const response: ApiResponse = {
        success: false,
        error: error instanceof Error ? error.message : 'Erro interno do servidor',
      };
      res.status(500).json(response);
    }
  }

  async getById(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const idNumber = parseInt(id!);

      if (isNaN(idNumber)) {
        const response: ApiResponse = {
          success: false,
          error: 'ID deve ser um número válido',
        };
        res.status(400).json(response);
        return;
      }

      const vacina = await this.vacinaService.getById(idNumber);

      if (!vacina) {
        const response: ApiResponse = {
          success: false,
          error: 'Vacina não encontrada',
        };
        res.status(404).json(response);
        return;
      }

      const response: ApiResponse<Vacina> = {
        success: true,
        data: vacina,
      };

      res.json(response);
    } catch (error) {
      console.error('Erro ao buscar vacina:', error);

      const response: ApiResponse = {
        success: false,
        error: 'Erro interno do servidor',
      };
      res.status(500).json(response);
    }
  }

  async getByAnimalId(req: Request, res: Response): Promise<void> {
    try {
      const { animalId } = req.params;
      const animalIdNumber = parseInt(animalId!);

      if (isNaN(animalIdNumber)) {
        const response: ApiResponse = {
          success: false,
          error: 'ID do animal deve ser um número válido',
        };
        res.status(400).json(response);
        return;
      }

      const vacinas = await this.vacinaService.getByAnimalId(animalIdNumber);

      const response: ApiResponse<Vacina[]> = {
        success: true,
        data: vacinas,
        count: vacinas.length,
      };

      res.json(response);
    } catch (error) {
      console.error('Erro ao buscar vacinas do animal:', error);

      const response: ApiResponse = {
        success: false,
        error: 'Erro interno do servidor',
      };
      res.status(500).json(response);
    }
  }

  async getAll(_req: Request, res: Response): Promise<void> {
    try {
      const vacinas = await this.vacinaService.getAll();

      const response: ApiResponse<Vacina[]> = {
        success: true,
        data: vacinas,
        count: vacinas.length,
      };

      res.json(response);
    } catch (error) {
      console.error('Erro ao buscar vacinas:', error);

      const response: ApiResponse = {
        success: false,
        error: 'Erro interno do servidor',
      };
      res.status(500).json(response);
    }
  }

  async update(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      if (!id) {
        const response: ApiResponse = {
          success: false,
          error: 'ID é obrigatório',
        };
        res.status(400).json(response);
        return;
      }
      const idNumber = parseInt(id);
      const updateData: Partial<Vacina> = req.body;

      if (isNaN(idNumber)) {
        const response: ApiResponse = {
          success: false,
          error: 'ID deve ser um número válido',
        };
        res.status(400).json(response);
        return;
      }

      if (updateData.dataAplicacao) {
        updateData.dataAplicacao = new Date(updateData.dataAplicacao);
      }
      if (updateData.dataValidade) {
        updateData.dataValidade = new Date(updateData.dataValidade);
      }

      const vacina = await this.vacinaService.update(idNumber, updateData);

      if (!vacina) {
        const response: ApiResponse = {
          success: false,
          error: 'Vacina não encontrada',
        };
        res.status(404).json(response);
        return;
      }

      const response: ApiResponse<Vacina> = {
        success: true,
        data: vacina,
        message: 'Vacina atualizada com sucesso',
      };

      res.json(response);
    } catch (error) {
      console.error('Erro ao atualizar vacina:', error);

      const response: ApiResponse = {
        success: false,
        error: 'Erro interno do servidor',
      };
      res.status(500).json(response);
    }
  }

  async delete(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const idNumber = parseInt(id as string);

      if (isNaN(idNumber)) {
        const response: ApiResponse = {
          success: false,
          error: 'ID deve ser um número válido',
        };
        res.status(400).json(response);
        return;
      }

      const deleted = await this.vacinaService.delete(idNumber);

      if (!deleted) {
        const response: ApiResponse = {
          success: false,
          error: 'Vacina não encontrada',
        };
        res.status(404).json(response);
        return;
      }

      const response: ApiResponse = {
        success: true,
        message: 'Vacina deletada com sucesso',
      };

      res.json(response);
    } catch (error) {
      console.error('Erro ao deletar vacina:', error);

      const response: ApiResponse = {
        success: false,
        error: 'Erro interno do servidor',
      };
      res.status(500).json(response);
    }
  }
}

export default new VacinaController();
