import express from 'express'
import colors from 'colors'
import router from './router'
import db from './config/db'
import bodyParser from 'body-parser'

async function connectDB () {
  try {
    await db.authenticate()
    db.sync()
    console.log(colors.magenta('Conexion exitosa'))
  } catch (error) {
    console.log(error)
    console.log(colors.red.bold('Hubo un error al conectar a la BD'))
  }
}

connectDB()

const server = express()

server.use(bodyParser.json())
server.use(bodyParser.urlencoded({ extended: true }));

server.use('/api/products', router)

export default server
