import { CoreOutput } from '@graphql/common/CoreOutput'
import { CoreInput } from '@graphql/common/CoreInput'
import { Field, InputType, ObjectType } from 'type-graphql'
import { IsEmail } from 'class-validator'
import { UserCreateInput } from '@generated/index'

@InputType()
export class CreateAuthUserInput extends UserCreateInput {
  @Field((_) => String)
  @IsEmail()
  email: string

  @Field((_) => String)
  password: string

  @Field((_) => String)
  password2: string
}

@ObjectType()
export class CreateAuthUserOutput extends CoreOutput {}
