import {
  AdminGetAllUsersOutput,
  AdminGetAllUsersType,
} from './dto/admin-get-all-users.dto'

export const adminGetAllUsers = async ({
  ctx,
}: AdminGetAllUsersType): Promise<AdminGetAllUsersOutput> => {
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
