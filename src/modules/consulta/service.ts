import { Consulta } from '../../types';
import { ConsultaRepository } from './repository';

export class ConsultaService {
  private consultaRepository: ConsultaRepository;

  constructor() {
    this.consultaRepository = new ConsultaRepository();
  }

  async createConsulta(consultaData: Omit<Consulta, 'id'>): Promise<Consulta> {
    console.log(`Iniciando criação de consulta para animal ${consultaData.animalId}`);

    const validation = ConsultaValidator.validateConsultaData(consultaData);
    if (!validation.isValid) {
      throw new Error(validation.errors.join(', '));
    }

    if (consultaData.motivo && consultaData.motivo.trim().length > 200) {
      throw new Error('Motivo deve ter no máximo 200 caracteres');
    }

    if (consultaData.observacoes && consultaData.observacoes.trim().length > 1000) {
      throw new Error('Observações devem ter no máximo 1000 caracteres');
    }

    if (!['agendada', 'realizada', 'cancelada', 'remarcada'].includes(consultaData.status)) {
      throw new Error('Status deve ser: agendada, realizada, cancelada ou remarcada');
    }

    if (consultaData.status === 'agendada') {
      const hoje = new Date();
      const dataConsulta = new Date(consultaData.data);
      if (dataConsulta < hoje) {
        throw new Error('Não é possível agendar consulta para data no passado');
      }
    }

    const consulta = await this.consultaRepository.create(consultaData);
    console.log(`Consulta criada com sucesso: ${consulta.id}`);

    return consulta;
  }

  async getById(id: number): Promise<Consulta | null> {
    console.log(`Buscando consulta por ID: ${id}`);
    const consulta = await this.consultaRepository.findById(id);

    if (consulta) {
      console.log(`Consulta encontrada: ${consulta.id}`);
    } else {
      console.log(`Consulta não encontrada para ID: ${id}`);
    }

    return consulta;
  }

  async getByAnimalId(animalId: number): Promise<Consulta[]> {
    console.log(`Buscando consultas por animal ID: ${animalId}`);
    const consultas = await this.consultaRepository.findByAnimalId(animalId);
    console.log(`Encontradas ${consultas.length} consultas para o animal`);
    return consultas;
  }

  async getByFuncionarioCpf(funcionarioCpf: string): Promise<Consulta[]> {
    console.log(`Buscando consultas por funcionário CPF: ${funcionarioCpf}`);
    const consultas = await this.consultaRepository.findByFuncionarioCpf(funcionarioCpf);
    console.log(`Encontradas ${consultas.length} consultas para o funcionário`);
    return consultas;
  }

  async getAll(): Promise<Consulta[]> {
    console.log('Buscando todas as consultas');
    const consultas = await this.consultaRepository.findAll();
    console.log(`Encontradas ${consultas.length} consultas`);
    return consultas;
  }

  async update(id: number, updateData: Partial<Omit<Consulta, 'id'>>): Promise<Consulta | null> {
    console.log(`Atualizando consulta ID: ${id}`);

    if (updateData.motivo && updateData.motivo.trim().length > 200) {
      throw new Error('Motivo deve ter no máximo 200 caracteres');
    }

    if (updateData.observacoes && updateData.observacoes.trim().length > 1000) {
      throw new Error('Observações devem ter no máximo 1000 caracteres');
    }

    if (updateData.status && !['agendada', 'realizada', 'cancelada', 'remarcada'].includes(updateData.status)) {
      throw new Error('Status deve ser: agendada, realizada, cancelada ou remarcada');
    }

    const updatedConsulta = await this.consultaRepository.update(id, updateData);

    if (updatedConsulta) {
      console.log(`Consulta atualizada com sucesso: ${id}`);
    } else {
      console.log(`Falha ao atualizar consulta ID: ${id}`);
    }

    return updatedConsulta;
  }

  async delete(id: number): Promise<boolean> {
    console.log(`Deletando consulta ID: ${id}`);
    const result = await this.consultaRepository.delete(id);

    if (result) {
      console.log(`Consulta deletada com sucesso: ${id}`);
    } else {
      console.log(`Falha ao deletar consulta ID: ${id}`);
    }

    return result;
  }
}

import { ConsultaValidator } from '../../utils/validators';
