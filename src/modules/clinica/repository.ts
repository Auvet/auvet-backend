import prisma from '../../config/database';
import { Clinica } from '../../types';

export class ClinicaRepository {
  constructor() {
  }

  async create(data: Clinica): Promise<Clinica> {
    const clinica = await prisma.clinica.create({
      data,
    });
    return clinica;
  }

  async findByCnpj(cnpj: string): Promise<Clinica | null> {
    const clinica = await prisma.clinica.findUnique({
      where: { cnpj },
    });
    return clinica;
  }

  async findAll(): Promise<Clinica[]> {
    const clinicas = await prisma.clinica.findMany({
      orderBy: { dataCadastro: 'desc' },
    });
    return clinicas;
  }

  async update(cnpj: string, data: Partial<Omit<Clinica, 'cnpj' | 'dataCadastro'>>): Promise<Clinica | null> {
    try {
      const clinica = await prisma.clinica.update({
        where: { cnpj },
        data,
      });
      return clinica;
    } catch (error) {
      console.error('Erro ao atualizar clínica:', error);
      return null;
    }
  }

  async delete(cnpj: string): Promise<boolean> {
    try {
      await prisma.clinica.delete({
        where: { cnpj },
      });
      return true;
    } catch (error) {
      console.error('Erro ao deletar clínica:', error);
      return false;
    }
  }
}

export default new ClinicaRepository();
