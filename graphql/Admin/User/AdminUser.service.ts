import prisma from '@libs/client'
import { AdminGetAllUsersOutput } from './dto/admin-get-all-users.dto'

export const adminGetAllUsers = async (): Promise<AdminGetAllUsersOutput> => {
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
