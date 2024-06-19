import swaggerJSDoc from "swagger-jsdoc";

const options = {
  definition: {
    openapi: '3.1.0',
    info: {
      title: 'Movie Api project',
      version: '1.0.0',
      description: 'A simple movie api application'
    },
    servers: [
      {
        url: 'http://localhost:4001/api/v1',
        description: 'Localhost server'
      },
      {
        url: 'https://k28-be-nguyenvana.onrender.com/api/v1',
        description: 'Development server'
      }
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT'
        }
      }
    },
    security: {
      bearerAuth: []
    }
  },
  apis: [
    './routes/userRoutes.js',
    './routes/movieRoutes.js',
  ]
}

const swaggerSpec = swaggerJSDoc(options)

