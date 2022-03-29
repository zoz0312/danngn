import {
  Arg,
  Args,
  Ctx,
  Field,
  ID,
  Info,
  InputType,
  InterfaceType,
  Mutation,
  ObjectType,
  Query,
  Resolver,
} from 'type-graphql'
import * as bcrypt from 'bcrypt'
import { CreateUserArgs, FindUniqueUserArgs, User } from '@generated/index'
import { UserCreateInput } from '@generated/resolvers/inputs/UserCreateInput'
import prisma from '@libs/client'
import { GraphQLResolveInfo } from 'graphql'

@Resolver((_of) => User)
export class ClientUserResolver {
  @Query((_) => User, { nullable: true })
  async findCustomUser(
    @Info()
    graphQLResolveInfo: GraphQLResolveInfo,
    @Args(() => FindUniqueUserArgs)
    findUniqueUserArgs: FindUniqueUserArgs
  ): Promise<User | null> {
    console.log('findUniqueUserArgs', findUniqueUserArgs)
    try {
      const currentUser = await prisma.user.findUnique({
        ...findUniqueUserArgs,
      })
      return currentUser
    } catch (error) {
      console.log('error', error)
      return null
    }
  }
  // @Mutation((_) => User)
  // async createAuthUser(
  //   @Arg('userCreateInput')
  //   userCreateInput: UserCreateInput
  // ): Promise<User> {
  //   console.log('userCreateInput', userCreateInput)
  //   try {
  //     // const { password, email } = userCreateInput
  //     // const hashedPassword = await bcrypt.hash(password, 10)
  //     // const currentUser = await prisma.user.findUnique({
  //     //   where: {
  //     //     email,
  //     //   },
  //     // })

  //     // console.log('currentUser', currentUser)
  //     // if (currentUser) {
  //     //   return {
  //     //     success: false,
  //     //     error: `이미 존재하는 이메일 입니다.`,
  //     //   }
  //     // }

  //     // const createUser = await prisma.user.create({
  //     //   ...createUserArgs,
  //     // })

  //     // console.log('createUser', createUser)

  //     return null
  //   } catch (error) {
  //     return null
  //   }
  // }
}
