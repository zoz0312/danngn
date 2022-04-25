import { Arg, Authorized, Ctx, Query, Resolver } from 'type-graphql'
import { clientGetPosts } from './ClientPost.service'
import { ClientGetPostsInput, ClientGetPostsOutput } from './dto/get-posts.dto'
import { Context } from '@libs/context'

@Resolver()
export class ClientPostResolver {
  @Authorized('Any')
  @Query((_) => ClientGetPostsOutput)
  async getPosts(
    @Ctx()
    ctx: Context,
    @Arg('clientGetPostsInput', () => ClientGetPostsInput)
    clientGetPostsInput: ClientGetPostsInput
  ): Promise<ClientGetPostsOutput> {
    const { user } = ctx
    return clientGetPosts(clientGetPostsInput, user)
  }
}
