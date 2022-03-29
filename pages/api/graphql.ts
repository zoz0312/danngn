import 'reflect-metadata'
import Cors from 'micro-cors'
import { ApolloServer } from 'apollo-server-micro'
import { buildSchemaSync, registerEnumType } from 'type-graphql'
import prisma from '@libs/client'
import { resolvers } from '@generated/index'
import { ClientUserResolver } from '@graphql/resolvers/ClientUserResolver'
import { PageConfig } from 'next'

enum SortOrder {
  asc = 'asc',
  desc = 'desc',
}

registerEnumType(SortOrder, {
  name: 'SortOrder',
})

const schema = buildSchemaSync({
  resolvers: [...resolvers, ClientUserResolver],
  validate: false,
})

const apolloServer = new ApolloServer({
  schema,
  context: (context) => {
    context.prisma = prisma
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
