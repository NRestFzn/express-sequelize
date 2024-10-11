import cron from 'node-cron'
import { green, blue } from 'colorette'

class sampleJob {
  static getTask() {
    const task = cron.schedule(
      '*/3 * * * *',
      () => {
        console.log(
          `${green('cron')}: Sample job is running for every ${blue(
            '3 minutes'
          )}`
        )
      },
      { timezone: 'Asia/Jakarta' }
    )

    return task
  }
}

module.exports = sampleJob
