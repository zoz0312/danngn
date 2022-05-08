import { TradePost } from '@generated/models'
import { Field, InputType, ObjectType } from 'type-graphql'
import { CoreOutput } from '@graphql/common/CoreOutput'
import { TradePostCreateInput } from '@generated/index'

@InputType()
export class ClientGetPostInput {
  @Field((_) => Number)
  categoryId: number
}

@ObjectType()
export class ClientGetPostOutput extends CoreOutput {
  @Field((_) => TradePost, { nullable: true })
  tradePost?: TradePost
}
