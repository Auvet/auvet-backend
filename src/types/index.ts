export interface Clinica {
  cnpj: string;
  nome: string;
  endereco: string | null;
  telefone: string | null;
  email: string | null;
  dataCadastro: Date;
  administradorCpf: string | null;
}

export interface Usuario {
  cpf: string;
  nome: string;
  email: string;
  senha: string;
  dataCadastro: Date;
}

export interface Funcionario {
  cpf: string;
  cargo: string;
  registroProfissional: string | null;
  status: string;
  nivelAcesso: number;
}

export interface Tutor {
  cpf: string;
  telefone: string | null;
  endereco: string | null;
}

export interface Animal {
  id: number;
  nome: string;
  especie: string | null;
  raca: string | null;
  sexo: string | null;
  idade: number | null;
  peso: number | null;
  tutorCpf: string;
}

export interface Consulta {
  id: number;
  data: Date;
  hora: Date;
  motivo: string | null;
  status: string;
  observacoes: string | null;
  animalId: number;
  funcionarioCpf: string;
}

export interface Vacina {
  id: number;
  nome: string;
  fabricante: string | null;
  dataAplicacao: Date;
  dataValidade: Date | null;
  animalId: number;
}

export interface FuncionarioClinica {
  funcionarioCpf: string;
  clinicaCnpj: string;
}

export interface TutorClinica {
  tutorCpf: string;
  clinicaCnpj: string;
}

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
  count?: number;
}

import { Request } from 'express';

export interface AuthenticatedUser {
  cpf: string;
  nome: string;
  email: string;
  dataCadastro: Date;
}

export interface AuthenticatedRequest extends Request {
  user?: AuthenticatedUser;
}
