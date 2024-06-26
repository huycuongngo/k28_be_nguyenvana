import express, { json } from 'express';
import mongoose from 'mongoose';
import cors from 'cors'
import dotenv from 'dotenv'
import { userRoutes } from './routes/userRoutes.js';
import { movieRoutes } from './routes/movieRoutes.js';
import swaggerUi from 'swagger-ui-express'
import swaggerSpec from './swagger.js'

import typeDefs from './schemas/typeDefs.js';
import resolvers from './schemas/resolvers.js';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4'
import { verifyJWT } from './middlewares/auth.js';

const app = express()
app.use(cors())
app.use(express.json())
dotenv.config()

app.use('/api/v1/auth', userRoutes)
app.use('/api/v1/movies', movieRoutes)
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

await server.start()

app.use(
  '/graphql',
  cors(),
  express.json(),
  expressMiddleware(server, {
    context: async ({ req }) => {
      const accessToken = req.headers.authorization?.split(" ")[1]
      return ({
        user: verifyJWT(accessToken)
      })
    }
  })
)

mongoose.connect(process.env.DB_URI, { dbName: 'demo_db' })
  .then(() => {
    console.log('Connected to DB');
    app.listen(process.env.PORT, () => {
      console.log(`Server is running on port ${process.env.PORT}`);
    })
  })
  .catch((err) => {
    console.log(err);
  });
