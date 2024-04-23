import express from 'express'
import colors from 'colors'
import swaggerUi from 'swagger-ui-express'
import swaggerSpec from './config/swagger'
import router from './router'
import db from './config/db'

async function connectDB () {
  try {
    await db.authenticate()
    db.sync()
    // console.log(colors.magenta('Conexion exitosa'))
  } catch (error) {
    console.log(colors.red.bold('Hubo un error al conectar a la BD'))
  }
}
connectDB()
const server = express()
server.use(express.json())
server.use('/api/products', router)
server.use('/docs',swaggerUi.serve,swaggerUi.setup(swaggerSpec))
export default server
