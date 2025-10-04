import { Request, Response, Router } from 'express';
import { UsuarioService } from './service';
import { UsuarioRepository } from './repository';
import { ApiResponse, Usuario } from '../../types';
import { UsuarioValidator } from '../../utils/validators';

export class UsuarioController {
  private usuarioService: UsuarioService;
  public router: Router;

  constructor() {
    const usuarioRepository = new UsuarioRepository();
    this.usuarioService = new UsuarioService(usuarioRepository);
    this.router = Router();
    this.setupRoutes();
  }

  private setupRoutes(): void {
    this.router.post('/', this.create.bind(this));
    this.router.post('/login', this.login.bind(this));
    this.router.get('/', this.getAll.bind(this));
    this.router.get('/:cpf', this.getByCpf.bind(this));
    this.router.put('/:cpf', this.update.bind(this));
    this.router.delete('/:cpf', this.delete.bind(this));
  }

  async create(req: Request, res: Response): Promise<void> {
    try {
      const { cpf, nome, email, senha } = req.body;

      const validation = UsuarioValidator.validateUsuarioData(req.body);
      if (!validation.isValid) {
        const response: ApiResponse = {
          success: false,
          error: validation.errors.join(', ')
        };
        res.status(400).json(response);
        return;
      }

      const cleanCpf = cpf.replace(/[^\d]/g, '');

      const usuarioData: Usuario = {
        cpf: cleanCpf,
        nome,
        email,
        senha,
        dataCadastro: new Date()
      };

      const usuario = await this.usuarioService.create(usuarioData);

      const response: ApiResponse = {
        success: true,
        data: usuario,
        message: 'Usuário criado com sucesso'
      };

      res.status(201).json(response);
    } catch (error) {
      const response: ApiResponse = {
        success: false,
        error: error instanceof Error ? error.message : 'Erro interno do servidor'
      };
      res.status(500).json(response);
    }
  }

  async login(req: Request, res: Response): Promise<void> {
    try {
      const { cpf, senha } = req.body;

      if (!cpf || !senha) {
        const response: ApiResponse = {
          success: false,
          error: 'CPF e senha são obrigatórios'
        };
        res.status(400).json(response);
        return;
      }

      const usuario = await this.usuarioService.login(cpf, senha);

      const response: ApiResponse = {
        success: true,
        data: {
          cpf: usuario.cpf,
          nome: usuario.nome,
          email: usuario.email,
          dataCadastro: usuario.dataCadastro
        },
        message: 'Login realizado com sucesso'
      };

      res.status(200).json(response);
    } catch (error) {
      const response: ApiResponse = {
        success: false,
        error: error instanceof Error ? error.message : 'Erro interno do servidor'
      };
      
      const statusCode = error instanceof Error && 
        (error.message.includes('não encontrado') || error.message.includes('incorreta')) 
        ? 401 
        : 500;
        
      res.status(statusCode).json(response);
    }
  }

  async getAll(_req: Request, res: Response): Promise<void> {
    try {
      const usuarios = await this.usuarioService.getAll();

      const response: ApiResponse = {
        success: true,
        data: usuarios,
        count: usuarios.length,
        message: 'Usuários encontrados com sucesso'
      };

      res.status(200).json(response);
    } catch (error) {
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

      const usuario = await this.usuarioService.getByCpf(cpf);

      if (!usuario) {
        const response: ApiResponse = {
          success: false,
          error: 'Usuário não encontrado'
        };
        res.status(404).json(response);
        return;
      }

      const response: ApiResponse = {
        success: true,
        data: usuario
      };

      res.status(200).json(response);
    } catch (error) {
      const response: ApiResponse = {
        success: false,
        error: error instanceof Error ? error.message : 'Erro interno do servidor'
      };
      res.status(500).json(response);
    }
  }

  async update(req: Request, res: Response): Promise<void> {
    try {
      const { cpf } = req.params;
      const updateData = req.body;

      if (!cpf) {
        const response: ApiResponse = {
          success: false,
          error: 'CPF é obrigatório'
        };
        res.status(400).json(response);
        return;
      }

      const usuario = await this.usuarioService.update(cpf, updateData);

      const response: ApiResponse = {
        success: true,
        data: usuario,
        message: 'Usuário atualizado com sucesso'
      };

      res.status(200).json(response);
    } catch (error) {
      const response: ApiResponse = {
        success: false,
        error: error instanceof Error ? error.message : 'Erro interno do servidor'
      };
      
      const statusCode = error instanceof Error && error.message.includes('não encontrado') 
        ? 404 
        : 500;
        
      res.status(statusCode).json(response);
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

      await this.usuarioService.delete(cpf);

      const response: ApiResponse = {
        success: true,
        message: 'Usuário deletado com sucesso'
      };

      res.status(200).json(response);
    } catch (error) {
      const response: ApiResponse = {
        success: false,
        error: error instanceof Error ? error.message : 'Erro interno do servidor'
      };
      
      const statusCode = error instanceof Error && error.message.includes('não encontrado') 
        ? 404 
        : 500;
        
      res.status(statusCode).json(response);
    }
  }
}

export default new UsuarioController();
