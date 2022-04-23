import { Authorized, Query, Resolver } from 'type-graphql'
import { ClientGetPostsOutput } from './dto/get-posts.dto'

@Resolver()
export class ClientPostResolver {
  @Authorized('Any')
  @Query((_) => ClientGetPostsOutput)
  async getPosts(): Promise<ClientGetPostsOutput> {
    return {
      success: true,
    }
  }
}
