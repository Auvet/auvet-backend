import { Funcionario, Usuario } from '../../types';
import { FuncionarioRepository } from './repository';
import { UsuarioService } from '../usuario/service';

export class FuncionarioService {
  private funcionarioRepository: FuncionarioRepository;
  private usuarioService: UsuarioService;

  constructor() {
    this.funcionarioRepository = new FuncionarioRepository();
    this.usuarioService = new UsuarioService();
  }

  async createFuncionario(usuarioData: Usuario, funcionarioData: Omit<Funcionario, 'cpf'>): Promise<Funcionario> {
    console.log(`Iniciando criação de funcionário para CPF: ${usuarioData.cpf}`);
    
    const existingUsuario = await this.usuarioService.getByCpf(usuarioData.cpf);
    if (existingUsuario) {
      console.log(`Usuário já existe com CPF: ${usuarioData.cpf}`);
      throw new Error('Usuário já cadastrado com este CPF');
    }

    const existingFuncionario = await this.funcionarioRepository.findByCpf(usuarioData.cpf);
    if (existingFuncionario) {
      console.log(`Funcionário já existe com CPF: ${usuarioData.cpf}`);
      throw new Error('Funcionário já cadastrado com este CPF');
    }

    const usuario = await this.usuarioService.create(usuarioData);
    console.log(`Usuário criado com sucesso: ${usuario.cpf}`);

    const funcionario = await this.funcionarioRepository.create({
      cpf: usuarioData.cpf,
      ...funcionarioData
    });

    console.log(`Funcionário criado com sucesso: ${funcionario.cpf} - Cargo: ${funcionario.cargo}`);
    
    return funcionario;
  }

  async getByCpf(cpf: string): Promise<Funcionario | null> {
    console.log(`Buscando funcionário por CPF: ${cpf}`);
    
    const funcionario = await this.funcionarioRepository.findByCpf(cpf);
    
    if (funcionario) {
      console.log(`Funcionário encontrado: ${funcionario.cpf} - ${funcionario.cargo}`);
    } else {
      console.log(`Funcionário não encontrado para CPF: ${cpf}`);
    }
    
    return funcionario;
  }

  async getAll(): Promise<Funcionario[]> {
    console.log('Buscando todos os funcionários');
    
    const funcionarios = await this.funcionarioRepository.findAll();
    
    console.log(`Encontrados ${funcionarios.length} funcionários`);
    
    return funcionarios;
  }

  async update(cpf: string, updateData: Partial<Funcionario>): Promise<Funcionario | null> {
    console.log(`Atualizando funcionário CPF: ${cpf}`);
    
    const funcionario = await this.funcionarioRepository.update(cpf, updateData);
    
    if (funcionario) {
      console.log(`Funcionário atualizado com sucesso: ${funcionario.cpf}`);
    } else {
      console.log(`Falha ao atualizar funcionário CPF: ${cpf}`);
    }
    
    return funcionario;
  }

  async delete(cpf: string): Promise<boolean> {
    console.log(`Deletando funcionário CPF: ${cpf}`);
    
    const deleted = await this.funcionarioRepository.delete(cpf);
    
    if (deleted) {
      console.log(`Funcionário deletado com sucesso: ${cpf}`);
    } else {
      console.log(`Falha ao deletar funcionário CPF: ${cpf}`);
    }
    
    return deleted;
  }
}

export default new FuncionarioService();
