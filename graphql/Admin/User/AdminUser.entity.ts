import { Field, ObjectType } from 'type-graphql'
import { coreOutput } from '@graphql/type/coreOutput'
import { User } from '@generated/models'

@ObjectType()
export class AdminUserOutput extends coreOutput {
  @Field((_) => [User], { nullable: true })
  users?: User[]
}
