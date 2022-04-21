import { Authorized, Ctx, Query, Resolver } from 'type-graphql'
import { Context } from '@libs/context'
import { adminGetAllUsers } from './AdminUser.service'
import { AdminGetAllUsersOutput } from './dto/admin-get-all-users.dto'

@Resolver()
export class AdminUserResolver {
  @Authorized('ADMIN')
  @Query((_) => AdminGetAllUsersOutput)
  async getAllUsers(
    @Ctx()
    ctx: Context
  ): Promise<AdminGetAllUsersOutput> {
    return adminGetAllUsers({ ctx })
  }
}
