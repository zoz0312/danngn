import { TradePost } from '@generated/models'
import { InputType, ObjectType } from 'type-graphql'
import { coreOutput } from '@graphql/type/coreOutput'

@InputType()
export class ClientGetPostsInput extends TradePost {}

@ObjectType()
export class ClientGetPostsOutput extends coreOutput {}
