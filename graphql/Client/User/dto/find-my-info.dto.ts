import { CoreOutput } from '@graphql/common/CoreOutput'
import { CoreInput } from '@graphql/common/CoreInput'
import { User } from '@generated/models'
import { Field, ObjectType } from 'type-graphql'

@ObjectType()
export class FindMyInfoOutput extends CoreOutput {
  @Field((_) => User, { nullable: true })
  user?: User
}
