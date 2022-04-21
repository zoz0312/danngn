import { AdminUserOutput } from '@graphql/Admin/User/AdminUser.entity'
import { Authorized, Ctx, Query, Resolver } from 'type-graphql'
import { Context } from '@libs/context'
import { AdminUserService } from './AdminUser.service'

@Resolver()
export class AdminUserResolver {
  @Authorized('ADMIN')
  @Query((_) => AdminUserOutput)
  async getAllUsers(
    @Ctx()
    ctx: Context
  ): Promise<AdminUserOutput> {
    return AdminUserService({ ctx })
  }
}
