import fs from 'fs'
import path from 'path'
import handlebars from 'handlebars'
import nodemailer from 'nodemailer'
import getEnv from '@config/env.config'

const TEMPLATE_REGISTER_ACCOUNT = path.join(
  __dirname,
  '../template/registerAccount.html'
)

const transporter = nodemailer.createTransport({
  service: getEnv.MAIL_SERVICE,
  // host: getEnv.MAIL_HOST,
  // port: getEnv.MAIL_PORT,
  auth: {
    user: getEnv.MAIL_USERNAME,
    pass: getEnv.MAIL_PASSWORD,
  },
})

async function registerAccount(email, fullname) {
  const source = fs.readFileSync(path.resolve(TEMPLATE_REGISTER_ACCOUNT), {
    encoding: 'utf-8',
  })
  const template = handlebars.compile(source)

  const data = {
    fullname,
  }

  const htmlToSend = template(data)

  try {
    const info = await transporter.sendMail({
      from: getEnv.APP_NAME,
      to: email,
      subject: 'Register Account',
      html: htmlToSend,
    })

    console.log('Message sent: %s', info.messageId)
  } catch (error) {
    console.log(error.message)
  }
}

const sendMail = {
  registerAccount,
}

module.exports = sendMail
