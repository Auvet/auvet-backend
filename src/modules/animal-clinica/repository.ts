import prisma from '../../config/database';
import { AnimalClinica } from '../../types';

export class AnimalClinicaRepository {
  async create(data: AnimalClinica): Promise<AnimalClinica> {
    const animalClinica = await prisma.animalClinica.create({
      data,
    });
    return animalClinica;
  }

  async findByAnimalIdAndCnpj(animalId: number, clinicaCnpj: string): Promise<AnimalClinica | null> {
    const animalClinica = await prisma.animalClinica.findUnique({
      where: {
        animalId_clinicaCnpj: {
          animalId,
          clinicaCnpj,
        },
      },
      include: {
        animal: {
          include: {
            tutor: {
              include: {
                usuario: true,
              },
            },
          },
        },
        clinica: true,
      },
    });
    return animalClinica;
  }

  async findAll(): Promise<AnimalClinica[]> {
    const animaisClinicas = await prisma.animalClinica.findMany({
      include: {
        animal: {
          include: {
            tutor: {
              include: {
                usuario: true,
              },
            },
          },
        },
        clinica: true,
      },
    });
    return animaisClinicas;
  }

  async findByAnimal(animalId: number) {
    const resultados = await prisma.animalClinica.findMany({
      where: { animalId },
      include: {
        clinica: true,
      },
    });
    return resultados;
  }

  async findByClinica(clinicaCnpj: string) {
    const resultados = await prisma.animalClinica.findMany({
      where: { clinicaCnpj },
      include: {
        animal: {
          include: {
            tutor: {
              include: {
                usuario: true,
              },
            },
          },
        },
      },
    });
    return resultados;
  }

  async delete(animalId: number, clinicaCnpj: string): Promise<boolean> {
    try {
      await prisma.animalClinica.delete({
        where: {
          animalId_clinicaCnpj: {
            animalId,
            clinicaCnpj,
          },
        },
      });
      return true;
    } catch (error) {
      console.error('Erro ao deletar animal-clínica:', error);
      return false;
    }
  }

  async deleteByAnimal(animalId: number): Promise<number> {
    try {
      const result = await prisma.animalClinica.deleteMany({
        where: { animalId },
      });
      return result.count;
    } catch (error) {
      console.error('Erro ao deletar relações animal-clínica:', error);
      return 0;
    }
  }

  async deleteByClinica(clinicaCnpj: string): Promise<number> {
    try {
      const result = await prisma.animalClinica.deleteMany({
        where: { clinicaCnpj },
      });
      return result.count;
    } catch (error) {
      console.error('Erro ao deletar relações animal-clínica:', error);
      return 0;
    }
  }
}

export default new AnimalClinicaRepository();

