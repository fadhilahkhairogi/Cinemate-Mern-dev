//profileController.js

import User from '../models/user.js'

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

//edit profile
export async function editProfile(req, res) {
  const { first_name, last_name, email } = req.body
  const userId = req.user.userId
  try {
    const user = await User.findByPk(userId)
    if (!user) {
      return res.status(404).json({ error: 'User not found' })
    }
    user.first_name = first_name || user.first_name
    user.last_name = last_name || user.last_name
    user.email = email || user.email
    await user.save()
    res.json({ message: 'Profile updated successfully' })
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Server error' })
  }
}

//show all user (admin only)
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