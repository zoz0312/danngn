import { Arg, Authorized, Ctx, Mutation, Query, Resolver } from 'type-graphql'
import {
  CreateAuthUserInput,
  CreateAuthUserOutput,
} from '@graphql/Client/User/dto/create-auth-user.dto'
import { Context } from '@libs/context'
import { createAuthUser } from './ClientUser.service'
import { FindMyInfoOutput } from './dto/find-my-info.dto'

@Resolver()
export class ClientUserResolver {
  @Mutation((_) => CreateAuthUserOutput)
  async createAuthUser(
    @Ctx()
    ctx: Context,
    @Arg('createAuthUserInput', () => CreateAuthUserInput)
    createAuthUserInput: CreateAuthUserInput
  ): Promise<CreateAuthUserOutput> {
    return createAuthUser(createAuthUserInput)
  }

  @Authorized('Any')
  @Query((_) => FindMyInfoOutput)
  async findMyInfo(
    @Ctx()
    ctx: Context
  ): Promise<FindMyInfoOutput> {
    if (ctx.user) {
      return {
        success: true,
        user: ctx.user,
      }
    }
    return {
      success: false,
    }
  }
}
