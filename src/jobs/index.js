import sampleJob from './sampleJob'

class Jobs {
  static initialize() {
    this.sampleJob()
  }

  static sampleJob() {
    const getTask = sampleJob.getTask()

    getTask.start()
  }
}

module.exports = Jobs
