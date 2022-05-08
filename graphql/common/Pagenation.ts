import * as Relay from 'graphql-relay'
import { ObjectType, Field, InputType, ArgsType, ClassType } from 'type-graphql'
import { CoreOutput } from './CoreOutput'

export const FIXED_TAKE_COUNT = 5
export type ConnectionCursor = Relay.ConnectionCursor

@ObjectType()
export class PageInfo implements Relay.PageInfo {
  @Field()
  hasNextPage!: boolean
  @Field()
  hasPreviousPage!: boolean
  @Field()
  startCursor: ConnectionCursor
  @Field()
  endCursor: ConnectionCursor
}

@ArgsType()
export class ConnectionArgs implements Relay.ConnectionArguments {
  @Field({ nullable: true, description: 'Paginate before opaque cursor' })
  before?: ConnectionCursor
  @Field({ nullable: true, description: 'Paginate after opaque cursor' })
  after?: ConnectionCursor
  @Field({ nullable: true, description: 'Paginate first' })
  first?: number
  @Field({ nullable: true, description: 'Paginate last' })
  last?: number
}

export function connectionTypes<T extends ClassType>(
  name: string,
  nodeType: T
) {
  @ObjectType(`${name}Edge`)
  class Edge implements Relay.Edge<T> {
    @Field(() => nodeType)
    node!: T

    @Field({ description: 'Used in `before` and `after` args' })
    cursor!: ConnectionCursor
  }

  @ObjectType(`${name}Connection`)
  class Connection implements Relay.Connection<T> {
    @Field()
    pageInfo!: PageInfo

    @Field(() => [Edge])
    edges!: Edge[]
  }
  return {
    Connection,
    Edge,
  }
}

@ObjectType()
export class PagenationOutput extends CoreOutput {
  @Field((type) => PageInfo, { nullable: true })
  pageInfo?: PageInfo
}

export {
  connectionFromPromisedArray,
  connectionFromPromisedArraySlice,
} from 'graphql-relay'
