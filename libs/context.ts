import { PrismaClient } from '@prisma/client'
import { User } from '@generated/models'
export interface Context {
  prisma: PrismaClient
  user?: User | null
  token?: string
}
