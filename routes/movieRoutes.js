import express from 'express'
import { auth, authAdmin } from '../middlewares/auth.js'
import { getMovies, getMovieById, createNewMovie, updateMovie, deleteMovie } from '../controllers/movieController.js'

const router = express.Router()

/**
 * @swagger
 * tags:
 *   name: Movie
 *   description: API related to movies
*/

/**
 * @swagger
 * components:
 *   schemas:
 *     Movie:
 *       type: object
 *       properties:
 *         _id: 
 *           type: string
 *         title: 
 *           type: string
 *         year: 
 *           type: string
 *         poster: 
 *           type: string
 *         __v:
 *           type: number
 *     MovieBodyRequest:
 *       type: object
 *       properties:
 *         title: 
 *           type: string
 *         year:
 *           type: string
 *         poster: 
 *           type: string
*/

/**
 * @swagger
 * /movies:
 *   get:
 *     summary: Get movies
 *     description: This api is used to get movies
 *     tags: [Movie]
 *     responses: 
 *       200:
 *         description: Success response
 *         content: 
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Movie'
*/
router.get('/', auth, getMovies)

/**
 * @swagger
 * /movies/{id}:
 *   get:
 *     summary: Get movie detail
 *     description: This api is used to get movie detail
 *     tags: [Movie]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: string ID required
 *         schema:
 *           type: string
 *     responses: 
 *       200:
 *         description: Success response
 *         content: 
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Movie'
*/
router.get('/:id', auth, getMovieById)


/**
 * @swagger
 * /movies:
 *   post:
 *     summary: Create a new movie
 *     description: This api is used to create a new movie
 *     tags: [Movie]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/MovieBodyRequest'
 *     responses: 
 *       200:
 *         description: Success response
 *         content: 
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Movie'
*/
router.post('/', auth, authAdmin, createNewMovie)


/**
 * @swagger
 * /movies/{id}:
 *   put:
 *     summary: Update movie
 *     description: This api is used to update movie
 *     tags: [Movie]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: string ID required
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/MovieBodyRequest'
 *     responses: 
 *       200:
 *         description: Success response
 *         content: 
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Movie'
*/
router.put('/:id', auth, authAdmin, updateMovie)

/**
 * @swagger
 * /movies/{id}:
 *   delete:
 *     summary: Delete movie
 *     description: This api is used to delete movie
 *     tags: [Movie]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: string ID required
 *         schema:
 *           type: string
 *     responses: 
 *       200:
 *         description: Success response
 *         content: 
 *           application/json:
 *             schema:
 *               type: string
*/
router.delete('/:id', auth, authAdmin, deleteMovie)

export { router as movieRoutes }
