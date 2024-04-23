import { Router } from 'express'
import { body, param } from 'express-validator'
import { createProduct, getProducts, getProductById, updateProduct, updateAvailability, deleteProduct } from './handlers/product'
import { handleInputErrors } from './middleware'
const router = Router()
/**
 * @swagger
 * components:
 *     schemas:
 *           Product:               
 *                type: object
 *                properties:
 *                  id:
 *                     type: integer
 *                     description: The product ID
 *                     example: 1
 *                  name:
 *                     type: string
 *                     description: The product name
 *                     example: Monitor curvo
 *                  price:
 *                     type: number
 *                     description: The product price
 *                     example: 100
 *                  availability:
 *                     type: boolean
 *                     description: The product availability
 *                     example: true
 * 
 * 
 */

/**
 * @swagger
 * /api/products:
 *  get:
 *    summary: Get a list of products
 *    tags:
 *        - Products
 *    description: Return a list of products
 *    responses:
 *        200:
 *            description: Successful response
 *            content: 
 *              application/json:
 *                schema:
 *                 type: array
 *                 items:
 *                    $ref: '#/components/schemas/Product'
 * 
 */
router.get('/', getProducts)
/**
 * @swagger
 * /api/products/{id}:
 *    get:
 *       summary: Get a product by ID
 *       tags:
 *          - Products
 *       description: Return a product based on its unique ID
 *       parameters:
 *        - in: path
 *          name: id
 *          description: The ID of the product to retrieve
 *          requiered: true
 *          schema: 
 *            type: integer
 *       responses: 
 *          200:
 *              description: Succesful response
 *              content:
 *                 application/json:
 *                     schema:
 *                        $ref: '#/components/schemas/Product'
 *          400:
 *              description: Bad request - Invalid Id
 *          404:
 *              description: Not Found
 * 
 */
router.get('/:id',
  param('id').isInt().withMessage('ID no valido'),
  handleInputErrors,
  getProductById
)
/**
 * @swagger
 * /api/products:
 *  post:
 *    summary: Create a new product
 *    tags:
 *      - Products
 *    description: Returns a new record in the database
 *    requestBody:
 *      required: true
 *      content:
 *          application/json:
 *            schema: 
 *                type: object
 *                properties:
 *                    name:
 *                     type: string
 *                     example: Monitor 24 pulgadas
 *                    price:
 *                      type: number
 *                      example: 200
 *    responses:
 *        201:
 *        description: Succesful response
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Product'
 *        400:
 *          description: Bad request - invalid input data
 */
router.post('/',
  body('name')
    .notEmpty().withMessage('El nombre del producto no puede ir vacio'),
  body('price')
    .isNumeric().withMessage('Valor no valido')
    .notEmpty().withMessage('El precio del producto no puede ir vacio')
    .custom(value => value > 0).withMessage('Precio no valido'),
  handleInputErrors,
  createProduct
)
/**
 * @swagger
 * /api/products/{id}:
 *  put:
 *    summary: Updates a product with user input
 *    tags:
 *      - Products
 *    description: Returns the updated product
 *    parameters:
 *        - in: path
 *          name: id
 *          description: The ID of the product to retrieve
 *          requiered: true
 *          schema: 
 *            type: integer
 *    requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                schema: 
 *                    type: object
 *                    properties:
 *                        name:
 *                         type: string
 *                         example: Monitor 24 pulgadas
 *                        price:
 *                          type: number
 *                          example: 200
 *                        availability:
 *                          type: boolean
 *                          example: true
 *    responses:
 *      200:
 *        description: Succesful response
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Product'
 *      400:
 *        description: Bad request - invalid ID or invalid input data
 *      404:
 *        description: Not found
 *        
 *        
 *      
 * 
 */
router.put('/:id',
  param('id').isInt().withMessage('ID no valido'),
  body('name')
    .notEmpty().withMessage('El nombre del producto no puede ir vacio'),
  body('price')
    .isNumeric().withMessage('Valor no valido')
    .notEmpty().withMessage('El precio del producto no puede ir vacio')
    .custom(value => value > 0).withMessage('Precio no valido'),
  body('availability').isBoolean().withMessage('Valor para disponibilidad no valido'),
  handleInputErrors,
  updateProduct
)
/**
 * @swagger
 * /api/products/{id}:
 *  patch:
 *    summary: Update product availability
 *    tags:
 *      - Products
 *    description: Returns the updated availability product
 *    parameters:
 *        - in: path
 *          name: id
 *          description: The ID of the product to retrieve
 *          requiered: true
 *          schema: 
 *            type: integer
 *    responses:
 *      200:
 *        description: Succesful response
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Product'
 *      400:
 *        description: Bad request - invalid ID 
 *      404:
 *        description: Not found
 * 
 * 
 * 
 */
router.patch('/:id', 
  param('id').isInt().withMessage('ID no valido'),
  handleInputErrors,
  updateAvailability
)
/**
 * @swagger
 * /api/products/{id}:
 *  delete:
 *    summary: Deletes a product by a given Id
 *    tags:
 *      - Products
 *    description: Returns a confimation message
 *    parameters:
 *        - in: path
 *          name: id
 *          description: The ID of the product to delete
 *          requiered: true
 *          schema:
 *            type: integer
 *    responses:
 *      200:
 *        description: Succesful response
 *        content:
 *            application/json:
 *              schema:
 *                type: string
 *                value: 'Producto Eliminado'
 *      400:
 *        description: Bad request - invalid ID
 *      404:
 *        description: Not found
 * 
 * 
 * 
 */
router.delete('/:id',
  param('id').isInt().withMessage('ID no valido'),
  handleInputErrors,
  deleteProduct
)
export default router
