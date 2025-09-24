import { Funcionario } from '../../types';
import prisma from '../../config/database';

export class FuncionarioRepository {
  private prisma = prisma;

  async create(data: Funcionario): Promise<Funcionario> {
    const funcionario = await this.prisma.funcionario.create({
      data
    });

    return funcionario;
  }

  async findByCpf(cpf: string): Promise<Funcionario | null> {
    const funcionario = await this.prisma.funcionario.findUnique({
      where: { cpf }
    });

    return funcionario;
  }

  async findAll(): Promise<Funcionario[]> {
    const funcionarios = await this.prisma.funcionario.findMany();
    return funcionarios;
  }

  async update(cpf: string, data: Partial<Funcionario>): Promise<Funcionario | null> {
    try {
      const funcionario = await this.prisma.funcionario.update({
        where: { cpf },
        data
      });

      return funcionario;
    } catch (error) {
      return null;
    }
  }

  async delete(cpf: string): Promise<boolean> {
    try {
      await this.prisma.funcionario.delete({
        where: { cpf }
      });

      return true;
    } catch (error) {
      return false;
    }
  }
}

export default new FuncionarioRepository();
