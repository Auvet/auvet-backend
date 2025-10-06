# Auvet | Sistema de Gerenciamento de Clínicas Veterinárias

Backend desenvolvido com Node.js, TypeScript, Express e Prisma ORM.

## Tecnologias

- Node.js + TypeScript + Express
- Prisma ORM + MySQL
- Docker + Docker Compose
- Jest (testes)
- ESLint (linting)
- GitHub Actions (CI/CD)

## Instalação

```bash
git clone https://github.com/Auvet/auvet-backend
cd auvet-backend
docker-compose up --build
```

## Testes

```bash
npm test
npm run test:coverage
```

## Lint

```bash
npm run lint   
npm run lint:fix  
npm run lint:check   
```

## Histórico de Versões

### v1.1.0 (06/10/2025)
- ✅ Autenticação JWT com API externa
- ✅ Middleware de autenticação global
- ✅ ESLint com formatação automática
- ✅ CI/CD Pipeline com GitHub Actions
- ✅ Logging de erros nos repositories
- ✅ Configuração Docker com lint e testes

### v1.0.0 (24/09/2025)
- Implementação inicial do sistema
- CRUD completo de funcionários
- Arquitetura modular com 3 camadas
- Configuração Docker + MySQL
- Testes unitários básicos
- Health check endpoint
