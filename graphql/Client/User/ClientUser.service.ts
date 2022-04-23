import { hashPassword } from '@libs/hash'
import {
  CreateAuthUserInput,
  CreateAuthUserOutput,
} from './dto/create-auth-user.dto'
import prisma from '@libs/client'
import { regex } from '@libs/regex'

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

    const passwordRegex = new RegExp(regex.userPassword)

    if (!passwordRegex.test(password)) {
      return {
        success: false,
        error: `비밀번호는 8자 ~ 20자, 대문자 하나 이상, 소문자 하나, 숫자 하나 및 특수 문자 하나 이상이어야 합니다.`,
      }
    }

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
