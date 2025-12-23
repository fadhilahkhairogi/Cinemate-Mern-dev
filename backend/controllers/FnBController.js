// controllers/FnBController.js
import { Op } from 'sequelize'
import Fnb from '../models/fnb.js'

//get all FnB items by cinema id
export async function getFnb(req, res) {
  try {
    const { cinemaId } = req.params

    const fnbs = await Fnb.findAll({
      where: { cinemaId }
    })

    res.json({ fnbs })
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Server error' })
  }
}

// POST create new FnB item by cinema id
export async function createFnb(req, res) {
  try {
    const { cinemaId } = req.params
    const { name, description, price, type, stock, photoFnb } = req.body

    const fnb = await Fnb.create({
      name,
      description,
      price,
      type,
      stock,
      photoFnb,
      cinemaId,
    })

    res.status(201).json({ message: 'F&B created', fnb })
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Server error' })
  }
}

// PUT update FnB item by fnb id
export async function updateFnb(req, res) {
  try {
    const { fnbId, cinemaId } = req.params
    const { name, description, price, type, stock, photoFnb } = req.body

    const fnb = await Fnb.findOne({
      where: {
        fnbId,
        cinemaId,
      },
    })

    if (!fnb) {
      return res.status(404).json({ error: 'F&B not found' })
    }

    await fnb.update({
      name,
      description,
      price,
      type,
      stock,
      photoFnb,
    })

    res.json({ message: 'F&B updated', fnb })
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Server error' })
  }
}

// place Fnb order (after book ticket/s)
