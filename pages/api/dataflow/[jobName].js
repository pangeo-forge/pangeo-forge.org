const { Logging } = require('@google-cloud/logging')
const logging = new Logging()

const projectName = 'projects/pangeo-forge-4967'
const logName = projectName + '/logs/dataflow.googleapis.com%2Fjob-message'

export default async function handler(req, res) {
  const { jobName, startTime, stopTime, severity } = req.query

  /* e.g., this works:
      http://localhost:3000/api/dataflow/wordcount-example-0?
      startTime="2022-06-01T19:23:26.133337225Z"
      &stopTime="2022-06-01T19:23:29.133337225Z"
      &severity=INFO
  */

  const options = {
    resourceNames: ['projects/pangeo-forge-4967'],
    filter:
      'resource.type = dataflow_step' +
      ' AND logName = ' +
      logName +
      ' AND resource.labels.job_name = ' +
      jobName +
      ' AND timestamp > ' +
      startTime +
      ' AND timestamp < ' +
      stopTime +
      ' AND severity = ' +
      severity,
  }

  try {
    ////

    const [entries] = await logging.getEntries(options)
    const reduction = entries.map((entry) => ({
      timestamp: entry.metadata.timestamp,
      severity: entry.metadata.severity,
      textPayload: entry.metadata.textPayload,
    }))

    /////

    res.status(200).json(reduction)
  } catch (err) {
    console.log(err)
    res.status(500).json(JSON.stringify(err))
  }
}
