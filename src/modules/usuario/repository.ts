import { Usuario } from '../../types';
import prisma from '../../config/database';

export class UsuarioRepository {
  async create(usuarioData: Usuario): Promise<Usuario> {
    const usuario = await prisma.usuario.create({
      data: usuarioData,
    });
    return usuario;
  }

  async getByCpf(cpf: string): Promise<Usuario | null> {
    const usuario = await prisma.usuario.findUnique({
      where: { cpf },
    });
    return usuario;
  }

  async getAll(): Promise<Usuario[]> {
    const usuarios = await prisma.usuario.findMany();
    return usuarios;
  }

  async update(cpf: string, updateData: Partial<Usuario>): Promise<Usuario | null> {
    try {
      const usuario = await prisma.usuario.update({
        where: { cpf },
        data: updateData,
      });
      return usuario;
    } catch (error) {
      console.error('Erro ao atualizar usuário:', error);
      return null;
    }
  }

  async delete(cpf: string): Promise<boolean> {
    try {
      await prisma.usuario.delete({
        where: { cpf },
      });
      return true;
    } catch (error) {
      console.error('Erro ao deletar usuário:', error);
      return false;
    }
  }
}

export default new UsuarioRepository();
