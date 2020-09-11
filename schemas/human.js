const { gql } = require('apollo-server')

const HumanSchema = gql`
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

# 查询type
type Query {
    # 根据姓名模糊查询
    human(fuzzyName: String, gender: Gender): [Human]
}
# 修改type
type Mutation {
    # 新增
    addHuman(name: String, gender: Gender): Human
}
`

module.exports = HumanSchema