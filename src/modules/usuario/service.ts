import { Usuario } from '../../types';
import { UsuarioRepository } from './repository';
import { UsuarioValidator } from '../../utils/validators';

export class UsuarioService {
  private usuarioRepository: UsuarioRepository;

  constructor(usuarioRepository?: UsuarioRepository) {
    this.usuarioRepository = usuarioRepository || new UsuarioRepository();
  }

  async create(usuarioData: Usuario): Promise<Usuario> {
    console.log(`Criando usuário: ${usuarioData.cpf}`);
    
    const validation = UsuarioValidator.validateUsuarioData(usuarioData);
    if (!validation.isValid) {
      throw new Error(validation.errors.join(', '));
    }

    const existingUser = await this.usuarioRepository.getByCpf(usuarioData.cpf);
    if (existingUser) {
      throw new Error('Usuário já cadastrado com este CPF');
    }

    const usuario = await this.usuarioRepository.create(usuarioData);

    console.log(`Usuário criado com sucesso: ${usuario.cpf}`);
    return usuario;
  }

  async getByCpf(cpf: string): Promise<Usuario | null> {
    console.log(`Buscando usuário por CPF: ${cpf}`);
    
    const usuario = await this.usuarioRepository.getByCpf(cpf);

    if (usuario) {
      console.log(`Usuário encontrado: ${usuario.cpf}`);
    } else {
      console.log(`Usuário não encontrado para CPF: ${cpf}`);
    }
    
    return usuario;
  }

  async getAll(): Promise<Usuario[]> {
    console.log('Buscando todos os usuários');
    
    const usuarios = await this.usuarioRepository.getAll();
    
    console.log(`Encontrados ${usuarios.length} usuários`);
    
    return usuarios;
  }

  async update(cpf: string, updateData: Partial<Usuario>): Promise<Usuario | null> {
    console.log(`Atualizando usuário CPF: ${cpf}`);
    
    const existingUser = await this.usuarioRepository.getByCpf(cpf);
    if (!existingUser) {
      throw new Error('Usuário não encontrado');
    }

    const usuario = await this.usuarioRepository.update(cpf, updateData);

    if (usuario) {
      console.log(`Usuário atualizado com sucesso: ${usuario.cpf}`);
    } else {
      console.log(`Falha ao atualizar usuário CPF: ${cpf}`);
    }
    
    return usuario;
  }

  async delete(cpf: string): Promise<boolean> {
    console.log(`Deletando usuário CPF: ${cpf}`);
    
    const existingUser = await this.usuarioRepository.getByCpf(cpf);
    if (!existingUser) {
      throw new Error('Usuário não encontrado');
    }

    const success = await this.usuarioRepository.delete(cpf);

    if (success) {
      console.log(`Usuário deletado com sucesso: ${cpf}`);
    } else {
      console.log(`Falha ao deletar usuário CPF: ${cpf}`);
    }
    
    return success;
  }

  async login(cpf: string, senha: string): Promise<Usuario> {
    console.log(`Tentativa de login para CPF: ${cpf}`);
    
    if (!cpf || !senha) {
      throw new Error('CPF e senha são obrigatórios');
    }

    const usuario = await this.usuarioRepository.getByCpf(cpf);
    
    if (!usuario) {
      throw new Error('Usuário não encontrado');
    }

    if (usuario.senha !== senha) {
      throw new Error('Senha incorreta');
    }

    console.log(`Login realizado com sucesso para CPF: ${cpf}`);
    
    return usuario;
  }
}

export default new UsuarioService();
