import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { Express } from 'express';

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Auvet API',
      version: '1.0.0',
      description: 'API para sistema de gestão veterinária Auvet',
      contact: {
        name: 'Equipe Auvet',
        email: 'contato@auvet.com'
      }
    },
    servers: [
      {
        url: 'http://localhost:3000',
        description: 'Servidor de desenvolvimento'
      }
    ],
    components: {
      schemas: {
        Usuario: {
          type: 'object',
          required: ['cpf', 'nome', 'email', 'senha'],
          properties: {
            cpf: {
              type: 'string',
              description: 'CPF do usuário (11 dígitos)',
              example: '12345678901'
            },
            nome: {
              type: 'string',
              description: 'Nome completo do usuário',
              example: 'João Silva'
            },
            email: {
              type: 'string',
              format: 'email',
              description: 'Email do usuário',
              example: 'joao@email.com'
            },
            senha: {
              type: 'string',
              description: 'Senha do usuário (mínimo 6 caracteres)',
              example: 'senha123'
            },
            dataCadastro: {
              type: 'string',
              format: 'date-time',
              description: 'Data de cadastro do usuário'
            }
          }
        },
        Funcionario: {
          type: 'object',
          required: ['cpf', 'nome', 'email', 'senha', 'cargo', 'status'],
          properties: {
            cpf: {
              type: 'string',
              description: 'CPF do funcionário',
              example: '12345678901'
            },
            nome: {
              type: 'string',
              description: 'Nome completo do funcionário',
              example: 'Dr. João Silva'
            },
            email: {
              type: 'string',
              format: 'email',
              description: 'Email do funcionário',
              example: 'joao@clinica.com'
            },
            senha: {
              type: 'string',
              description: 'Senha do funcionário',
              example: 'senha123'
            },
            cargo: {
              type: 'string',
              description: 'Cargo do funcionário',
              example: 'Veterinário'
            },
            registroProfissional: {
              type: 'string',
              description: 'Registro profissional (CRMV)',
              example: 'CRMV-12345'
            },
            status: {
              type: 'string',
              enum: ['ativo', 'inativo'],
              description: 'Status do funcionário',
              example: 'ativo'
            },
            nivelAcesso: {
              type: 'integer',
              description: 'Nível de acesso (1-3)',
              example: 2
            }
          }
        },
        Tutor: {
          type: 'object',
          required: ['cpf', 'nome', 'email', 'senha'],
          properties: {
            cpf: {
              type: 'string',
              description: 'CPF do tutor',
              example: '12345678901'
            },
            nome: {
              type: 'string',
              description: 'Nome completo do tutor',
              example: 'Maria Santos'
            },
            email: {
              type: 'string',
              format: 'email',
              description: 'Email do tutor',
              example: 'maria@email.com'
            },
            senha: {
              type: 'string',
              description: 'Senha do tutor',
              example: 'senha123'
            },
            telefone: {
              type: 'string',
              description: 'Telefone do tutor (opcional)',
              example: '11999999999'
            },
            endereco: {
              type: 'string',
              description: 'Endereço do tutor (opcional)',
              example: 'Rua das Flores, 123'
            }
          }
        },
        Animal: {
          type: 'object',
          required: ['nome', 'especie', 'raca', 'sexo', 'idade', 'tutorCpf'],
          properties: {
            id: {
              type: 'integer',
              description: 'ID único do animal'
            },
            nome: {
              type: 'string',
              description: 'Nome do animal',
              example: 'Rex'
            },
            especie: {
              type: 'string',
              description: 'Espécie do animal',
              example: 'Cão'
            },
            raca: {
              type: 'string',
              description: 'Raça do animal',
              example: 'Golden Retriever'
            },
            sexo: {
              type: 'string',
              enum: ['M', 'F'],
              description: 'Sexo do animal (M/F)',
              example: 'M'
            },
            idade: {
              type: 'integer',
              description: 'Idade do animal em anos',
              example: 3
            },
            peso: {
              type: 'number',
              description: 'Peso do animal em kg',
              example: 25.5
            },
            tutorCpf: {
              type: 'string',
              description: 'CPF do tutor responsável',
              example: '12345678901'
            }
          }
        },
        Clinica: {
          type: 'object',
          required: ['cnpj', 'nome', 'administradorCpf'],
          properties: {
            cnpj: {
              type: 'string',
              description: 'CNPJ da clínica (14 dígitos)',
              example: '11222333000181'
            },
            nome: {
              type: 'string',
              description: 'Nome da clínica',
              example: 'Clínica PetCare'
            },
            administradorCpf: {
              type: 'string',
              description: 'CPF do administrador',
              example: '12345678901'
            },
            endereco: {
              type: 'string',
              description: 'Endereço da clínica',
              example: 'Rua das Flores, 123'
            },
            telefone: {
              type: 'string',
              description: 'Telefone da clínica',
              example: '11999999999'
            },
            email: {
              type: 'string',
              format: 'email',
              description: 'Email da clínica',
              example: 'contato@petcare.com'
            },
            dataCadastro: {
              type: 'string',
              format: 'date-time',
              description: 'Data de cadastro da clínica'
            }
          }
        },
        Consulta: {
          type: 'object',
          required: ['data', 'hora', 'motivo', 'status', 'animalId', 'funcionarioCpf'],
          properties: {
            id: {
              type: 'integer',
              description: 'ID único da consulta'
            },
            data: {
              type: 'string',
              format: 'date',
              description: 'Data da consulta',
              example: '2024-12-25'
            },
            hora: {
              type: 'string',
              format: 'time',
              description: 'Hora da consulta',
              example: '14:30:00'
            },
            motivo: {
              type: 'string',
              description: 'Motivo da consulta',
              example: 'Consulta de rotina'
            },
            status: {
              type: 'string',
              enum: ['agendada', 'realizada', 'cancelada', 'remarcada'],
              description: 'Status da consulta',
              example: 'agendada'
            },
            observacoes: {
              type: 'string',
              description: 'Observações da consulta',
              example: 'Animal em bom estado geral'
            },
            animalId: {
              type: 'integer',
              description: 'ID do animal',
              example: 1
            },
            funcionarioCpf: {
              type: 'string',
              description: 'CPF do funcionário responsável',
              example: '12345678901'
            }
          }
        },
        Vacina: {
          type: 'object',
          required: ['nome', 'dataAplicacao', 'animalId'],
          properties: {
            id: {
              type: 'integer',
              description: 'ID único da vacina'
            },
            nome: {
              type: 'string',
              description: 'Nome da vacina',
              example: 'V10'
            },
            fabricante: {
              type: 'string',
              description: 'Fabricante da vacina',
              example: 'Zoetis'
            },
            dataAplicacao: {
              type: 'string',
              format: 'date',
              description: 'Data de aplicação da vacina',
              example: '2024-01-15'
            },
            dataValidade: {
              type: 'string',
              format: 'date',
              description: 'Data de validade da vacina',
              example: '2024-12-31'
            },
            animalId: {
              type: 'integer',
              description: 'ID do animal',
              example: 1
            }
          }
        },
        ApiResponse: {
          type: 'object',
          properties: {
            success: {
              type: 'boolean',
              description: 'Indica se a operação foi bem-sucedida'
            },
            data: {
              type: 'object',
              description: 'Dados retornados pela operação'
            },
            message: {
              type: 'string',
              description: 'Mensagem de sucesso'
            },
            error: {
              type: 'string',
              description: 'Mensagem de erro'
            },
            count: {
              type: 'integer',
              description: 'Quantidade de itens retornados'
            }
          }
        }
      }
    }
  },
  apis: ['./src/routes/*.ts', './src/modules/*/controller.ts', './src/docs/*.ts']
};

const specs = swaggerJsdoc(options);

export const setupSwagger = (app: Express): void => {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs, {
    explorer: true,
    customCss: '.swagger-ui .topbar { display: none }',
    customSiteTitle: 'Auvet API Documentation'
  }));
};

export default specs;
