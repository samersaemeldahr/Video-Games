// Import gql
const { gql } = require('apollo-server-express');

// Add typeDefs
const typeDefs = gql`
  type User {
    _id: ID
    username: String
    email: String
    password: String
    gameCount: Int
    savedGames: [Game]
  }
  type Game {
    gameId: String
    name: String
    released: String
    background_image: String
    rating: Int
    metacritic: Int
  }
  input gameInput {
    gameId: String
    name: String
    released: String
    background_image: String
    rating: Int
    metacritic: Int
  }
  type Auth {
    token: ID!
    user: User
  }
  type Query {
    me: User
  }
  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    saveGame(input: gameInput): User
    removeGame(gameId: String!): User
  }
`;

// Export
module.exports = typeDefs;