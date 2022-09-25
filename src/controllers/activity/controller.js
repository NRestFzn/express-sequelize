const models = require('../../database/models/index')
const { activities } = models
const router = require('../../router/v1')
const validator = require('../../middleware/validation')
const schema = require('./schema')
const MainMiddleware = require('../../middleware/usermiddleware')
const dateFormater = require('../../helper/DateFormater')

router.post(
  '/activity',
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
    res.status(201).json({ Message: 'catatan berhasil dibuat' })
  }
)

router.get(
  '/my-activites',
  MainMiddleware.EnsureTokenPublic,
  async (req, res) => {
    const user = req.user
    const data = await activities.findAll({
      where: { userId: user.id },
    })
    const total = data.length
    if (data.length == 0) {
      return res.status(404).json({ Message: `you don't have any activities` })
    }
    res.status(200).json({ Message: 'success', total, data })
  }
)
