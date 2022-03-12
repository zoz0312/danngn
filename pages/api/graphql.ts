import 'reflect-metadata'
import Cors from 'micro-cors'
import { ApolloServer } from 'apollo-server-micro'
import { buildSchemaSync, registerEnumType } from 'type-graphql'
import { PageConfig } from 'next'
import { resolvers } from '@generated/type-graphql'
import { Prisma } from '@prisma/client'

const cors = Cors()

enum SortOrder {
  asc = 'asc',
  desc = 'desc',
}

registerEnumType(SortOrder, {
  name: 'SortOrder',
})

const schema = buildSchemaSync({
  resolvers,
  validate: false,
})

export const config: PageConfig = {
  api: {
    bodyParser: false,
  },
}

const apolloServer = new ApolloServer({
  schema,
  context: () => ({ Prisma }),
})

const startServer = apolloServer.start()

export default cors(async (req, res) => {
  if (req.method === 'OPTIONS') {
    res.end()
    return false
  }

  await startServer
  await apolloServer.createHandler({ path: '/api/graphql' })(req, res)
})
