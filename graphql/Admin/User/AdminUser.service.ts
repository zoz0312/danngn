import { coreInput } from '@graphql/type/coreInput'
import { AdminUserOutput } from './AdminUser.entity'

class AdminUserServiceType extends coreInput {}

export const AdminUserService = async ({
  ctx,
}: AdminUserServiceType): Promise<AdminUserOutput> => {
  const { prisma } = ctx

  let users = await prisma.user.findMany()
  users = users.map((user) => {
    delete user.password
    return user
  })

  return {
    success: true,
    users,
  }
}
