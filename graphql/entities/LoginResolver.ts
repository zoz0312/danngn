import { Field, InputType, ObjectType } from 'type-graphql'
import { IsEmail } from 'class-validator'
import { User } from '@generated/models'
import { coreOutput } from '../type/coreOutput'

@InputType()
export class LoginResolverInput implements Pick<User, 'email' | 'password'> {
  @Field((_) => String)
  @IsEmail()
  email: string
  @Field((_) => String)
  password: string
}

@ObjectType()
export class LoginResolverOutput extends coreOutput {
  @Field((_) => String, { nullable: true })
  token?: string
}
