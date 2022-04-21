import { LoginInput, LoginOutput } from '@graphql/Login/dto/login.dto'
import { Arg, Ctx, Query, Resolver } from 'type-graphql'
import { Context } from '@libs/context'
import { login } from './Login.service'

@Resolver()
export class LoginResolver {
  @Query((_) => LoginOutput)
  async login(
    @Ctx()
    ctx: Context,
    @Arg('loginInput', () => LoginInput)
    loginInput: LoginInput
  ): Promise<LoginOutput> {
    return login({ ctx, loginInput })
  }
}
