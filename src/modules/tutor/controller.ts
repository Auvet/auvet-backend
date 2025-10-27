import { Request, Response, Router } from 'express';
import { TutorService } from './service';
import { ApiResponse, Tutor, Usuario } from '../../types';
import { TutorValidator } from '../../utils/validators';

export class TutorController {
  private tutorService: TutorService;
  public router: Router;

  constructor() {
    this.tutorService = new TutorService();
    this.router = Router();
    this.setupRoutes();
  }

  private setupRoutes(): void {
    this.router.post('/', this.create.bind(this));
    this.router.get('/', this.getAll.bind(this));
    this.router.get('/:cpf', this.getByCpf.bind(this));
    this.router.put('/:cpf', this.update.bind(this));
    this.router.delete('/:cpf', this.delete.bind(this));
  }

  async create(req: Request, res: Response): Promise<void> {
    try {
      const { cpf, nome, email, senha, telefone, endereco, clinicas } = req.body;

      const validation = TutorValidator.validateTutorData(req.body);
      if (!validation.isValid) {
        const response: ApiResponse = {
          success: false,
          error: validation.errors.join(', '),
        };
        res.status(400).json(response);
        return;
      }

      // Validar que pelo menos uma clínica foi informada
      if (!clinicas || !Array.isArray(clinicas) || clinicas.length === 0) {
        const response: ApiResponse = {
          success: false,
          error: 'Tutor deve estar vinculado a pelo menos uma clínica',
        };
        res.status(400).json(response);
        return;
      }

      const usuarioData: Usuario = {
        cpf,
        nome,
        email,
        senha,
        dataCadastro: new Date(),
      };

      const tutorData: Omit<Tutor, 'cpf'> = {
        telefone: telefone || null,
        endereco: endereco || null,
      };

      const tutorCriado = await this.tutorService.createTutor(usuarioData, tutorData, clinicas);

      const response: ApiResponse<Tutor> = {
        success: true,
        data: tutorCriado,
        message: 'Tutor criado com sucesso',
      };

      res.status(201).json(response);
    } catch (error) {
      console.error('Erro ao criar tutor:', error);

      const response: ApiResponse = {
        success: false,
        error: error instanceof Error ? error.message : 'Erro interno do servidor',
      };
      res.status(500).json(response);
    }
  }

  async getByCpf(req: Request, res: Response): Promise<void> {
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

      const tutor = await this.tutorService.getByCpf(cpf);

      if (!tutor) {
        const response: ApiResponse = {
          success: false,
          error: 'Tutor não encontrado',
        };
        res.status(404).json(response);
        return;
      }

      const response: ApiResponse<Tutor> = {
        success: true,
        data: tutor,
      };

      res.json(response);
    } catch (error) {
      console.error('Erro ao buscar tutor:', error);

      const response: ApiResponse = {
        success: false,
        error: 'Erro interno do servidor',
      };
      res.status(500).json(response);
    }
  }

  async getAll(_req: Request, res: Response): Promise<void> {
    try {
      const tutores = await this.tutorService.getAll();

      const response: ApiResponse<Tutor[]> = {
        success: true,
        data: tutores,
        count: tutores.length,
      };

      res.json(response);
    } catch (error) {
      console.error('Erro ao buscar tutores:', error);

      const response: ApiResponse = {
        success: false,
        error: 'Erro interno do servidor',
      };
      res.status(500).json(response);
    }
  }

  async update(req: Request, res: Response): Promise<void> {
    try {
      const { cpf } = req.params;
      const updateData: Partial<Tutor> = req.body;

      if (!cpf) {
        const response: ApiResponse = {
          success: false,
          error: 'CPF é obrigatório',
        };
        res.status(400).json(response);
        return;
      }

      const tutor = await this.tutorService.update(cpf, updateData);

      if (!tutor) {
        const response: ApiResponse = {
          success: false,
          error: 'Tutor não encontrado',
        };
        res.status(404).json(response);
        return;
      }

      const response: ApiResponse<Tutor> = {
        success: true,
        data: tutor,
        message: 'Tutor atualizado com sucesso',
      };

      res.json(response);
    } catch (error) {
      console.error('Erro ao atualizar tutor:', error);

      const response: ApiResponse = {
        success: false,
        error: 'Erro interno do servidor',
      };
      res.status(500).json(response);
    }
  }

  async delete(req: Request, res: Response): Promise<void> {
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

      const deleted = await this.tutorService.delete(cpf);

      if (!deleted) {
        const response: ApiResponse = {
          success: false,
          error: 'Tutor não encontrado',
        };
        res.status(404).json(response);
        return;
      }

      const response: ApiResponse = {
        success: true,
        message: 'Tutor deletado com sucesso',
      };

      res.json(response);
    } catch (error) {
      console.error('Erro ao deletar tutor:', error);

      const response: ApiResponse = {
        success: false,
        error: 'Erro interno do servidor',
      };
      res.status(500).json(response);
    }
  }
}

export default new TutorController();
