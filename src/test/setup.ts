import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient({
  datasources: {
    db: {
      url: process.env['DATABASE_URL'] || 'mysql://auvet_user:auvet123@localhost:3307/auvet_db_test',
    },
  },
});

beforeAll(async () => {
  await prisma.$connect();
});

afterAll(async () => {
  await prisma.$disconnect();
});

beforeEach(async () => {
  await prisma.funcionario.deleteMany();
  await prisma.usuario.deleteMany();
});

export { prisma };
