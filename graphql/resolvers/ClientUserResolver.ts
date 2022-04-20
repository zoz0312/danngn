import { Arg, Ctx, Mutation, Resolver } from 'type-graphql'
import {
  ClientUserResolverInput,
  ClientUserResolverOutput,
} from '@graphql/entities/ClientUserResolver'
import { Context } from '@libs/context'
import { hashPassword } from '@libs/hash'

@Resolver()
export class ClientUserResolver {
  @Mutation((_) => ClientUserResolverOutput)
  async createAuthUser(
    @Ctx()
    ctx: Context,
    @Arg('clientUserResolverInput', () => ClientUserResolverInput)
    clientUserResolverInput: ClientUserResolverInput
  ): Promise<ClientUserResolverOutput> {
    try {
      const { prisma } = ctx
      const { email, password, password2 } = clientUserResolverInput

      if (password !== password2) {
        return {
          success: false,
          error: '비밀번호가 일치하지 않습니다.',
        }
      }

      // TODO: 정규식 체크

      const currentUser = await prisma.user.findUnique({
        where: {
          email,
        },
      })

      if (currentUser) {
        return {
          success: false,
          error: '이미 존재하는 이메일 입니다.',
        }
      }

      delete clientUserResolverInput.password2
      clientUserResolverInput.password = await hashPassword(password)
      await prisma.user.create({
        data: clientUserResolverInput,
      })

      return {
        success: true,
      }
    } catch (error) {
      return {
        success: false,
        error,
      }
    }
  }
}
