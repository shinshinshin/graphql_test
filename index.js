const { ApolloServer, gql } = require('apollo-server')
const axios = require('axios')
const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()
const typeDefs = gql`
  type Query {
    users: [User]
    user(id: ID!): User
    posts: [Post]
  }

  type Post {
    id: ID!
    title: String!
    body: String!
    userId: ID!
  }

  type User {
    id: ID!
    name: String!
    email: String!
    myPosts: [Post]
  }

  type Mutation {
    createUser(name: String!, email: String!): User
    updateUser(id: Int!, name: String!): User
    deleteUser(id: Int!): User
  }
`
const resolvers = {
  Query: {
    posts: async () => {
      return await prisma.post.findMany()
    },
    users: async () => {
      return await prisma.user.findMany()
    },
    user: async (parent, args) => {
      return await prisma.user.findUnique({ where: { id: parseInt(args.id) } })
    },
  },
  User: {
    myPosts: async (parent) => {
      return await prisma.post.findMany({
        where: { authorId: parseInt(parent.id) },
      })
    },
  },
  Mutation: {
    createUser: (_, args) => {
      return prisma.user.create({
        data: {
          name: args.name,
          email: args.email
        }
      })
    },
    updateUser: (_, args) => {
      return prisma.user.update({
        where: {
          id: args.id
        },
        data: {
          name: args.name
        }
      })
    },
    deleteUser: (_, args) => {
      return prisma.user.delete({
        where: { id: args.id },
      })
    },
  }
}

const server = new ApolloServer({ typeDefs, resolvers })

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`)
})
