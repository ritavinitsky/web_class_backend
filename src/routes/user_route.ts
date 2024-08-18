import express from "express";
const router = express.Router();
import UserController from "../controllers/user_controller";
import authMiddleware from "../common/auth_middleware";
/**
* @swagger
* tags:
*   name: User
*   description: The Authentication API
*/

/**
* @swagger
* components:
*   schemas:
*     User:
*       type: object
*       required:
*         - name
*         - email
*         - age
*         - imgUrl
*         - password
*       properties:
*         name:
*           type: string
*           description: The user name
*         email:
*           type: string
*           description: The user email
*         age:
*           type: string
*           description: The user age
*         imgUrl:
*           type: string
*           description: The user link to image on the server. For test purposes there is a "url" link as default to test the user itself
*         password:
*           type: string
*           description: The user password
*       example:
*           name: 'abc'
*           email: 'abc@gmail.com'
*           age: '25'
*           imgUrl: 'url'
*           password: '12345'
*/

/**
* @swagger
* /user:
*   get:
*     summary: Get all users
*     tags: [User]
*     security:
*       - bearerAuth: []
*     responses:
*       200:
*         description: list of all the users
*         content:
*           application/json:
*             schema:
*               type: array
*               items:
*                  $ref: '#/components/schemas/User'
*/
router.get("/",  authMiddleware, UserController.get.bind(UserController));
/**
 * @swagger
 * /user/{id}:
 *   get:
 *     summary: Get a user by ID
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           example: 1ed56723d4599
 *           description: Unique ID of the student to retrieve
 *     responses:
 *       '200':
 *         description: 'Users details'
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 */

router.get("/:id", authMiddleware, UserController.getById.bind(UserController));
/**
 * @swagger
 * /user/{id}:
 *   put:
 *     summary: Update users data by ID
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
*          required: true
*          content:
*            application/json:
*              schema:
*                $ref: '#/components/schemas/User'
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           example: 1ed56723d4599
 *           description: Unique ID of the user to update
 *     responses:
 *       201:
 *         description: Users updated details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 */
router.put("/:id",authMiddleware, UserController.put.bind(UserController));
/**
 * @swagger
 * /user/{id}:
 *   delete:
 *     summary: 'Delete user by ID'
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: 'path'
 *         name: 'id'
 *         required: true
 *         schema:
 *           type: 'string'
 *           example: '1ed56723d4599'
 *           description: 'Unique ID of the user to delete'
 *     responses:
 *       '201':
 *         description: 'Post has been deleted'
 */
router.delete("/:id", authMiddleware, UserController.remove.bind(UserController));

router.put("/email/:email/password", authMiddleware, UserController.updatePasswordByEmail);

export default router;