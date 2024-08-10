import db from '@database/data-source'

const expressAutoHandlerTransaction = async (req, res, next) => {
  const txn = await db.sequelize.transaction()
  req.transaction = txn

  try {
    await next()
  } catch (error) {
    console.log(error)
    await txn.rollback()

    next(error)
  }
}

module.exports = expressAutoHandlerTransaction
