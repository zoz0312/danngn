import { AdminUserOutput } from '@graphql/Admin/User/AdminUser.entity'
import { Authorized, Ctx, Query, Resolver } from 'type-graphql'
import { Context } from '@libs/context'

@Resolver()
export class AdminUserResolver {
  @Authorized('ADMIN')
  @Query((_) => AdminUserOutput)
  async getAllUsers(
    @Ctx()
    ctx: Context
  ): Promise<AdminUserOutput> {
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
}
