import { Router } from 'express'
import { createProduct } from './handlers/product'
const router = Router()
router.get('/', (req, res) => {
  res.send('Hola mundo')
})
router.post('/', createProduct)
router.put('/', (req, res) => {
  res.send('Hola put')
})
router.patch('/', (req, res) => {
  res.send('Hola patch')
})
router.delete('/', (req, res) => {
  res.send('Hola delete')
})
export default router
