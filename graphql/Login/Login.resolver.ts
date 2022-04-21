import { LoginInput, LoginOutput } from '@graphql/Login/Login.entity'
import { Arg, Ctx, Query, Resolver } from 'type-graphql'
import { Context } from '@libs/context'
import { LoginService } from './Login.service'

@Resolver()
export class LoginResolver {
  @Query((_) => LoginOutput)
  async login(
    @Ctx()
    ctx: Context,
    @Arg('loginInput', () => LoginInput)
    loginInput: LoginInput
  ): Promise<LoginOutput> {
    return LoginService({ ctx, loginInput })
  }
}
