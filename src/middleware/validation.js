const validate = (schema) => async (req, res, next) => {
  const body = req.body
  try {
    await schema.validate(body)
    return next()
  } catch (err) {
    return res.status(500).json({ type: err.name, message: err.message })
  }
}

module.exports = validate
