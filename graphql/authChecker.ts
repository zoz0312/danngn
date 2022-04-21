import { AuthChecker } from 'type-graphql'
import { Context } from '@libs/context'
import { jwtVerify } from '@libs/jwt'

export const authChecker: AuthChecker<Context> = async (
  { root, args, context, info },
  roles
) => {
  const { token, prisma } = context

  if (!roles) {
    // Public Users [OR] Any Users
    return true
  }

  if (!token) {
    return false
  }

  const decoded: any = jwtVerify(token)

  if (typeof decoded === 'object' && decoded.hasOwnProperty('id')) {
    const user = await prisma.user.findFirst({ where: { id: decoded.id } })

    if (!user) {
      return false
    }

    delete user.password
    context.user = user

    if (roles.includes('Any')) {
      return true
    }

    if (user.role === 'SUPER_ADMIN') {
      return true
    }

    if (roles.includes(user.role)) {
      return true
    }
  }

  return false // or false if access denied
}
