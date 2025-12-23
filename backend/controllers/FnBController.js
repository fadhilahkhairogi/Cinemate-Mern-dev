// controllers/FnBController.js
import { Op } from 'sequelize'
import Fnb from '../models/fnb.js'
import Cinema from '../models/cinema.js'

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

//get all fnb (superadmin access)
export async function getAllFnb(req, res) {
  try {
    const fnbs = await Fnb.findAll()
    res.status(200).json({ fnbs })
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

    if (!name || !description || !price || !type || !stock || !photoFnb) {
      return res.status(400).json({error: "Please fill in all fields"})
    }

    if (price < 0) {
      return res.status(400).json({error: "price cant be negative"})      
    }
    
    if (stock < 0) {
      return res.status(400).json({error: "stock cant be negative"})      
    }



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

    if (price !== undefined && price < 0) {
      return res.status(400).json({error: "price cant be negative"})      
    }
    
    if (stock !== undefined && stock < 0) {
      return res.status(400).json({error: "stock cant be negative"})      
    }

    const fnb = await Fnb.findOne({
      where: {
        fnbId,
        cinemaId,
      },
    })

    if (!fnb) {
      return res.status(404).json({ error: 'F&B not found' })
    }

    if (name !== undefined) fnb.name = name
    if (description !== undefined) fnb.description = description
    if (price !== undefined) fnb.price = price
    if (type !== undefined) fnb.type = type
    if (stock !== undefined) fnb.stock = stock
    if (photoFnb !== undefined) fnb.photoFnb = photoFnb

    await fnb.save()

    res.json({ message: 'F&B updated', fnb })
    
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Server error' })
  }
}

// DELETE delete cinemaId by fnbId
export async function deleteFnb(req, res) {
  try{
    const {cinemaId, fnbId} = req.params

    const cinema = await Cinema.findByPk(cinemaId)

    if (!cinema) {
      return res.status(404).json({error : 'Cinema not found'})
    }

    const fnb = await Fnb.findOne({
      where: {
        fnbId,
        cinemaId
      }
    })

    if (!fnb) {
      return res.status(404).json({error : 'Fnb in this cinema not found'})
    } 

    await fnb.destroy()

    res.json({message : "Fnb deleted"})
  } catch (err){
    res.status(500).json({ error: err })
  }
  
}
