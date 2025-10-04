export class FuncionarioValidator {
  static validateCPF(cpf: string): { isValid: boolean; error?: string } {
    if (!cpf || typeof cpf !== 'string') {
      return { isValid: false, error: 'CPF é obrigatório' };
    }

    const cleanCPF = cpf.replace(/[^\d]/g, '');

    if (cleanCPF.length !== 11) {
      return { isValid: false, error: 'CPF deve ter 11 dígitos' };
    }

    if (/^(\d)\1{10}$/.test(cleanCPF)) {
      return { isValid: false, error: 'CPF inválido (dígitos repetidos)' };
    }

    if (cleanCPF === '00000000000') {
      return { isValid: false, error: 'CPF inválido' };
    }

    let sum = 0;
    for (let i = 0; i < 9; i++) {
      sum += parseInt(cleanCPF.charAt(i)) * (10 - i);
    }
    let digit1 = 11 - (sum % 11);
    if (digit1 >= 10) digit1 = 0;

    sum = 0;
    for (let i = 0; i < 10; i++) {
      sum += parseInt(cleanCPF.charAt(i)) * (11 - i);
    }
    let digit2 = 11 - (sum % 11);
    if (digit2 >= 10) digit2 = 0;

    if (parseInt(cleanCPF.charAt(9)) !== digit1 || parseInt(cleanCPF.charAt(10)) !== digit2) {
      return { isValid: false, error: 'CPF inválido (dígitos verificadores incorretos)' };
    }

    return { isValid: true };
  }

  static validateEmail(email: string): { isValid: boolean; error?: string } {
    if (!email || typeof email !== 'string') {
      return { isValid: false, error: 'Email é obrigatório' };
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (!emailRegex.test(email)) {
      return { isValid: false, error: 'Email inválido' };
    }

    if (email.startsWith('@')) {
      return { isValid: false, error: 'Email inválido' };
    }

    const parts = email.split('@');
    if (parts.length !== 2) {
      return { isValid: false, error: 'Email inválido' };
    }

    const domain = parts[1];
    if (!domain || !domain.includes('.')) {
      return { isValid: false, error: 'Email deve ter extensão (ex: .com)' };
    }

    return { isValid: true };
  }

  static validatePassword(senha: string): { isValid: boolean; error?: string } {
    if (!senha || typeof senha !== 'string') {
      return { isValid: false, error: 'Senha é obrigatória' };
    }

    const cleanPassword = senha.trim();

    if (cleanPassword.length < 6) {
      return { isValid: false, error: 'Senha deve ter pelo menos 6 caracteres' };
    }

    if (cleanPassword.length > 50) {
      return { isValid: false, error: 'Senha deve ter no máximo 50 caracteres' };
    }

    if (cleanPassword !== senha) {
      return { isValid: false, error: 'Senha não pode ter espaços no início ou fim' };
    }

    if (/^\d+$/.test(cleanPassword)) {
      return { isValid: false, error: 'Senha deve conter letras e números' };
    }

    if (/^[a-zA-Z]+$/.test(cleanPassword)) {
      return { isValid: false, error: 'Senha deve conter letras e números' };
    }

    return { isValid: true };
  }

  static validateNome(nome: string): { isValid: boolean; error?: string } {
    if (!nome || typeof nome !== 'string') {
      return { isValid: false, error: 'Nome é obrigatório' };
    }

    const cleanNome = nome.trim();

    if (cleanNome.length < 2) {
      return { isValid: false, error: 'Nome deve ter pelo menos 2 caracteres' };
    }

    if (cleanNome.length > 100) {
      return { isValid: false, error: 'Nome deve ter no máximo 100 caracteres' };
    }

    if (cleanNome !== nome) {
      return { isValid: false, error: 'Nome não pode ter espaços no início ou fim' };
    }

    return { isValid: true };
  }

  static validateCargo(cargo: string): { isValid: boolean; error?: string } {
    if (!cargo || typeof cargo !== 'string') {
      return { isValid: false, error: 'Cargo é obrigatório' };
    }

    const cleanCargo = cargo.trim();

    if (cleanCargo.length < 2) {
      return { isValid: false, error: 'Cargo deve ter pelo menos 2 caracteres' };
    }

    if (cleanCargo.length > 30) {
      return { isValid: false, error: 'Cargo deve ter no máximo 30 caracteres' };
    }

    if (cleanCargo !== cargo) {
      return { isValid: false, error: 'Cargo não pode ter espaços no início ou fim' };
    }

    if (/^\d+$/.test(cleanCargo)) {
      return { isValid: false, error: 'Cargo inválido' };
    }

    if (/^[^a-zA-Z0-9\s]+$/.test(cleanCargo)) {
      return { isValid: false, error: 'Cargo inválido' };
    }

    return { isValid: true };
  }

  static validateStatus(status: string): { isValid: boolean; error?: string } {
    if (!status || typeof status !== 'string') {
      return { isValid: false, error: 'Status é obrigatório' };
    }

    const validStatuses = ['ativo', 'inativo', 'suspenso'];
    const normalizedStatus = status.toLowerCase();

    if (!validStatuses.includes(normalizedStatus)) {
      return { isValid: false, error: 'Status deve ser: ativo, inativo ou suspenso' };
    }

    return { isValid: true };
  }

  static validateNivelAcesso(nivelAcesso: number): { isValid: boolean; error?: string } {
    if (typeof nivelAcesso !== 'number') {
      return { isValid: false, error: 'Nível de acesso deve ser um número' };
    }

    if (nivelAcesso < 0) {
      return { isValid: false, error: 'Nível de acesso não pode ser negativo' };
    }

    if (nivelAcesso > 10) {
      return { isValid: false, error: 'Nível de acesso não pode ser maior que 10' };
    }

    return { isValid: true };
  }

  static validateFuncionarioData(data: any): { isValid: boolean; errors: string[] } {
    const errors: string[] = [];

    const cpfValidation = this.validateCPF(data.cpf);
    if (!cpfValidation.isValid) {
      errors.push(cpfValidation.error!);
    }

    const nomeValidation = this.validateNome(data.nome);
    if (!nomeValidation.isValid) {
      errors.push(nomeValidation.error!);
    }

    const emailValidation = this.validateEmail(data.email);
    if (!emailValidation.isValid) {
      errors.push(emailValidation.error!);
    }

    const senhaValidation = this.validatePassword(data.senha);
    if (!senhaValidation.isValid) {
      errors.push(senhaValidation.error!);
    }

    const cargoValidation = this.validateCargo(data.cargo);
    if (!cargoValidation.isValid) {
      errors.push(cargoValidation.error!);
    }

    if (data.status !== undefined) {
      const statusValidation = this.validateStatus(data.status);
      if (!statusValidation.isValid) {
        errors.push(statusValidation.error!);
      }
    }

    if (data.nivelAcesso !== undefined) {
      const nivelValidation = this.validateNivelAcesso(data.nivelAcesso);
      if (!nivelValidation.isValid) {
        errors.push(nivelValidation.error!);
      }
    }

    return {
      isValid: errors.length === 0,
      errors
    };
  }
}

export class ValidatorUtils {
  static formatCPF(cpf: string): string {
    if (!cpf) return '';
    const cleanCPF = cpf.replace(/[^\d]/g, '');
    return cleanCPF.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
  }

  static cleanCPF(cpf: string): string {
    return cpf.replace(/[^\d]/g, '');
  }

  static isValidCPFFormat(cpf: string): boolean {
    const cleanCPF = cpf.replace(/[^\d]/g, '');
    return /^\d{11}$/.test(cleanCPF);
  }

  static maskCPF(cpf: string): string {
    if (!cpf) return '';
    const cleanCPF = cpf.replace(/[^\d]/g, '');
    if (cleanCPF.length !== 11) return cpf;
    return `***.***.**${cleanCPF.slice(-3)}-${cleanCPF.slice(-2)}`;
  }

  static generateRandomCPF(): string {
    const numbers = Array.from({ length: 9 }, () => Math.floor(Math.random() * 10));
    
    let sum = 0;
    for (let i = 0; i < 9; i++) {
      sum += (numbers[i] || 0) * (10 - i);
    }
    let digit1 = (sum % 11) < 2 ? 0 : 11 - (sum % 11);
    numbers.push(digit1);
    
    sum = 0;
    for (let i = 0; i < 10; i++) {
      sum += (numbers[i] || 0) * (11 - i);
    }
    let digit2 = (sum % 11) < 2 ? 0 : 11 - (sum % 11);
    numbers.push(digit2);
    
    return numbers.join('');
  }
}

export class UsuarioValidator {
  static validateCPF(cpf: string): { isValid: boolean; error?: string } {
    if (!cpf || typeof cpf !== 'string') {
      return { isValid: false, error: 'CPF é obrigatório' };
    }

    const cleanCPF = cpf.replace(/[^\d]/g, '');

    if (cleanCPF.length !== 11) {
      return { isValid: false, error: 'CPF deve ter 11 dígitos' };
    }

    if (/^(\d)\1{10}$/.test(cleanCPF)) {
      return { isValid: false, error: 'CPF inválido (dígitos repetidos)' };
    }

    if (cleanCPF === '00000000000') {
      return { isValid: false, error: 'CPF inválido' };
    }

    let sum = 0;
    for (let i = 0; i < 9; i++) {
      sum += parseInt(cleanCPF.charAt(i)) * (10 - i);
    }
    let digit1 = 11 - (sum % 11);
    if (digit1 >= 10) digit1 = 0;

    sum = 0;
    for (let i = 0; i < 10; i++) {
      sum += parseInt(cleanCPF.charAt(i)) * (11 - i);
    }
    let digit2 = 11 - (sum % 11);
    if (digit2 >= 10) digit2 = 0;

    if (parseInt(cleanCPF.charAt(9)) !== digit1 || parseInt(cleanCPF.charAt(10)) !== digit2) {
      return { isValid: false, error: 'CPF inválido (dígitos verificadores incorretos)' };
    }

    return { isValid: true };
  }

  static validateNome(nome: string): { isValid: boolean; error?: string } {
    if (!nome || typeof nome !== 'string') {
      return { isValid: false, error: 'Nome é obrigatório' };
    }

    const cleanNome = nome.trim();

    if (cleanNome.length < 2) {
      return { isValid: false, error: 'Nome deve ter pelo menos 2 caracteres' };
    }

    if (cleanNome.length > 100) {
      return { isValid: false, error: 'Nome deve ter no máximo 100 caracteres' };
    }

    if (!/^[a-zA-ZÀ-ÿ\s]+$/.test(cleanNome)) {
      return { isValid: false, error: 'Nome deve conter apenas letras e espaços' };
    }

    return { isValid: true };
  }

  static validateEmail(email: string): { isValid: boolean; error?: string } {
    if (!email || typeof email !== 'string') {
      return { isValid: false, error: 'Email é obrigatório' };
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (!emailRegex.test(email)) {
      return { isValid: false, error: 'Email inválido' };
    }

    if (email.startsWith('@')) {
      return { isValid: false, error: 'Email inválido' };
    }

    const parts = email.split('@');
    if (parts.length !== 2) {
      return { isValid: false, error: 'Email inválido' };
    }

    const domain = parts[1];
    if (!domain || !domain.includes('.')) {
      return { isValid: false, error: 'Email deve ter extensão (ex: .com)' };
    }

    return { isValid: true };
  }

  static validateSenha(senha: string): { isValid: boolean; error?: string } {
    if (!senha || typeof senha !== 'string') {
      return { isValid: false, error: 'Senha é obrigatória' };
    }

    if (senha.length < 6) {
      return { isValid: false, error: 'Senha deve ter pelo menos 6 caracteres' };
    }

    if (senha.length > 50) {
      return { isValid: false, error: 'Senha deve ter no máximo 50 caracteres' };
    }

    return { isValid: true };
  }

  static validateUsuarioData(data: any): { isValid: boolean; errors: string[] } {
    const errors: string[] = [];

    const cpfValidation = this.validateCPF(data.cpf);
    if (!cpfValidation.isValid && cpfValidation.error) {
      errors.push(cpfValidation.error);
    }

    const nomeValidation = this.validateNome(data.nome);
    if (!nomeValidation.isValid && nomeValidation.error) {
      errors.push(nomeValidation.error);
    }

    const emailValidation = this.validateEmail(data.email);
    if (!emailValidation.isValid && emailValidation.error) {
      errors.push(emailValidation.error);
    }

    const senhaValidation = this.validateSenha(data.senha);
    if (!senhaValidation.isValid && senhaValidation.error) {
      errors.push(senhaValidation.error);
    }

    return {
      isValid: errors.length === 0,
      errors
    };
  }

  static generateRandomCPF(): string {
    const numbers = Array.from({ length: 11 }, () => Math.floor(Math.random() * 10));
    
    while (numbers.every(num => num === numbers[0])) {
      for (let i = 0; i < 11; i++) {
        numbers[i] = Math.floor(Math.random() * 10);
      }
    }
    
    return numbers.join('');
  }
}

export class TutorValidator {
  static validateCPF(cpf: string): { isValid: boolean; error?: string } {
    if (!cpf || typeof cpf !== 'string') {
      return { isValid: false, error: 'CPF é obrigatório' };
    }

    const cleanCPF = cpf.replace(/[^\d]/g, '');

    if (cleanCPF.length !== 11) {
      return { isValid: false, error: 'CPF deve ter 11 dígitos' };
    }

    if (/^(\d)\1{10}$/.test(cleanCPF)) {
      return { isValid: false, error: 'CPF inválido (dígitos repetidos)' };
    }

    if (cleanCPF === '00000000000') {
      return { isValid: false, error: 'CPF inválido' };
    }

    return { isValid: true };
  }

  static validateEmail(email: string): { isValid: boolean; error?: string } {
    if (!email || typeof email !== 'string') {
      return { isValid: false, error: 'Email é obrigatório' };
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (!emailRegex.test(email)) {
      return { isValid: false, error: 'Email inválido' };
    }

    if (email.startsWith('@')) {
      return { isValid: false, error: 'Email inválido' };
    }

    const parts = email.split('@');
    if (parts.length !== 2) {
      return { isValid: false, error: 'Email inválido' };
    }

    const domain = parts[1];
    if (!domain || !domain.includes('.')) {
      return { isValid: false, error: 'Email deve ter extensão (ex: .com)' };
    }

    return { isValid: true };
  }

  static validateNome(nome: string): { isValid: boolean; error?: string } {
    if (!nome || typeof nome !== 'string') {
      return { isValid: false, error: 'Nome é obrigatório' };
    }

    const trimmedNome = nome.trim();

    if (trimmedNome.length < 2) {
      return { isValid: false, error: 'Nome deve ter pelo menos 2 caracteres' };
    }

    if (trimmedNome.length > 100) {
      return { isValid: false, error: 'Nome deve ter no máximo 100 caracteres' };
    }

    if (!/^[a-zA-ZÀ-ÿ\s]+$/.test(trimmedNome)) {
      return { isValid: false, error: 'Nome deve conter apenas letras e espaços' };
    }

    return { isValid: true };
  }

  static validateSenha(senha: string): { isValid: boolean; error?: string } {
    if (!senha || typeof senha !== 'string') {
      return { isValid: false, error: 'Senha é obrigatória' };
    }

    if (senha.length < 6) {
      return { isValid: false, error: 'Senha deve ter pelo menos 6 caracteres' };
    }

    if (senha.length > 50) {
      return { isValid: false, error: 'Senha deve ter no máximo 50 caracteres' };
    }

    return { isValid: true };
  }

  static validateTelefone(telefone: string): { isValid: boolean; error?: string } {
    if (!telefone || typeof telefone !== 'string') {
      return { isValid: true }; 
    }

    const cleanTelefone = telefone.replace(/[^\d]/g, '');

    if (cleanTelefone.length < 10 || cleanTelefone.length > 11) {
      return { isValid: false, error: 'Telefone deve ter 10 ou 11 dígitos' };
    }

    return { isValid: true };
  }

  static validateEndereco(endereco: string): { isValid: boolean; error?: string } {
    if (!endereco || typeof endereco !== 'string') {
      return { isValid: true }; 
    }

    const trimmedEndereco = endereco.trim();

    if (trimmedEndereco.length < 5) {
      return { isValid: false, error: 'Endereço deve ter pelo menos 5 caracteres' };
    }

    if (trimmedEndereco.length > 200) {
      return { isValid: false, error: 'Endereço deve ter no máximo 200 caracteres' };
    }

    return { isValid: true };
  }

  static validateTutorData(data: any): { isValid: boolean; errors: string[] } {
    const errors: string[] = [];

    const cpfValidation = this.validateCPF(data.cpf);
    if (!cpfValidation.isValid) {
      errors.push(cpfValidation.error!);
    }

    const nomeValidation = this.validateNome(data.nome);
    if (!nomeValidation.isValid) {
      errors.push(nomeValidation.error!);
    }

    const emailValidation = this.validateEmail(data.email);
    if (!emailValidation.isValid) {
      errors.push(emailValidation.error!);
    }

    const senhaValidation = this.validateSenha(data.senha);
    if (!senhaValidation.isValid) {
      errors.push(senhaValidation.error!);
    }

    if (data.telefone) {
      const telefoneValidation = this.validateTelefone(data.telefone);
      if (!telefoneValidation.isValid) {
        errors.push(telefoneValidation.error!);
      }
    }

    if (data.endereco) {
      const enderecoValidation = this.validateEndereco(data.endereco);
      if (!enderecoValidation.isValid) {
        errors.push(enderecoValidation.error!);
      }
    }

    return {
      isValid: errors.length === 0,
      errors
    };
  }
}

export class AnimalValidator {
  static validateAnimalData(data: any): { isValid: boolean; errors: string[] } {
    const errors: string[] = [];

    if (!data.nome || typeof data.nome !== 'string' || data.nome.trim().length < 2) {
      errors.push('Nome do animal é obrigatório e deve ter pelo menos 2 caracteres');
    } else if (data.nome.trim().length > 50) {
      errors.push('Nome do animal deve ter no máximo 50 caracteres');
    }

    const cpfValidation = UsuarioValidator.validateCPF(data.tutorCpf);
    if (!cpfValidation.isValid) {
      errors.push(cpfValidation.error!);
    }

    return {
      isValid: errors.length === 0,
      errors
    };
  }
}

export class ClinicaValidator {
  static validateCNPJ(cnpj: string): { isValid: boolean; error?: string } {
    if (!cnpj || typeof cnpj !== 'string') {
      return { isValid: false, error: 'CNPJ é obrigatório' };
    }

    const cleanCNPJ = cnpj.replace(/[^\d]/g, '');

    if (cleanCNPJ.length !== 14) {
      return { isValid: false, error: 'CNPJ deve ter 14 dígitos' };
    }

    if (/^(\d)\1{13}$/.test(cleanCNPJ)) {
      return { isValid: false, error: 'CNPJ inválido (dígitos repetidos)' };
    }

    let sum = 0;
    let weight = 5;
    
    for (let i = 0; i < 12; i++) {
      sum += parseInt(cleanCNPJ.charAt(i)) * weight;
      weight = weight === 2 ? 9 : weight - 1;
    }
    
    let digit1 = sum % 11;
    digit1 = digit1 < 2 ? 0 : 11 - digit1;

    sum = 0;
    weight = 6;
    
    for (let i = 0; i < 13; i++) {
      sum += parseInt(cleanCNPJ.charAt(i)) * weight;
      weight = weight === 2 ? 9 : weight - 1;
    }
    
    let digit2 = sum % 11;
    digit2 = digit2 < 2 ? 0 : 11 - digit2;

    if (parseInt(cleanCNPJ.charAt(12)) !== digit1 || parseInt(cleanCNPJ.charAt(13)) !== digit2) {
      return { isValid: false, error: 'CNPJ inválido (dígitos verificadores incorretos)' };
    }

    return { isValid: true };
  }

  static validateClinicaData(data: any): { isValid: boolean; errors: string[] } {
    const errors: string[] = [];

    const cnpjValidation = this.validateCNPJ(data.cnpj);
    if (!cnpjValidation.isValid) {
      errors.push(cnpjValidation.error!);
    }

    if (!data.nome || typeof data.nome !== 'string' || data.nome.trim().length < 2) {
      errors.push('Nome da clínica é obrigatório e deve ter pelo menos 2 caracteres');
    } else if (data.nome.trim().length > 100) {
      errors.push('Nome da clínica deve ter no máximo 100 caracteres');
    }

    const cpfValidation = UsuarioValidator.validateCPF(data.administradorCpf);
    if (!cpfValidation.isValid) {
      errors.push(cpfValidation.error!);
    }

    return {
      isValid: errors.length === 0,
      errors
    };
  }
}

export class ConsultaValidator {
  static validateConsultaData(data: any): { isValid: boolean; errors: string[] } {
    const errors: string[] = [];

    if (!data.data || !(data.data instanceof Date) && !data.data) {
      errors.push('Data da consulta é obrigatória');
    }

    if (!data.hora || !(data.hora instanceof Date) && !data.hora) {
      errors.push('Hora da consulta é obrigatória');
    }

    if (!data.animalId || (typeof data.animalId !== 'number' && typeof data.animalId !== 'string') || Number(data.animalId) <= 0 || !Number.isInteger(Number(data.animalId))) {
      errors.push('ID do animal é obrigatório e deve ser um número inteiro positivo');
    }

    const cpfValidation = UsuarioValidator.validateCPF(data.funcionarioCpf);
    if (!cpfValidation.isValid) {
      errors.push(cpfValidation.error!);
    }

    if (!data.status || typeof data.status !== 'string') {
      errors.push('Status da consulta é obrigatório');
    } else if (!['agendada', 'realizada', 'cancelada', 'remarcada'].includes(data.status)) {
      errors.push('Status deve ser: agendada, realizada, cancelada ou remarcada');
    }

    return {
      isValid: errors.length === 0,
      errors
    };
  }
}

export class VacinaValidator {
  static validateVacinaData(data: any): { isValid: boolean; errors: string[] } {
    const errors: string[] = [];

    if (!data.nome || typeof data.nome !== 'string' || data.nome.trim().length < 2) {
      errors.push('Nome da vacina é obrigatório e deve ter pelo menos 2 caracteres');
    }

    if (!data.dataAplicacao) {
      errors.push('Data de aplicação é obrigatória');
    } else {
      const dataAplicacao = new Date(data.dataAplicacao);
      if (isNaN(dataAplicacao.getTime())) {
        errors.push('Data de aplicação inválida');
      } else if (dataAplicacao > new Date()) {
        errors.push('Data de aplicação não pode ser futura');
      }
    }

    if (!data.animalId || typeof data.animalId !== 'number' || data.animalId <= 0) {
      errors.push('ID do animal é obrigatório e deve ser um número positivo');
    }

    return {
      isValid: errors.length === 0,
      errors
    };
  }
}