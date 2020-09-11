const { ApolloServer } = require('apollo-server')
const typeDefs = require('./schemas/human')

const users = [
    {
        name: 'xx',
        gender: 'FEMALE'
    },
    {
        name: 'xxa',
        gender: 'MALE'
    },
    {
        name: 'aa'
    },
    {
        name: 'bol',
        gender: 'MALE'
    }
]

// 具体的实现都在resolver中
const resolvers = {
    Query: {
    }
}

const server = new ApolloServer({ typeDefs })

server.listen().then(({ url }) => {
    console.log(url)
})