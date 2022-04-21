import { hashPassword } from '@libs/hash'
import {
  CreateAuthUserInput,
  CreateAuthUserOutput,
} from './dto/create-auth-user.dto'
import prisma from '@libs/client'

export const createAuthUser = async (
  createAuthUserInput: CreateAuthUserInput
): Promise<CreateAuthUserOutput> => {
  try {
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
