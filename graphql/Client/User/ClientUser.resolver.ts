import { Arg, Ctx, Mutation, Resolver } from 'type-graphql'
import {
  CreateAuthUserInput,
  CreateAuthUserOutput,
} from '@graphql/Client/User/dto/create-auth-user.dto'
import { Context } from '@libs/context'
import { createAuthUser } from './ClientUser.service'

@Resolver()
export class ClientUserResolver {
  @Mutation((_) => CreateAuthUserOutput)
  async createAuthUser(
    @Ctx()
    ctx: Context,
    @Arg('createAuthUserInput', () => CreateAuthUserInput)
    createAuthUserInput: CreateAuthUserInput
  ): Promise<CreateAuthUserOutput> {
    return createAuthUser({ ctx, createAuthUserInput })
  }
}
