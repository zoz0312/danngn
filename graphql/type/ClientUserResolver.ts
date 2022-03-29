import { coreOutput } from './coreOutput'
import { ArgsType, Field, InputType } from 'type-graphql'
import { MaxLength } from 'class-validator'
import { User } from '@generated/index.js'

export class ClientUserResolverInput {
  user: User
}

export interface ClientUserResolverOutput extends coreOutput {}
