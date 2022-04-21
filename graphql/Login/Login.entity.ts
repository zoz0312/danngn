import { Field, InputType, ObjectType } from 'type-graphql'
import { IsEmail } from 'class-validator'
import { User } from '@generated/models'
import { coreOutput } from '../type/coreOutput'

@InputType()
export class LoginInput implements Pick<User, 'email' | 'password'> {
  @Field((_) => String)
  @IsEmail()
  email: string
  @Field((_) => String)
  password: string
}

@ObjectType()
export class LoginOutput extends coreOutput {
  @Field((_) => String, { nullable: true })
  token?: string
}
