const { gql } = require('apollo-server')

const typeDefs = gql`
    type User {
        id: Int!
        username: String
        email: String!
    }

    type AuthPayload {
        token: String!
        user: User!
    }

    type Query {
        user(id: Int!): User
        allUsers: [User!]!
        me: User
    }

    type Mutation {
        registerUser(username: String, email: String!, password: String!): AuthPayload!
        login (email: String!, password: String!): AuthPayload!
    }

`

module.exports = typeDefs