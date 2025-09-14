export interface Clinica {
  cnpj: string;
  nome: string;
  endereco?: string;
  telefone?: string;
  email?: string;
  dataCadastro: Date;
  administradorCpf: string;
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
  telefone?: string;
  endereco?: string;
}

export interface Animal {
  id: number;
  nome: string;
  especie?: string;
  raca?: string;
  sexo?: string;
  idade?: number;
  peso?: number;
  tutorCpf: string;
}

export interface Consulta {
  id: number;
  data: Date;
  hora: Date;
  motivo?: string;
  status: string;
  observacoes?: string;
  animalId: number;
  funcionarioCpf: string;
}

export interface Vacina {
  id: number;
  nome: string;
  fabricante?: string;
  dataAplicacao: Date;
  dataValidade?: Date;
  animalId: number;
}

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
  count?: number;
}
