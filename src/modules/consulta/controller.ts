import { Request, Response, Router } from 'express';
import { ConsultaService } from './service';
import { Consulta, ApiResponse } from '../../types';

export class ConsultaController {
  public router: Router;
  private consultaService: ConsultaService;

  constructor() {
    this.router = Router();
    this.consultaService = new ConsultaService();
    this.setupRoutes();
  }

  private setupRoutes() {
    this.router.post('/', this.create.bind(this));
    this.router.get('/', this.getAll.bind(this));
    this.router.get('/animal/:animalId', this.getByAnimalId.bind(this));
    this.router.get('/funcionario/:funcionarioCpf', this.getByFuncionarioCpf.bind(this));
    this.router.get('/:id', this.getById.bind(this));
    this.router.put('/:id', this.update.bind(this));
    this.router.delete('/:id', this.delete.bind(this));
  }

  async create(req: Request, res: Response) {
    try {
      const consultaData: Omit<Consulta, 'id'> = {
        data: new Date(req.body.data),
        hora: new Date(req.body.hora),
        motivo: req.body.motivo || null,
        status: req.body.status || 'agendada',
        observacoes: req.body.observacoes || null,
        animalId: req.body.animalId,
        funcionarioCpf: req.body.funcionarioCpf
      };

      const consulta = await this.consultaService.createConsulta(consultaData);

      const response: ApiResponse = {
        success: true,
        data: consulta,
        message: 'Consulta criada com sucesso'
      };

      res.status(201).json(response);
    } catch (error) {
      console.error('Erro ao criar consulta:', error);

      const response: ApiResponse = {
        success: false,
        error: error instanceof Error ? error.message : 'Erro interno do servidor'
      };

      res.status(500).json(response);
    }
  }

  async getAll(_req: Request, res: Response) {
    try {
      const consultas = await this.consultaService.getAll();

      const response: ApiResponse = {
        success: true,
        data: consultas,
        count: consultas.length,
        message: 'Consultas listadas com sucesso'
      };

      res.status(200).json(response);
    } catch (error) {
      console.error('Erro ao listar consultas:', error);

      const response: ApiResponse = {
        success: false,
        error: error instanceof Error ? error.message : 'Erro interno do servidor'
      };

      res.status(500).json(response);
    }
  }

  async getById(req: Request, res: Response) {
    try {
      const id = parseInt(req.params['id']!);
      const consulta = await this.consultaService.getById(id);

      if (!consulta) {
        const response: ApiResponse = {
          success: false,
          error: 'Consulta não encontrada'
        };
        res.status(404).json(response);
        return;
      }

      const response: ApiResponse = {
        success: true,
        data: consulta,
        message: 'Consulta encontrada com sucesso'
      };

      res.status(200).json(response);
    } catch (error) {
      console.error('Erro ao buscar consulta:', error);

      const response: ApiResponse = {
        success: false,
        error: error instanceof Error ? error.message : 'Erro interno do servidor'
      };

      res.status(500).json(response);
    }
  }

  async getByAnimalId(req: Request, res: Response) {
    try {
      const animalId = parseInt(req.params['animalId']!);
      const consultas = await this.consultaService.getByAnimalId(animalId);

      const response: ApiResponse = {
        success: true,
        data: consultas,
        count: consultas.length,
        message: 'Consultas do animal listadas com sucesso'
      };

      res.status(200).json(response);
    } catch (error) {
      console.error('Erro ao buscar consultas do animal:', error);

      const response: ApiResponse = {
        success: false,
        error: error instanceof Error ? error.message : 'Erro interno do servidor'
      };

      res.status(500).json(response);
    }
  }

  async getByFuncionarioCpf(req: Request, res: Response) {
    try {
      const funcionarioCpf = req.params['funcionarioCpf']!;
      const consultas = await this.consultaService.getByFuncionarioCpf(funcionarioCpf);

      const response: ApiResponse = {
        success: true,
        data: consultas,
        count: consultas.length,
        message: 'Consultas do funcionário listadas com sucesso'
      };

      res.status(200).json(response);
    } catch (error) {
      console.error('Erro ao buscar consultas do funcionário:', error);

      const response: ApiResponse = {
        success: false,
        error: error instanceof Error ? error.message : 'Erro interno do servidor'
      };

      res.status(500).json(response);
    }
  }

  async update(req: Request, res: Response) {
    try {
      const id = parseInt(req.params['id']!);
      const updateData: Partial<Omit<Consulta, 'id'>> = {};
      
      if (req.body.data) updateData.data = new Date(req.body.data);
      if (req.body.hora) updateData.hora = new Date(req.body.hora);
      if (req.body.motivo !== undefined) updateData.motivo = req.body.motivo || null;
      if (req.body.status !== undefined) updateData.status = req.body.status;
      if (req.body.observacoes !== undefined) updateData.observacoes = req.body.observacoes || null;
      if (req.body.animalId !== undefined) updateData.animalId = req.body.animalId;
      if (req.body.funcionarioCpf !== undefined) updateData.funcionarioCpf = req.body.funcionarioCpf;

      const updatedConsulta = await this.consultaService.update(id, updateData);

      if (!updatedConsulta) {
        const response: ApiResponse = {
          success: false,
          error: 'Consulta não encontrada'
        };
        res.status(404).json(response);
        return;
      }

      const response: ApiResponse = {
        success: true,
        data: updatedConsulta,
        message: 'Consulta atualizada com sucesso'
      };

      res.status(200).json(response);
    } catch (error) {
      console.error('Erro ao atualizar consulta:', error);

      const response: ApiResponse = {
        success: false,
        error: error instanceof Error ? error.message : 'Erro interno do servidor'
      };

      res.status(500).json(response);
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const id = parseInt(req.params['id']!);
      const result = await this.consultaService.delete(id);

      if (!result) {
        const response: ApiResponse = {
          success: false,
          error: 'Consulta não encontrada'
        };
        res.status(404).json(response);
        return;
      }

      const response: ApiResponse = {
        success: true,
        message: 'Consulta deletada com sucesso'
      };

      res.status(200).json(response);
    } catch (error) {
      console.error('Erro ao deletar consulta:', error);

      const response: ApiResponse = {
        success: false,
        error: error instanceof Error ? error.message : 'Erro interno do servidor'
      };

      res.status(500).json(response);
    }
  }
}