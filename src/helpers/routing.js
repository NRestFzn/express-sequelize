import fs from 'fs'
import path from 'path'
import { cyan } from 'colorette'

var filename = path.basename(__filename)
const ext = `.${filename.split('.').pop()}`

module.exports = (basePath) => {
  const msgType = 'Route'
  // loop main controller directory
  return fs.readdirSync(basePath).forEach((file) => {
    // read controller on main controller directory
    const getController = `${basePath}/${file}/controller`

    // check sub dir controller exists
    if (!fs.existsSync(`${getController}${ext}`)) {
      const subDir = `${basePath}/${file}`

      // loop sub directory controller
      fs.readdirSync(subDir).forEach((subFile) => {
        // read controller
        const getSubController = `${subDir}/${subFile}/controller`

        // check sub-sub dir controller exists
        if (fs.existsSync(`${getSubController}${ext}`)) {
          const sub2Dir = `${basePath}/${file}/${subFile}`
          // loop sub directory
          fs.readdirSync(sub2Dir).forEach((sub2File) => {
            // read controller
            const getSub2Controller = `${sub2Dir}/${sub2File}/controller`

            // check sub dir controller exists
            if (fs.existsSync(`${getSub2Controller}${ext}`)) {
              const routeSub2Dir = cyan(`${file}/${subFile}/${sub2File}`)
              const message = `Controller ${routeSub2Dir} Registered`

              console.log(message)

              // require controller
              require(getSub2Controller)
            }
          })
        }

        // check sub dir controller exists
        if (fs.existsSync(`${getSubController}${ext}`)) {
          const routeSubDir = cyan(`${file}/${subFile}`)
          const message = `Controller ${routeSubDir} Registered`

          console.log(message)

          // require controller
          require(getSubController)
        }
      })
    } else {
      const routeDir = cyan(file)
      const message = `Controller ${routeDir} Registered`

      console.log(message)

      // require controller
      require(getController)
    }
  })
}
