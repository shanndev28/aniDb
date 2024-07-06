import express from 'express'
import { addHistory, getHistory, deleteHistory } from '../controllers/History.js'

const router = express.Router()

router.get('/history', getHistory)
router.get('/history/add/:id', addHistory)
router.get('/history/del/:id', deleteHistory)

export default router