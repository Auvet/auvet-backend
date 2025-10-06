import { Vacina } from '../../types';
import prisma from '../../config/database';

export class VacinaRepository {
  private prisma = prisma;

  async create(data: Omit<Vacina, 'id'>): Promise<Vacina> {
    const vacina = await this.prisma.vacina.create({
      data,
    });

    return vacina;
  }

  async findById(id: number): Promise<Vacina | null> {
    const vacina = await this.prisma.vacina.findUnique({
      where: { id },
    });

    return vacina;
  }

  async findByAnimalId(animalId: number): Promise<Vacina[]> {
    const vacinas = await this.prisma.vacina.findMany({
      where: { animalId },
    });

    return vacinas;
  }

  async findAll(): Promise<Vacina[]> {
    const vacinas = await this.prisma.vacina.findMany();
    return vacinas;
  }

  async update(id: number, data: Partial<Vacina>): Promise<Vacina | null> {
    try {
      const vacina = await this.prisma.vacina.update({
        where: { id },
        data,
      });

      return vacina;
    } catch (error) {
      console.error('Erro ao atualizar vacina:', error);
      return null;
    }
  }

  async delete(id: number): Promise<boolean> {
    try {
      await this.prisma.vacina.delete({
        where: { id },
      });

      return true;
    } catch (error) {
      console.error('Erro ao deletar vacina:', error);
      return false;
    }
  }
}

export default new VacinaRepository();
