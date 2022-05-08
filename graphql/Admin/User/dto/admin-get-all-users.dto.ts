import { Field, ObjectType } from 'type-graphql'
import { CoreOutput } from '@graphql/common/CoreOutput'
import { User } from '@generated/models'
import { CoreInput } from '@graphql/common/CoreInput'

@ObjectType()
export class AdminGetAllUsersOutput extends CoreOutput {
  @Field((_) => [User], { nullable: true })
  users?: User[]
}
