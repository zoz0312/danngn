import { Field, ObjectType } from 'type-graphql'
import { coreOutput } from '@graphql/type/coreOutput'
import { User } from '@generated/models'
import { coreInput } from '@graphql/type/coreInput'

export class AdminGetAllUsersType extends coreInput {}

@ObjectType()
export class AdminGetAllUsersOutput extends coreOutput {
  @Field((_) => [User], { nullable: true })
  users?: User[]
}
