import { coreOutput } from '../../type/coreOutput'
import { Field, InputType, ObjectType } from 'type-graphql'
import { IsEmail } from 'class-validator'
import { UserCreateInput } from '@generated/index'

@InputType()
export class ClientUserInput extends UserCreateInput {
  @Field((_) => String)
  @IsEmail()
  email: string

  @Field((_) => String)
  password: string

  @Field((_) => String)
  password2: string
}

@ObjectType()
export class ClientUserOutput extends coreOutput {}
