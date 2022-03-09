const cluster = require('cluster')
const os = require('os')
const colors = require('colors')

const pid = process.pid

if (cluster.isMaster) {
  const CountCpus = os.cpus().length

  console.log(`CPUs [ ${CountCpus} ]`.yellow)
  console.log(`Master started. Pid:[${pid}]`.green)

  for (let i = 0; i < CountCpus; i++) {
    const worker = cluster.fork()
  }
  cluster.on('exit', (worker, code) => {
    console.log(`Worker Pid:[${worker.process.pid}] died! Code:${code}`.red)
    if (code === 1) {
      cluster.fork()
    }
  })
}
if (cluster.isWorker) {
  require('./worker.js')
}
