import { hashPassword } from '@libs/hash'
import {
  CreateAuthUserOutput,
  CreateAuthUserType,
} from './dto/create-auth-user.dto'
import { FindMyInfoOutput, FindMyInfoType } from './dto/find-my-info.dto'

export const createAuthUser = async ({
  ctx,
  createAuthUserInput,
}: CreateAuthUserType): Promise<CreateAuthUserOutput> => {
  try {
    const { prisma } = ctx
    const { email, password, password2 } = createAuthUserInput

    if (password !== password2) {
      return {
        success: false,
        error: '비밀번호가 일치하지 않습니다.',
      }
    }

    // TODO: 정규식 체크

    const currentUser = await prisma.user.findUnique({
      where: {
        email,
      },
    })

    if (currentUser) {
      return {
        success: false,
        error: '이미 존재하는 이메일 입니다.',
      }
    }

    delete createAuthUserInput.password2
    createAuthUserInput.password = await hashPassword(password)
    await prisma.user.create({
      data: createAuthUserInput,
    })

    return {
      success: true,
    }
  } catch (error) {
    return {
      success: false,
      error,
    }
  }
}

export const findMyInfo = async ({
  ctx,
}: FindMyInfoType): Promise<FindMyInfoOutput> => {
  const { user } = ctx

  if (!user) {
    return {
      success: false,
    }
  }

  return {
    success: true,
    user,
  }
}
