import { User } from '@generated/models'
import { ClientGetPostsInput, ClientGetPostsOutput } from './dto/get-posts.dto'
import prisma from '@libs/client'
import { findUserById } from '../User/ClientUser.service'
import { findTradeCategoryById } from '@graphql/TradeCategory/TradeCategory.service'
import { ClientCreatePostInput } from './dto/create-post.dto'
import { ClientGetPostInput, ClientGetPostOutput } from './dto/get-post.dto'

export const clientGetPost = async (
  clientGetPostInput: ClientGetPostInput
): Promise<ClientGetPostOutput> => {
  const { categoryId } = clientGetPostInput

  const tradePost = await prisma.tradePost.findUnique({
    where: {
      id: categoryId,
    },
  })

  return {
    success: true,
    tradePost,
  }
}

export const clientGetPosts = async (
  clientGetPostsInput: ClientGetPostsInput
): Promise<ClientGetPostsOutput> => {
  const { categoryId } = clientGetPostsInput

  // TODO: pagenation

  return {
    success: true,
  }
}

export const clientCreatePost = async (
  clientCreatePostInput: ClientCreatePostInput,
  user: User
) => {
  const { tradePost, categoryId } = clientCreatePostInput
  const { title, content, price } = tradePost

  if (!title) {
    return {
      success: false,
      error: `제목이 없습니다.`,
    }
  }

  if (!content) {
    return {
      success: false,
      error: `내용이 없습니다.`,
    }
  }

  if (price === undefined || isNaN(price)) {
    return {
      success: false,
      error: `허용되지 않는 숫자입니다.`,
    }
  }

  if (!user) {
    return {
      success: false,
      error: `존재하지 않는 사용자입니다.`,
    }
  }

  const category = await findTradeCategoryById(categoryId)

  if (!category) {
    return {
      success: false,
      error: `존재하지 않는 카테고리입니다.`,
    }
  }

  clientCreatePostInput.tradePost.salesType = 'SALE'

  prisma.tradePost.create({
    data: {
      ...tradePost,
      user: {
        connect: {
          id: user.id,
        },
      },
      category: {
        connect: {
          id: categoryId,
        },
      },
    },
  })

  return {
    success: true,
  }
}
