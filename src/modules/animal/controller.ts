import { Request, Response, Router } from 'express';
import { AnimalService } from './service';
import { ApiResponse, Animal } from '../../types';
import { AnimalValidator } from '../../utils/validators';

export class AnimalController {
  private animalService: AnimalService;
  public router: Router;

  constructor() {
    this.animalService = new AnimalService();
    this.router = Router();
    this.setupRoutes();
  }

  private setupRoutes(): void {
    this.router.post('/', this.create.bind(this));
    this.router.get('/', this.getAll.bind(this));
    this.router.get('/tutor/:tutorCpf', this.getByTutorCpf.bind(this));
    this.router.get('/:id', this.getById.bind(this));
    this.router.put('/:id', this.update.bind(this));
    this.router.delete('/:id', this.delete.bind(this));
  }

  async create(req: Request, res: Response): Promise<void> {
    try {
      const { nome, especie, raca, sexo, idade, peso, tutorCpf } = req.body;

      const validation = AnimalValidator.validateAnimalData(req.body);
      if (!validation.isValid) {
        const response: ApiResponse = {
          success: false,
          error: validation.errors.join(', ')
        };
        res.status(400).json(response);
        return;
      }

      const animalData: Omit<Animal, 'id'> = {
        nome,
        especie: especie || null,
        raca: raca || null,
        sexo: sexo || null,
        idade: idade || null,
        peso: peso || null,
        tutorCpf
      };

      const animalCriado = await this.animalService.createAnimal(animalData);
      
      const response: ApiResponse<Animal> = {
        success: true,
        data: animalCriado,
        message: 'Animal criado com sucesso'
      };
      
      res.status(201).json(response);
    } catch (error) {
      console.error('Erro ao criar animal:', error);
      
      const response: ApiResponse = {
        success: false,
        error: error instanceof Error ? error.message : 'Erro interno do servidor'
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
          error: 'ID deve ser um número válido'
        };
        res.status(400).json(response);
        return;
      }

      const animal = await this.animalService.getById(idNumber);
      
      if (!animal) {
        const response: ApiResponse = {
          success: false,
          error: 'Animal não encontrado'
        };
        res.status(404).json(response);
        return;
      }
      
      const response: ApiResponse<Animal> = {
        success: true,
        data: animal
      };
      
      res.json(response);
    } catch (error) {
      console.error('Erro ao buscar animal:', error);
      
      const response: ApiResponse = {
        success: false,
        error: 'Erro interno do servidor'
      };
      res.status(500).json(response);
    }
  }

  async getByTutorCpf(req: Request, res: Response): Promise<void> {
    try {
      const { tutorCpf } = req.params;

      const animais = await this.animalService.getByTutorCpf(tutorCpf!);
      
      const response: ApiResponse<Animal[]> = {
        success: true,
        data: animais,
        count: animais.length
      };
      
      res.json(response);
    } catch (error) {
      console.error('Erro ao buscar animais do tutor:', error);
      
      const response: ApiResponse = {
        success: false,
        error: 'Erro interno do servidor'
      };
      res.status(500).json(response);
    }
  }

  async getAll(_req: Request, res: Response): Promise<void> {
    try {
      const animais = await this.animalService.getAll();
      
      const response: ApiResponse<Animal[]> = {
        success: true,
        data: animais,
        count: animais.length
      };
      
      res.json(response);
    } catch (error) {
      console.error('Erro ao buscar animais:', error);
      
      const response: ApiResponse = {
        success: false,
        error: 'Erro interno do servidor'
      };
      res.status(500).json(response);
    }
  }

  async update(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const idNumber = parseInt(id!);
      const updateData: Partial<Animal> = req.body;

      if (isNaN(idNumber)) {
        const response: ApiResponse = {
          success: false,
          error: 'ID deve ser um número válido'
        };
        res.status(400).json(response);
        return;
      }
      
      const animal = await this.animalService.update(idNumber, updateData);
      
      if (!animal) {
        const response: ApiResponse = {
          success: false,
          error: 'Animal não encontrado'
        };
        res.status(404).json(response);
        return;
      }
      
      const response: ApiResponse<Animal> = {
        success: true,
        data: animal,
        message: 'Animal atualizado com sucesso'
      };
      
      res.json(response);
    } catch (error) {
      console.error('Erro ao atualizar animal:', error);
      
      const response: ApiResponse = {
        success: false,
        error: 'Erro interno do servidor'
      };
      res.status(500).json(response);
    }
  }

  async delete(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const idNumber = parseInt(id!);

      if (isNaN(idNumber)) {
        const response: ApiResponse = {
          success: false,
          error: 'ID deve ser um número válido'
        };
        res.status(400).json(response);
        return;
      }
      
      const deleted = await this.animalService.delete(idNumber);
      
      if (!deleted) {
        const response: ApiResponse = {
          success: false,
          error: 'Animal não encontrado'
        };
        res.status(404).json(response);
        return;
      }
      
      const response: ApiResponse = {
        success: true,
        message: 'Animal deletado com sucesso'
      };
      
      res.json(response);
    } catch (error) {
      console.error('Erro ao deletar animal:', error);
      
      const response: ApiResponse = {
        success: false,
        error: 'Erro interno do servidor'
      };
      res.status(500).json(response);
    }
  }
}

export default new AnimalController();
