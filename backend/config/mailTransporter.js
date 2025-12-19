//mailTransporter.js

import nodemailer from 'nodemailer'
import dotenv from 'dotenv'

dotenv.config()

const mailTransporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
})

mailTransporter.verify((err, success) => {
  if (err) {
    console.error('MAIL TRANSPORT ERROR:', err)
  } else {
    console.log('MAIL TRANSPORT READY')
  }
})

export default mailTransporter
