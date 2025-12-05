//profileController.js

import User from '../models/user.js'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import Token from '../models/accessToken.js'
import { Op } from 'sequelize'

// Get User Profile (GET)
export async function getUserProfile(req, res) {
  try {
    const userId = req.user.userId
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