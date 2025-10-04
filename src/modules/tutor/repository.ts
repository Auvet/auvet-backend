import { Tutor } from '../../types';
import prisma from '../../config/database';

export class TutorRepository {
  private prisma = prisma;

  async create(data: Tutor): Promise<Tutor> {
    const tutor = await this.prisma.tutor.create({
      data
    });

    return tutor;
  }

  async findByCpf(cpf: string): Promise<Tutor | null> {
    const tutor = await this.prisma.tutor.findUnique({
      where: { cpf }
    });

    return tutor;
  }

  async findAll(): Promise<Tutor[]> {
    const tutores = await this.prisma.tutor.findMany();
    return tutores;
  }

  async update(cpf: string, data: Partial<Tutor>): Promise<Tutor | null> {
    try {
      const tutor = await this.prisma.tutor.update({
        where: { cpf },
        data
      });

      return tutor;
    } catch (error) {
      return null;
    }
  }

  async delete(cpf: string): Promise<boolean> {
    try {
      await this.prisma.tutor.delete({
        where: { cpf }
      });

      return true;
    } catch (error) {
      return false;
    }
  }
}

export default new TutorRepository();
