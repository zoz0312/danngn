import { ObjectType, Field } from 'type-graphql'
import { CoreOutput } from './CoreOutput'

export const FIXED_TAKE_COUNT = 5

@ObjectType()
export class PagenationOutput extends CoreOutput {
  @Field((type) => Boolean)
  hasNextPage: boolean
}
