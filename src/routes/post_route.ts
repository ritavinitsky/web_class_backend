import express from "express";
const router = express.Router();
import PostController from "../controllers/post_controller";
import authMiddleware from "../common/auth_middleware";
/**
* @swagger
* tags:
*   name: Post
*   description: The Authentication API
*/

/**
* @swagger
* components:
*   schemas:
*     Post:
*       type: object
*       required:
*         - creator_id
*         - post_title
*         - post_text
*         - imgUrl
*       properties:
*           creator_id:
*             type: string
*             description: The id of the post owner
*           post_title:
*             type: string
*             description: The title of the post
*           post_text:
*             type: string
*             description: The content(text) of the post
*           imgUrl:
*             type: string
*             description: The post link to image on the server. For test purposes there is a "url" link as default to test the user itself
*       example:
*         creator_id: '2097519b5d'
*         post_title: 'hello'
*         post_text: 'hello everybody'
*         
*/

/**
* @swagger
* /post:
*   get:
*     summary: Get all posts
*     tags: [Post]
*     security:
*       - bearerAuth: []
*     responses:
*       200:
*         description: list of all the posts
*         content:
*           application/json:
*             schema:
*               type: array
*               items:
*                  $ref: '#/components/schemas/Post'
*/
router.get("/",authMiddleware, PostController.get.bind(PostController));

/**
 * @swagger
 * /post/{id}:
 *   get:
 *     summary: Get a post by ID
 *     tags: [Post]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       requestBody:
*          required: true
*          content:
*            application/json:
*              schema:
*                $ref: '#/components/schemas/Post'
 *     responses:
 *       '200':
 *         description: Post details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Post'
 */
router.get("/:id",authMiddleware, PostController.getById.bind(PostController));

/**
 * @swagger
 * /post:
 *   post:
 *     summary: Post a post
 *     tags: [Post]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
*          required: true
*          content:
*            application/json:
*              schema:
*                $ref: '#/components/schemas/Post'
 *     responses:
 *       '200':
 *         description: Post details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Post'
 */
router.post("/",authMiddleware, PostController.post.bind(PostController));

/**
 * @swagger
 * /post/{id}:
 *   put:
 *     summary: Update post by ID
 *     tags: [Post]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
*          required: true
*          content:
*            application/json:
*              schema:
*                $ref: '#/components/schemas/Post'
 *     parameters:
 *       - in: 'path'
 *         name: 'id'
 *         required: true
 *         schema:
 *           type: 'string'
 *           example: '1ed56723d4599'
 *           description: 'Unique ID of the post to update'
 *     responses:
 *       '201':
 *         description: Updated post details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Post'
 */
router.put("/:id",authMiddleware, PostController.put.bind(PostController));

/**
 * @swagger
 * /post/{id}:
 *   delete:
 *     summary: 'Delete post by ID'
 *     tags: [Post]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: 'path'
 *         name: 'id'
 *         required: true
 *         schema:
 *           type: 'string'
 *           example: '1ed56723d4599'
 *           description: 'Unique ID of the post to delete'
 *     responses:
 *       '201':
 *         description: 'Post has been deleted'
 */
router.delete("/:id",authMiddleware, PostController.remove.bind(PostController));

export default router;