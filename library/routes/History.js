import express from 'express'
import { addHistory, getHistory, deleteHistory } from '../controllers/History.js'

const router = express.Router()

router.get('/history', getHistory)
router.post('/history/:id', addHistory)
router.delete('/history/:id', deleteHistory)

export default router