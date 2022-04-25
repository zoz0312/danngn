import { TradePost } from '@generated/models'
import { Field, InputType, ObjectType } from 'type-graphql'
import { coreOutput } from '@graphql/type/coreOutput'
import { TradePostCreateInput } from '@generated/index'

@InputType()
export class ClientGetPostsInput {
  @Field((_) => Number)
  categoryId: number
}

@ObjectType()
export class ClientGetPostsOutput extends coreOutput {
  @Field((_) => [TradePost], { nullable: true })
  tradePost?: TradePost[]
}
