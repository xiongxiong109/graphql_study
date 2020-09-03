const { ApolloServer, gql } = require('apollo-server')

// 定义schema
const typeDefs = gql`

# 定义类型
type Book {
    title: String
    author: Author
}

# 定义作者纬度
type Author {
    # 作者姓名
    name: String
    # 作者的书籍
    books: [Book]
}

# 定义查询类型
type Query {
    books: [Book]
    authors: [Author]
}
# 定义更新类型
type Mutation {
    addBook(tittle: String, author: String): Book
    addAuthor(name: String): Author
}
`

// const author = {
//     name: 'jqxiong',
//     books: [ book1, book2 ]
// }

const book1 = {
    title: 'asdasd',
    author: {
        name: 'jqxiong',
        books: []
    }
}

const books = [
    book1
]

const authors = [
    {
        name: 'jqxiong',
        books: [
            {
                title: 'asasas'
            }
        ]
    }
]

const resolvers = {
    Query: {
        books: () => books,
        authors: () => authors
    },
    Mutation: {
        addAuthor: () => {
            console.log(name)
            return {
                name
            }
        }
    }
}

const server = new ApolloServer({ typeDefs, resolvers })

server.listen().then(({ url }) => {
    console.log(url)
})