import { ClinicaRepository } from './repository';
import { ClinicaValidator } from '../../utils/validators';
import { Clinica } from '../../types';

export class ClinicaService {
  private clinicaRepository: ClinicaRepository;

  constructor() {
    this.clinicaRepository = new ClinicaRepository();
  }

  async createClinica(clinicaData: Clinica): Promise<Clinica> {
    console.log(`Iniciando criação de clínica: ${clinicaData.nome}`);

    const validation = ClinicaValidator.validateClinicaData(clinicaData);
    if (!validation.isValid) {
      throw new Error(validation.errors.join(', '));
    }

    if (clinicaData.nome && clinicaData.nome.trim().length > 100) {
      throw new Error('Nome da clínica deve ter no máximo 100 caracteres');
    }

    if (clinicaData.endereco && clinicaData.endereco.trim().length > 200) {
      throw new Error('Endereço deve ter no máximo 200 caracteres');
    }

    if (clinicaData.telefone && clinicaData.telefone.trim().length > 20) {
      throw new Error('Telefone deve ter no máximo 20 caracteres');
    }

    if (clinicaData.email && clinicaData.email.trim().length > 100) {
      throw new Error('Email deve ter no máximo 100 caracteres');
    }

    const existingClinica = await this.clinicaRepository.findByCnpj(clinicaData.cnpj);
    if (existingClinica) {
      throw new Error('CNPJ já cadastrado');
    }

    const clinica = await this.clinicaRepository.create(clinicaData);
    console.log(`Clínica criada com sucesso: ${clinica.cnpj} - ${clinica.nome}`);

    return clinica;
  }

  async getByCnpj(cnpj: string): Promise<Clinica | null> {
    console.log(`Buscando clínica por CNPJ: ${cnpj}`);
    const clinica = await this.clinicaRepository.findByCnpj(cnpj);
    if (clinica) {
      console.log(`Clínica encontrada: ${clinica.cnpj} - ${clinica.nome}`);
    } else {
      console.log(`Clínica não encontrada para CNPJ: ${cnpj}`);
    }
    return clinica;
  }

  async getAll(): Promise<Clinica[]> {
    console.log('Buscando todas as clínicas');
    const clinicas = await this.clinicaRepository.findAll();
    console.log(`Encontradas ${clinicas.length} clínicas`);
    return clinicas;
  }

  async update(cnpj: string, clinicaData: Partial<Omit<Clinica, 'cnpj' | 'dataCadastro'>>): Promise<Clinica | null> {
    console.log(`Atualizando clínica CNPJ: ${cnpj}`);

    const existingClinica = await this.clinicaRepository.findByCnpj(cnpj);
    if (!existingClinica) {
      console.log(`Falha ao atualizar clínica CNPJ: ${cnpj}`);
      return null;
    }

    const updatedClinica = await this.clinicaRepository.update(cnpj, clinicaData);
    if (updatedClinica) {
      console.log(`Clínica atualizada com sucesso: ${cnpj}`);
    } else {
      console.log(`Falha ao atualizar clínica CNPJ: ${cnpj}`);
    }
    return updatedClinica;
  }

  async delete(cnpj: string): Promise<boolean> {
    console.log(`Deletando clínica CNPJ: ${cnpj}`);

    const existingClinica = await this.clinicaRepository.findByCnpj(cnpj);
    if (!existingClinica) {
      console.log(`Falha ao deletar clínica CNPJ: ${cnpj}`);
      return false;
    }

    const deleted = await this.clinicaRepository.delete(cnpj);
    if (deleted) {
      console.log(`Clínica deletada com sucesso: ${cnpj}`);
    } else {
      console.log(`Falha ao deletar clínica CNPJ: ${cnpj}`);
    }
    return deleted;
  }
}

export default new ClinicaService();
