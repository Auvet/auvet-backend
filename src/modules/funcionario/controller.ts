import { Request, Response, Router } from 'express';
import { FuncionarioService } from './service';
import { ApiResponse, Funcionario, Usuario } from '../../types';

export class FuncionarioController {
  private funcionarioService: FuncionarioService;
  public router: Router;

  constructor() {
    this.funcionarioService = new FuncionarioService();
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
      const { cpf, nome, email, senha, cargo, registroProfissional, status, nivelAcesso } = req.body;

      if (!cpf || !nome || !email || !senha || !cargo) {
        const response: ApiResponse = {
          success: false,
          error: 'CPF, nome, email, senha e cargo são obrigatórios'
        };
        res.status(400).json(response);
        return;
      }

      const usuarioData: Usuario = {
        cpf,
        nome,
        email,
        senha,
        dataCadastro: new Date()
      };

      const funcionarioData: Omit<Funcionario, 'cpf'> = {
        cargo,
        registroProfissional: registroProfissional || null,
        status: status || 'ativo',
        nivelAcesso: nivelAcesso || 1
      };

      const funcionarioCriado = await this.funcionarioService.createFuncionario(usuarioData, funcionarioData);
      
      const response: ApiResponse<Funcionario> = {
        success: true,
        data: funcionarioCriado,
        message: 'Funcionário criado com sucesso'
      };
      
      res.status(201).json(response);
    } catch (error) {
      console.error('Erro ao criar funcionário:', error);
      
      const response: ApiResponse = {
        success: false,
        error: error instanceof Error ? error.message : 'Erro interno do servidor'
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
          error: 'CPF é obrigatório'
        };
        res.status(400).json(response);
        return;
      }

      const funcionario = await this.funcionarioService.getByCpf(cpf);
      
      if (!funcionario) {
        const response: ApiResponse = {
          success: false,
          error: 'Funcionário não encontrado'
        };
        res.status(404).json(response);
        return;
      }
      
      const response: ApiResponse<Funcionario> = {
        success: true,
        data: funcionario
      };
      
      res.json(response);
    } catch (error) {
      console.error('Erro ao buscar funcionário:', error);
      
      const response: ApiResponse = {
        success: false,
        error: 'Erro interno do servidor'
      };
      res.status(500).json(response);
    }
  }

  async getAll(_req: Request, res: Response): Promise<void> {
    try {
      const funcionarios = await this.funcionarioService.getAll();
      
      const response: ApiResponse<Funcionario[]> = {
        success: true,
        data: funcionarios,
        count: funcionarios.length
      };
      
      res.json(response);
    } catch (error) {
      console.error('Erro ao buscar funcionários:', error);
      
      const response: ApiResponse = {
        success: false,
        error: 'Erro interno do servidor'
      };
      res.status(500).json(response);
    }
  }

  async update(req: Request, res: Response): Promise<void> {
    try {
      const { cpf } = req.params;
      const updateData: Partial<Funcionario> = req.body;

      if (!cpf) {
        const response: ApiResponse = {
          success: false,
          error: 'CPF é obrigatório'
        };
        res.status(400).json(response);
        return;
      }
      
      const funcionario = await this.funcionarioService.update(cpf, updateData);
      
      if (!funcionario) {
        const response: ApiResponse = {
          success: false,
          error: 'Funcionário não encontrado'
        };
        res.status(404).json(response);
        return;
      }
      
      const response: ApiResponse<Funcionario> = {
        success: true,
        data: funcionario,
        message: 'Funcionário atualizado com sucesso'
      };
      
      res.json(response);
    } catch (error) {
      console.error('Erro ao atualizar funcionário:', error);
      
      const response: ApiResponse = {
        success: false,
        error: 'Erro interno do servidor'
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
          error: 'CPF é obrigatório'
        };
        res.status(400).json(response);
        return;
      }
      
      const deleted = await this.funcionarioService.delete(cpf);
      
      if (!deleted) {
        const response: ApiResponse = {
          success: false,
          error: 'Funcionário não encontrado'
        };
        res.status(404).json(response);
        return;
      }
      
      const response: ApiResponse = {
        success: true,
        message: 'Funcionário deletado com sucesso'
      };
      
      res.json(response);
    } catch (error) {
      console.error('Erro ao deletar funcionário:', error);
      
      const response: ApiResponse = {
        success: false,
        error: 'Erro interno do servidor'
      };
      res.status(500).json(response);
    }
  }
}

export default new FuncionarioController();
