const fs = require('fs')
const path = require('path')
const { green, blue } = require('colorette')

const getUniqueCodev2 = (length = 32) => {
  let result = ''
  const characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  const charactersLength = characters.length
  for (let i = 0; i < length; i += 1) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength))
  }
  return result
}

function accessTokenJWT() {
  const pathRes = path.resolve('.env')
  const contentEnv = fs.readFileSync(pathRes, { encoding: 'utf-8' })
  const jwtSecret = getUniqueCodev2()
  const strJWT = `JWT_SECRET_ACCESS_TOKEN=${jwtSecret}`

  if (contentEnv.includes('JWT_SECRET_ACCESS_TOKEN=')) {
    const replaceContent = contentEnv.replace(
      /JWT_SECRET_ACCESS_TOKEN=(.*)?/,
      strJWT
    )
    fs.writeFileSync(`${pathRes}`, replaceContent)
    console.log(`${green('Refresh')} ${blue('JWT SECRET')} ${green('Success')}`)
  } else {
    const extraContent = `${strJWT}\n\n${contentEnv}`
    fs.writeFileSync(`${pathRes}`, extraContent)
    console.log(
      `${green('Generate')} ${blue('JWT SECRET')} ${green('Success')}`
    )
  }
}

function refreshTokenJWT() {
  const pathRes = path.resolve('.env')
  const contentEnv = fs.readFileSync(pathRes, { encoding: 'utf-8' })
  const jwtSecret = getUniqueCodev2()
  const strJWT = `JWT_SECRET_REFRESH_TOKEN=${jwtSecret}`

  if (contentEnv.includes('JWT_SECRET_REFRESH_TOKEN=')) {
    const replaceContent = contentEnv.replace(
      /JWT_SECRET_REFRESH_TOKEN=(.*)?/,
      strJWT
    )
    fs.writeFileSync(`${pathRes}`, replaceContent)
    console.log(
      `${green('Refresh')} ${blue('JWT SECRET REFRESH TOKEN')} ${green(
        'Success'
      )}`
    )
  } else {
    const extraContent = `${strJWT}\n\n${contentEnv}`
    fs.writeFileSync(`${pathRes}`, extraContent)
    console.log(
      `${green('Generate')} ${blue('JWT SECRET')} ${green('Success')}`
    )
  }
}

accessTokenJWT()
refreshTokenJWT()
