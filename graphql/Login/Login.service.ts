import { LoginInput, LoginOutput } from './dto/login.dto'
import { checkPassword } from '@libs/hash'
import { jwtSign } from '@libs/jwt'
import prisma from '@libs/client'

export const login = async (loginInput: LoginInput): Promise<LoginOutput> => {
  try {
    const { email, password } = loginInput

    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    })

    if (!user) {
      return {
        success: false,
        error: `아이디나 비밀번호가 잘못되었거나, 존재하지 않는 이메일입니다.`,
      }
    }

    const isCorrectPassword = await checkPassword(password, user.password)
    if (!isCorrectPassword) {
      return {
        success: false,
        error: `비밀번호 오류입니다.`,
      }
    }

    const token = await jwtSign({ id: user.id })

    return {
      success: true,
      token,
    }
  } catch (error) {
    return {
      success: false,
      error,
    }
  }
}
