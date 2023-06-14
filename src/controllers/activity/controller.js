const models = require('../../database/models/index')
const { activities } = models
const router = require('../../router/v1')
const validator = require('../../middleware/validation')
const schema = require('./schema')
const MainMiddleware = require('../../middleware/usermiddleware')
const dateFormater = require('../../helper/DateFormater')
const { Op } = require('sequelize')

router.post(
  '/activity/create',
  MainMiddleware.EnsureTokenPublic,
  validator(schema.createActivity),
  async (req, res) => {
    const { activity, isImportant, activityDate } = req.body
    const user = req.user
    const specifiedTime = dateFormater(activityDate)
    const data = activities.create({
      userId: user.id,
      activity,
      isImportant,
      activityDate: specifiedTime,
    })
    res.status(201).json({ Message: 'activity berhasil dibuat' })
  }
)

router.get(
  '/my-activities',
  MainMiddleware.EnsureTokenPublic,
  async (req, res) => {
    const user = req.user
    const data = await activities.findAll({
      where: { userId: user.id },
    })
    const total = data.length
    res.status(200).json({ Message: 'success', total, data })
  }
)

router.delete(
  '/my-activity/delete/:id',
  MainMiddleware.EnsureTokenPublic,
  async (req, res) => {
    const { id } = req.params
    const user = req.user
    const data = await activities.findOne({
      where: {
        [Op.and]: [{ id }, { userId: user.id }],
      },
    })
    if (!data) {
      return res.status(404).json({ Message: 'activity not found. ' })
    }
    await data.destroy({ force: true })
    res.status(200).json({ Message: 'success' })
  }
)

router.put(
  '/my-activity/update/:id',
  MainMiddleware.EnsureTokenPublic,
  async (req, res) => {
    const { id } = req.params
    const { activity, isImportant, activityDate } = req.body
    const specifiedTime = dateFormater(activityDate)
    const user = req.user
    const data = await activities.findOne({
      where: {
        [Op.and]: [{ id }, { userId: user.id }],
      },
    })
    if (!data) {
      return res.status(404).json({ Message: 'activity not found. ' })
    }
    await data.update({ activity, isImportant, activityDate: specifiedTime })
    res.status(200).json({ Message: 'success' })
  }
)
