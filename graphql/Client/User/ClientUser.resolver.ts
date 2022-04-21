import { Arg, Ctx, Mutation, Resolver } from 'type-graphql'
import {
  ClientUserInput,
  ClientUserOutput,
} from '@graphql/Client/User/ClientUser.entity'
import { Context } from '@libs/context'
import { ClientUserService } from './ClientUser.service'

@Resolver()
export class ClientUserResolver {
  @Mutation((_) => ClientUserOutput)
  async createAuthUser(
    @Ctx()
    ctx: Context,
    @Arg('clientUserInput', () => ClientUserInput)
    clientUserInput: ClientUserInput
  ): Promise<ClientUserOutput> {
    return ClientUserService({ ctx, clientUserInput })
  }
}
