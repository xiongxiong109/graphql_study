const { ApolloServer, gql } = require('apollo-server')
const { GraphQLScalarType } = require('graphql')

// 定义schema
const typeDefs = gql`

# 性别枚举
enum Gender {
    MALE
    FEMALE
}

type Skill {
    name: String
    func: String
}

type Human {
    # 性别
    gender: Gender
    # 姓名
    name: String!
    # 技能
    skills: [Skill]
}

type Query {
    # 根据姓名模糊查询
    human(fuzzyName: String, gender: Gender): [Human]
}

`

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
        // args为传入的参数
        human: (obj, args, context, info) => {
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    const { fuzzyName, gender } = args
                    if (fuzzyName) {
                        const reg = new RegExp(fuzzyName, 'i')
                        const list = users.filter(item => reg.test(item.name) && (item.gender == gender || !gender))
                        resolve(list)
                    }
                    resolve(users)
                }, 1e3)
            })
        }
    }
}

const server = new ApolloServer({ typeDefs, resolvers })

server.listen().then(({ url }) => {
    console.log(url)
})