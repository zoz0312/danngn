import { TradePost } from '@generated/models'
import { Field, InputType, ObjectType } from 'type-graphql'
import { CoreOutput } from '@graphql/common/CoreOutput'
import { TradePostCreateInput } from '@generated/index'

@InputType()
export class ClientCreatePostInput {
  @Field((_) => TradePost)
  tradePost: TradePostCreateInput

  @Field((_) => Number)
  categoryId: number
}

@ObjectType()
export class ClientCreatePostOutput extends CoreOutput {}
