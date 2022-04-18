import { AuthChecker } from 'type-graphql'
import { Context } from '@libs/context'
import { jwtVerify } from '@libs/jwt'

export const authChecker: AuthChecker<Context> = async (
  { root, args, context, info },
  roles
) => {
  const { token, prisma } = context

  console.log('roles', roles)

  if (!roles || roles.includes('Any')) {
    // Public Users [OR] Any Users
    return true
  }

  if (!token) {
    return false
  }

  const decoded: any = jwtVerify(token)

  console.log('decoded', decoded)

  if (typeof decoded === 'object' && decoded.hasOwnProperty('id')) {
    const user = await prisma.user.findFirst({ where: { id: decoded.id } })

    if (!user) {
      return false
    }

    context.user = user

    return user.role === 'SUPER_ADMIN' || roles.includes(user.role)
  }

  return false // or false if access denied
}
