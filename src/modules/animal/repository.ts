import { Animal } from '../../types';
import prisma from '../../config/database';

export class AnimalRepository {
  private prisma = prisma;

  async create(data: Omit<Animal, 'id'>): Promise<Animal> {
    const animal = await this.prisma.animal.create({
      data
    });

    return {
      ...animal,
      peso: animal.peso ? Number(animal.peso) : null
    };
  }

  async findById(id: number): Promise<Animal | null> {
    const animal = await this.prisma.animal.findUnique({
      where: { id }
    });

    return animal ? {
      ...animal,
      peso: animal.peso ? Number(animal.peso) : null
    } : null;
  }

  async findByTutorCpf(tutorCpf: string): Promise<Animal[]> {
    const animais = await this.prisma.animal.findMany({
      where: { tutorCpf }
    });

    return animais.map((animal: any) => ({
      ...animal,
      peso: animal.peso ? Number(animal.peso) : null
    }));
  }

  async findAll(): Promise<Animal[]> {
    const animais = await this.prisma.animal.findMany();
    return animais.map((animal: any) => ({
      ...animal,
      peso: animal.peso ? Number(animal.peso) : null
    }));
  }

  async update(id: number, data: Partial<Animal>): Promise<Animal | null> {
    try {
      const animal = await this.prisma.animal.update({
        where: { id },
        data
      });

      return {
        ...animal,
        peso: animal.peso ? Number(animal.peso) : null
      };
    } catch (error) {
      return null;
    }
  }

  async delete(id: number): Promise<boolean> {
    try {
      await this.prisma.animal.delete({
        where: { id }
      });

      return true;
    } catch (error) {
      return false;
    }
  }
}

export default new AnimalRepository();
