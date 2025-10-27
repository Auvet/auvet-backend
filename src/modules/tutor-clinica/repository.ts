import prisma from '../../config/database';
import { TutorClinica } from '../../types';

export class TutorClinicaRepository {
  async create(data: TutorClinica): Promise<TutorClinica> {
    const tutorClinica = await prisma.tutorClinica.create({
      data,
    });
    return tutorClinica;
  }

  async findByCpfAndCnpj(tutorCpf: string, clinicaCnpj: string): Promise<TutorClinica | null> {
    const tutorClinica = await prisma.tutorClinica.findUnique({
      where: {
        tutorCpf_clinicaCnpj: {
          tutorCpf,
          clinicaCnpj,
        },
      },
      include: {
        tutor: {
          include: {
            usuario: true,
          },
        },
        clinica: true,
      },
    });
    return tutorClinica;
  }

  async findAll(): Promise<TutorClinica[]> {
    const tutoresClinicas = await prisma.tutorClinica.findMany({
      include: {
        tutor: {
          include: {
            usuario: true,
          },
        },
        clinica: true,
      },
    });
    return tutoresClinicas;
  }

  async findByTutor(tutorCpf: string) {
    const resultados = await prisma.tutorClinica.findMany({
      where: { tutorCpf },
      include: {
        clinica: true,
      },
    });
    return resultados;
  }

  async findByClinica(clinicaCnpj: string) {
    const resultados = await prisma.tutorClinica.findMany({
      where: { clinicaCnpj },
      include: {
        tutor: {
          include: {
            usuario: true,
          },
        },
      },
    });
    return resultados;
  }

  async delete(tutorCpf: string, clinicaCnpj: string): Promise<boolean> {
    try {
      await prisma.tutorClinica.delete({
        where: {
          tutorCpf_clinicaCnpj: {
            tutorCpf,
            clinicaCnpj,
          },
        },
      });
      return true;
    } catch (error) {
      console.error('Erro ao deletar tutor-clínica:', error);
      return false;
    }
  }

  async deleteByTutor(tutorCpf: string): Promise<number> {
    try {
      const result = await prisma.tutorClinica.deleteMany({
        where: { tutorCpf },
      });
      return result.count;
    } catch (error) {
      console.error('Erro ao deletar relações tutor-clínica:', error);
      return 0;
    }
  }

  async deleteByClinica(clinicaCnpj: string): Promise<number> {
    try {
      const result = await prisma.tutorClinica.deleteMany({
        where: { clinicaCnpj },
      });
      return result.count;
    } catch (error) {
      console.error('Erro ao deletar relações tutor-clínica:', error);
      return 0;
    }
  }
}

export default new TutorClinicaRepository();

