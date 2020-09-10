const { ApolloServer, gql } = require('apollo-server')
const { GraphQLScalarType } = require('graphql')

// 定义schema
const typeDefs = gql`

enum LengthUnit {
    METER
}

type StarShip {
    id: ID!
    name: String!
    length(unit: LengthUnit = METER): Float
}

type Query {
    star: StarShip
}
`

// 具体的实现都在resolver中
const resolvers = {
    Query: {
        star: (info) => {
            return {
                id: 12121,
                name: 'star',
                // 针对单个字段可以传入不同参数
                length: (args) => {
                    console.log(args)
                    return 12.32432
                }
            }
        }
    }
}

const server = new ApolloServer({ typeDefs, resolvers })

server.listen().then(({ url }) => {
    console.log(url)
})