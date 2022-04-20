import 'reflect-metadata'
import Cors from 'micro-cors'
import { ApolloServer } from 'apollo-server-micro'
import { buildSchemaSync, registerEnumType } from 'type-graphql'
import prisma from '@libs/client'
// import { resolvers } from '@generated/index'
import { ClientUserResolver } from '@graphql/resolvers/ClientUserResolver'
import { PageConfig } from 'next'
import { UserCrudResolver } from '@generated/index'
import { PrismaClient } from '@prisma/client'
import { jwtVerify } from '@libs/jwt'
import { authChecker } from '@graphql/authChecker'
import { ClientLoginResolver } from '@graphql/resolvers/LoginResolver'
import { AdminUserResolver } from '@graphql/resolvers/admin/AdminUserResolver'

enum SortOrder {
  asc = 'asc',
  desc = 'desc',
}

registerEnumType(SortOrder, {
  name: 'SortOrder',
})

const schema = buildSchemaSync({
  resolvers: [
    // ...resolvers,
    AdminUserResolver,
    ClientLoginResolver,
    UserCrudResolver,
    ClientUserResolver,
  ],
  // validate: false,
  authChecker,
})

const apolloServer = new ApolloServer({
  schema,
  context: (context) => {
    const { res, req, connection } = context
    const TOKEN_KEY = 'x-jwt'

    context.prisma = prisma
    context.token = req ? req.headers[TOKEN_KEY] : connection.context[TOKEN_KEY]

    return context
  },
})

const startServer = apolloServer.start()

const cors = Cors()
export default cors(async (req, res) => {
  if (req.method === 'OPTIONS') {
    res.end()
    return false
  }

  res.setHeader('Access-Control-Allow-Headers', 'Accept, Content-Type')
  res.setHeader('Access-Control-Allow-Credentials', 'true')
  res.setHeader(
    'Access-Control-Allow-Origin',
    'https://studio.apollographql.com'
  )

  await startServer
  await apolloServer.createHandler({ path: '/api/graphql' })(req, res)
})

// Apollo Server Micro takes care of body parsing
export const config: PageConfig = {
  api: {
    bodyParser: false,
  },
}
