import { Field, InputType, ObjectType } from 'type-graphql'
import { IsEmail } from 'class-validator'
import { User } from '@generated/models'
import { CoreOutput } from '@graphql/common/CoreOutput'
import { CoreInput } from '@graphql/common/CoreInput'

export class LoginType extends CoreInput {
  loginInput: LoginInput
}

@InputType()
export class LoginInput implements Pick<User, 'email' | 'password'> {
  @Field((_) => String)
  @IsEmail()
  email: string
  @Field((_) => String)
  password: string
}

@ObjectType()
export class LoginOutput extends CoreOutput {
  @Field((_) => String, { nullable: true })
  token?: string
}
