import { Consulta } from '../../types';
import prisma from '../../config/database';

export class ConsultaRepository {
  private prisma = prisma;

  async create(data: Omit<Consulta, 'id'>): Promise<Consulta> {
    const consulta = await this.prisma.consulta.create({
      data
    });
    return consulta;
  }

  async findById(id: number): Promise<Consulta | null> {
    const consulta = await this.prisma.consulta.findUnique({
      where: { id }
    });
    return consulta;
  }

  async findByAnimalId(animalId: number): Promise<Consulta[]> {
    const consultas = await this.prisma.consulta.findMany({
      where: { animalId },
      orderBy: { data: 'desc' }
    });
    return consultas;
  }

  async findByFuncionarioCpf(funcionarioCpf: string): Promise<Consulta[]> {
    const consultas = await this.prisma.consulta.findMany({
      where: { funcionarioCpf },
      orderBy: { data: 'desc' }
    });
    return consultas;
  }

  async findAll(): Promise<Consulta[]> {
    const consultas = await this.prisma.consulta.findMany({
      orderBy: { data: 'desc' }
    });
    return consultas;
  }

  async update(id: number, data: Partial<Omit<Consulta, 'id'>>): Promise<Consulta | null> {
    try {
      const consulta = await this.prisma.consulta.update({
        where: { id },
        data
      });
      return consulta;
    } catch (error) {
      return null;
    }
  }

  async delete(id: number): Promise<boolean> {
    try {
      await this.prisma.consulta.delete({
        where: { id }
      });
      return true;
    } catch (error) {
      return false;
    }
  }
}