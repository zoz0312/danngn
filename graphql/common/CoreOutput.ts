import { Field, ObjectType } from 'type-graphql'
@ObjectType()
export class CoreOutput {
  @Field((_) => Boolean)
  success: boolean

  @Field((_) => String, { nullable: true })
  error?: string
}
