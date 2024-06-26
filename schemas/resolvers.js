import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import User from '../models/UserModel.js'
import Movie from '../models/MovieModel.js'
import mongoose from 'mongoose'
import { generateAccessToken } from '../controllers/userController.js'

const resolvers = {
  Query: {
    getMovies: async (parent, _, { user }) => {
      if (!user) {
        throw new Error('You are not authenticated')
      }
      const movies = await Movie.find()
      return movies
    },
    getMovieById: async (parent, { id }, { user }) => {
      if (!user) {
        throw new Error('You are not authenticated')
      }
      if (!mongoose.Types.ObjectId.isValid(id)) {
        throw new Error('Invalid movie id')
      }
      const checkMovieInDb = await Movie.findById(id)
      if (!checkMovieInDb) {
        throw new Error('Movie not found')
      }
      console.log("checkMovieInDb", checkMovieInDb)
      return checkMovieInDb
    }
  },
  Mutation: {
    register: async (parent, { email, password }) => {
      try {
        if (!email)
          throw new Error("Email is required")
        if (!password) 
          throw new Error("Password is required")
        const existEmail = await User.findOne({ email })
        if (existEmail) {
          throw new Error("Email already exists")
        }
        const saltRound = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, saltRound)
        const newUser = await User.create({ email, password: hashedPassword })

        return newUser
      } catch (error) {
        console.log("error", error)
        throw new Error(error.message)
      }
    },
    login: async (parent, { email, password }) => {
      try {
        if (!email)
          throw new Error("Email is required")
        if (!password)
          throw new Error("Password is required")
        const checkEmailUser = await User.findOne({ email })
        if (!checkEmailUser) {
          throw new Error("Email is incorrect")
        }
        const checkPasswordUser = await bcrypt.compare(password, checkEmailUser.password)
        if (!checkPasswordUser) {
          throw new Error("Password is incorrect")
        }
        console.log("checkEmailUser in login mutation", checkEmailUser)
        const accessToken = generateAccessToken(checkEmailUser)
        checkEmailUser.accessToken = accessToken
        
        return checkEmailUser
      } catch (error) {
        console.log("error", error)
        throw new Error(error.message)
      }
    },
    logout: async (parent, _, { user }) => { 
      if (!user) {
        throw new Error('You are not authenticated')
      }
      return {
        success: true,
        message: 'Logged out successfully'
      }
    },
    createNewMovie: async (parent, { title, year, poster }, { user }) => {
      if (!user) {
        throw new Error('You are not authenticated')
      }
      console.log("user in create new movie", user)
      if (!title || !year || !poster) {
        throw new Error("All fields required")
      }
      try {
        const newMovie = await Movie.create({ title, year, poster })
        return newMovie
      } catch (error) {
        console.log("error", error)
        throw new Error(error.message)
      }
    },
    updateMovie: async (parent, { id, title, year, poster }, { user }) => { 
      if (!user) {
        throw new Error('You are not authenticated')
      }

      if (!mongoose.Types.ObjectId.isValid(id)) {
        throw new Error('Invalid movie id')
      }
      if (!title || !year || !poster) {
        throw new Error("All fields required")
      }
      try {
        const checkMovieInDb = await Movie.findById(id)
        if (!checkMovieInDb) {
          throw new Error('Movie not found')
        }
        await checkMovieInDb.updateOne({ title, year, poster })
        return {_id: id, title, year, poster}
      } catch (error) {
        console.log("error", error)
        throw new Error(error.message)
      }
    },
    deleteMovie: async (parent, { id }, { user }) => {
      if (!user) {
        throw new Error('You are not authenticated')
      }

      if (!mongoose.Types.ObjectId.isValid(id)) {
        throw new Error('Invalid movie id')
      }
      try {
        const checkMovieInDb = await Movie.findById(id)
        if (!checkMovieInDb) {
          throw new Error('Movie not found')
        }
        await Movie.findByIdAndDelete(id)
        return {
          success: true,
          message: 'Delete movie successfully'
        }
      } catch (error) {
        console.log("error", error)
        throw new Error(error.message)
      }
    }
  }
}

export default resolvers
