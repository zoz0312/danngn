import { coreOutput } from '@graphql/type/coreOutput'
import { coreInput } from '@graphql/type/coreInput'
import { User } from '@generated/models'
import { Field, ObjectType } from 'type-graphql'

@ObjectType()
export class FindMyInfoOutput extends coreOutput {
  @Field((_) => User, { nullable: true })
  user?: User
}
