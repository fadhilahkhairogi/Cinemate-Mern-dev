//userController.js

import User from '../models/user.js'
import Cinema from '../models/cinema.js'

// Get User Profile (GET)
export async function getAllUsers(req, res) {
  try {
    const users = await User.findAll({
      attributes: { exclude: ['password'] },
    })
    res.status(200).json({ users })
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Server error' })
  }
}

// get user by id
export async function getUserById(req, res) {
  const userId = req.params.id
    try {
    const user = await User.findByPk(userId, {
        attributes: { exclude: ['password'] },
    })
    if (!user) {
      return res.status(404).json({ error: 'User not found' })
    }
    res.status(200).json({ user })
    } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Server error' })
  }
}

// edit user by id (Role and cinemaId only) (PUT)
export async function editUserById(req, res) {
  const userId = req.params.id
  const { role, cinemaId } = req.body
  try {
    const user = await User.findByPk(userId)
    if (!user) {
      return res.status(404).json({ error: 'User not found' })
    }
    
    if (role !== undefined) {
      user.role = role
      if (role !== 'admin') {
        user.cinemaId = null
      }
    }

    if (cinemaId !== undefined) {
      if (user.role !== 'admin') {
        return res.status(400).json({ 
          error: 'Only admin can be assigned a cinema' 
        })
      }

      if (cinemaId === null) {
        return res.status(400).json({ 
          error: 'cinemaId cannot be null for admin' 
        })
      }

      const cinema = await Cinema.findByPk(cinemaId)
      if (!cinema) {
        return res.status(404).json({ error: 'Cinema not found' })
      }
      user.cinemaId = cinemaId
    }

    await user.save()
    res.status(200).json({ message: 'Admin assigned successfully' })
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Server error' })
  }
}

// delete user by id (DELETE)
export async function deleteUserById(req, res) {
  const userId = req.params.id
  try {
    const user = await User.findByPk(userId)
    if (!user) {
      return res.status(404).json({ error: 'User not found' })
    }
    await user.destroy()
    res.status(200).json({ message: 'User deleted successfully' })
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Server error' })
  }
}

