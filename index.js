const { ApolloServer, gql } = require('apollo-server')
const { GraphQLScalarType } = require('graphql')

// 定义schema
const typeDefs = gql`
type User {
    id: Int!
    name: String
    age: Int
}
type Query {
    users: [User]
}
`

// 具体的实现都在resolver中
const resolvers = {
    Query: {
        users: () => {
            return [
                {
                    id: 1,
                    name: 'aa',
                    age: 23
                }
            ]
        }
    }
}

const server = new ApolloServer({ typeDefs, resolvers })

server.listen().then(({ url }) => {
    console.log(url)
})