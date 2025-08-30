export interface Clinica {
  cnpj: string;
  nome: string;
  endereco?: string;
  telefone?: string;
  criadoEm: Date;
}

export interface Usuario {
  cpf: string;
  nome: string;
  email: string;
  senha: string;
  telefone?: string;
  role: 'ADMIN' | 'FUNCIONARIO' | 'TUTOR';
  cnpjClinica: string;
}

export interface Animal {
  idAnimal: number;
  nome: string;
  especie?: string;
  raca?: string;
  idade?: number;
  peso?: number;
  idTutor: string;
}

export interface Agendamento {
  idAgendamento: number;
  dataHora: Date;
  tipo?: string;
  observacoes?: string;
  idAnimal: number;
  cpfFuncionario: string;
}

export interface Vacina {
  idVacina: number;
  nome: string;
  dataAplicacao: Date;
  validade?: Date;
  idAnimal: number;
}

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
  count?: number;
}
