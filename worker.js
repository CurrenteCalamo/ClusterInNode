const http = require('http')
const pid = process.pid
const colors = require('colors')
const { connected } = require('process')

const server = http
  .createServer((req, res) => {
    res.end('Hello, from server...')
  })
  .listen(3000, () => {
    console.log(`Worker started. Pid:[${pid}]`.green)
  })

process.on('SIGINT', () => {
  console.log('Signal is SIGINT'.yellow)
  server.close(() => {
    process.exit(0)
  })
})

process.on('SIGTERM', () => {
  console.log('Signal is SIGTERM'.yellow)
  server.close(() => {
    process.exit(0)
  })
})
process.on('SIGUSR2', () => {
  console.log('Signal is SIGUSR2'.yellow)
  server.close(() => {
    process.exit(1)
  })
})
