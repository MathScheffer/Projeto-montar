module.exports = {
    // method of operation
    get: {
      tags: ["Todo CRUD operations"], // operation's tag.
      description: "Get todos", // operation's desc.
      operationId: "getTodos", // unique operation id.
      parameters: [], // expected params.
      // expected responses
      responses: {
        // response code
        200: {
          description: "Todos were obtained", // response desc.
          content: {
            // content-type
            "application/json": {
              schema: {
                $ref: "#/models/schemas/Usuario", // Todo model
              },
            },
          },
        },
      },
    },
  };
  /**
 * @swagger
 * /api/usuarios/:
 *  get:
 *    description: Request para todos os usuarios
 *    responses:
 *      '200':
 *        description: Usuarios listados
 */

    /**
 * @swagger
 * /api/usuarios/teste:
 *  get:
 *    description: Request para todos os usuarios
 *    responses:
 *      '200':
 *        description: Usuarios listados
 */

   /**
 * @swagger
 * /api/usuarios/atualizar/{id}:
 *  put:
 *    description: Request para atualizar um usuario
 *    parameters:
 *      - in: query
 *        name: id
 *        type: integer
 *        schema:
 *           $ref: '../components.js#/components/schemas/id'
 *      - in: body
 *        name: bodS
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                type:
 *                  type: string  
 *                color:
 *                  type: string
 *       
 *    responses:
 *      '200':
 *        description: Usuarios listados

 */
