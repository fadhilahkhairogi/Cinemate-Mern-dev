//fnbRoutes.js

import express from 'express'
import { getFnb, createFnb, updateFnb, deleteFnb, getAllFnb} from '../controllers/FnBController.js'
import { checkAuth } from '../middleware/checkAuth.js'
import { checkAdmin, checkSuperAdmin} from '../middleware/adminMiddleware.js'
const router = express.Router()

//GET all Fnb
router.get('/', checkAuth, checkSuperAdmin, getAllFnb)
// GET all FnB items by cinema id
router.get('/cinema/:cinemaId/fnbs', checkAuth, getFnb)
// POST create new FnB item by cinema id
router.post('/cinema/:cinemaId/fnbs', checkAuth, checkAdmin, createFnb)
// PUT update FnB item by fnb id
router.put('/cinema/:cinemaId/fnbs/:fnbId', checkAuth, checkAdmin, updateFnb)
// DELETE delete FnB item by cinema id by fnb id
router.delete('/cinema/:cinemaId/fnbs/:fnbId', checkAuth, checkAdmin, deleteFnb)

export default router