import { coreOutput } from '../type/coreOutput'
import { ArgsType, Field, InputType, ObjectType } from 'type-graphql'
import { IsEmail, MaxLength } from 'class-validator'
import { User, UserCreateInput } from '@generated/index'

@InputType()
export class ClientUserResolverInput extends UserCreateInput {
  @Field((_) => String)
  @IsEmail()
  email: string

  @Field((_) => String)
  password: string

  @Field((_) => String)
  password2: string
}

@ObjectType()
export class ClientUserResolverOutput extends coreOutput {}
