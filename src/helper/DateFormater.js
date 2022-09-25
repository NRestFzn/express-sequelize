const dateFormater = (inputDate) => {
  const options = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }
  //   const localeDate = new Date().toLocaleDateString('id', options)
  const specifiedTime = new Date(inputDate).toLocaleDateString('id', options)
  return specifiedTime
}

module.exports = dateFormater
