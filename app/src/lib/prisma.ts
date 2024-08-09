import { PrismaClient } from "@prisma/client";

const prismaGlobal = global as unknown as { prismaClient: PrismaClient };
export const prismaClient = prismaGlobal.prismaClient || new PrismaClient({ log: ['query'] });
if( process.env.NODE_ENV !== 'production' ) prismaGlobal.prismaClient = prismaClient;