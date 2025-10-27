import prisma from '../../config/database';
import { FuncionarioClinica } from '../../types';

export class FuncionarioClinicaRepository {
  async create(data: FuncionarioClinica): Promise<FuncionarioClinica> {
    const funcionarioClinica = await prisma.funcionarioClinica.create({
      data,
    });
    return funcionarioClinica;
  }

  async findByCpfAndCnpj(funcionarioCpf: string, clinicaCnpj: string): Promise<FuncionarioClinica | null> {
    const funcionarioClinica = await prisma.funcionarioClinica.findUnique({
      where: {
        funcionarioCpf_clinicaCnpj: {
          funcionarioCpf,
          clinicaCnpj,
        },
      },
      include: {
        funcionario: {
          include: {
            usuario: true,
          },
        },
        clinica: true,
      },
    });
    return funcionarioClinica;
  }

  async findAll(): Promise<FuncionarioClinica[]> {
    const funcionariosClinicas = await prisma.funcionarioClinica.findMany({
      include: {
        funcionario: {
          include: {
            usuario: true,
          },
        },
        clinica: true,
      },
    });
    return funcionariosClinicas;
  }

  async findByFuncionario(funcionarioCpf: string) {
    const resultados = await prisma.funcionarioClinica.findMany({
      where: { funcionarioCpf },
      include: {
        clinica: true,
      },
    });
    return resultados;
  }

  async findByClinica(clinicaCnpj: string) {
    const resultados = await prisma.funcionarioClinica.findMany({
      where: { clinicaCnpj },
      include: {
        funcionario: {
          include: {
            usuario: true,
          },
        },
      },
    });
    return resultados;
  }

  async delete(funcionarioCpf: string, clinicaCnpj: string): Promise<boolean> {
    try {
      await prisma.funcionarioClinica.delete({
        where: {
          funcionarioCpf_clinicaCnpj: {
            funcionarioCpf,
            clinicaCnpj,
          },
        },
      });
      return true;
    } catch (error) {
      console.error('Erro ao deletar funcionário-clínica:', error);
      return false;
    }
  }

  async deleteByFuncionario(funcionarioCpf: string): Promise<number> {
    try {
      const result = await prisma.funcionarioClinica.deleteMany({
        where: { funcionarioCpf },
      });
      return result.count;
    } catch (error) {
      console.error('Erro ao deletar relações funcionário-clínica:', error);
      return 0;
    }
  }

  async deleteByClinica(clinicaCnpj: string): Promise<number> {
    try {
      const result = await prisma.funcionarioClinica.deleteMany({
        where: { clinicaCnpj },
      });
      return result.count;
    } catch (error) {
      console.error('Erro ao deletar relações funcionário-clínica:', error);
      return 0;
    }
  }
}

export default new FuncionarioClinicaRepository();

