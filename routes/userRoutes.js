import express from 'express'
import { auth } from '../middlewares/auth.js'
import { login, logout, register } from '../controllers/userController.js'

const router = express.Router()

/**
 * @swagger
 * tags:
 *   name: User
 *   description: API related to users
*/

/**
 * @swagger
 * components:
 *   schemas: 
 *     User:
 *       type: object
 *       properties:
 *         email:
 *           type: string
 *         role:
 *           type: string  
 *         accessToken:
 *           type: string
 *     UserBodyRequest:
 *       type: object
 *       properties:
 *         email:
 *           type: string
 *         password:
 *           type: string
*/

/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Register
 *     description: This api is used to register a new account
 *     tags: [User]
 *     requestBody:
 *       require: true 
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserBodyRequest'
 *     responses:
 *       200:
 *         description: Success response
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
*/
router.post('/register', register)

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Login
 *     description: This api is used to login
 *     tags: [User]
 *     requestBody:
 *       require: true 
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserBodyRequest'
 *     responses:
 *       200:
 *         description: Success response
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
*/
router.post('/login', login)

/**
 * @swagger
 * /auth/logout:
 *   post:
 *     summary: Logout
 *     description: This api is used to logout
 *     tags: [User]
 *     responses:
 *       200:
 *         description: Success response
 *         content:
 *           application/json:
 *             schema:
 *               type: string
*/
router.post('/logout', auth, logout)

export { router as userRoutes }
