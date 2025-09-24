import { Usuario } from '../../types';
import prisma from '../../config/database';

export class UsuarioService {
  private prisma = prisma;

  async create(usuarioData: Usuario): Promise<Usuario> {
    console.log(`Criando usuário: ${usuarioData.cpf}`);
    
    const usuario = await this.prisma.usuario.create({
      data: usuarioData
    });

    console.log(`Usuário criado com sucesso: ${usuario.cpf}`);
    return usuario;
  }

  async getByCpf(cpf: string): Promise<Usuario | null> {
    console.log(`Buscando usuário por CPF: ${cpf}`);
    
    const usuario = await this.prisma.usuario.findUnique({
      where: { cpf }
    });

    if (usuario) {
      console.log(`Usuário encontrado: ${usuario.cpf}`);
    } else {
      console.log(`Usuário não encontrado para CPF: ${cpf}`);
    }
    
    return usuario;
  }

  async getAll(): Promise<Usuario[]> {
    console.log('Buscando todos os usuários');
    
    const usuarios = await this.prisma.usuario.findMany();
    
    console.log(`Encontrados ${usuarios.length} usuários`);
    
    return usuarios;
  }

  async update(cpf: string, updateData: Partial<Usuario>): Promise<Usuario | null> {
    console.log(`Atualizando usuário CPF: ${cpf}`);
    
    try {
      const usuario = await this.prisma.usuario.update({
        where: { cpf },
        data: updateData
      });

      console.log(`Usuário atualizado com sucesso: ${usuario.cpf}`);
      return usuario;
    } catch (error) {
      console.log(`Falha ao atualizar usuário CPF: ${cpf}`);
      return null;
    }
  }

  async delete(cpf: string): Promise<boolean> {
    console.log(`Deletando usuário CPF: ${cpf}`);
    
    try {
      await this.prisma.usuario.delete({
        where: { cpf }
      });

      console.log(`Usuário deletado com sucesso: ${cpf}`);
      return true;
    } catch (error) {
      console.log(`Falha ao deletar usuário CPF: ${cpf}`);
      return false;
    }
  }
}

export default new UsuarioService();
