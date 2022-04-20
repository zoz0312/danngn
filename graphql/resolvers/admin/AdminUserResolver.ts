import { AdminUserResolverOutput } from '@graphql/entities/admin/AdminUserResolver'
import { Authorized, Ctx, Query, Resolver } from 'type-graphql'
import { Context } from '@libs/context'

@Resolver()
export class AdminUserResolver {
  @Authorized('ADMIN')
  @Query((_) => AdminUserResolverOutput)
  async getAllUsers(
    @Ctx()
    ctx: Context
  ): Promise<AdminUserResolverOutput> {
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
