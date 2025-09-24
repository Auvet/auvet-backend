# Auvet | Sistema de Gerenciamento de Clínicas Veterinárias

Backend desenvolvido com Node.js, TypeScript, Express e Prisma ORM.

## Tecnologias

- Node.js + TypeScript + Express
- Prisma ORM + MySQL
- Docker + Docker Compose
- Jest (testes)

## Instalação

```bash
git clone <url-do-repositorio>
cd auvet-backend
docker-compose up --build
```

## Testes

```bash
npm test
npm run test:coverage
```

## Histórico de Versões

### v1.0.0 (24/09/2025)
- Implementação inicial do sistema
- CRUD completo de funcionários
- Arquitetura modular com 3 camadas
- Configuração Docker + MySQL
- Testes unitários básicos
- Health check endpoint
