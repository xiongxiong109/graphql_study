const { ApolloServer, gql } = require('apollo-server')
const { GraphQLScalarType } = require('graphql')

// 定义schema
const typeDefs = gql`
# 定义标量Date
scalar Date

type TimeInfo {
    createTime: Date
}

type Query {
    time: TimeInfo
}
`

// 自定义标量Date
const dd = new GraphQLScalarType({
    name: 'Date',
    description: 'Date custom scalar type',
    parseValue(value) {
        return new Date(value); // value from the client
    },
    serialize(value) {
        console.log(value)
        return value.getTime(); // value sent to the client
    },
    parseLiteral(ast) {
        if (ast.kind === Kind.INT) {
            return parseInt(ast.value, 10); // ast value is always in string format
        }
        return null;
    }
})

// 具体的实现都在resolver中
const resolvers = {
    Date: dd,
    Query: {
        time: () => {
            return {
                createTime: new Date()
            }
        }
    }
}

const server = new ApolloServer({ typeDefs, resolvers })

server.listen().then(({ url }) => {
    console.log(url)
})