import * as bcrypt from 'bcrypt'

export const hashPassword = async (password: string): Promise<string> => {
  try {
    password = await bcrypt.hash(password, 10)
    return password
  } catch (error) {
    throw new Error(`해싱할 수 없습니다. ${error}`)
  }
}

export const checkPassword = async (
  password: string,
  hashedPassword: string
): Promise<boolean> => {
  try {
    return await bcrypt.compare(password, hashedPassword)
  } catch (error) {
    throw new Error(`비교할 수 없습니다. ${error}`)
  }
}
