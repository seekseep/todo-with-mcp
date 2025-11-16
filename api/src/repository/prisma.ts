import { PrismaClient } from '@prisma/client';

/**
 * Prismaクライアントのシングルトンインスタンス
 */
export const prisma = new PrismaClient();
