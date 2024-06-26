import { gql } from 'apollo-server-express'

const typeDefs = gql`
  type User {
    _id: ID
    email: String
    role: String
    accessToken: String
  }

  type Movie {
    _id: ID
    title: String
    year: String
    poster: String
  }

  type LogoutAndDeleteMovieResponse {
    success: Boolean
    message: String
  }

  type Query {
    getMovies: [Movie]
    getMovieById(id: ID!): Movie
  }

  type Mutation {
    register(email: String!, password: String!): User
    login(email: String!, password: String!): User
    logout: LogoutAndDeleteMovieResponse,
    createNewMovie(title: String!, year: String!, poster: String!): Movie
    updateMovie(id: ID!, title: String!, year: String!, poster: String!): Movie
    deleteMovie(id: ID!): LogoutAndDeleteMovieResponse
  }
`

export default typeDefs