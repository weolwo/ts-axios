const express = require('express')
const bodyParser = require('body-parser')
const webpack = require('webpack')
const webpackDevMiddleware = require('webpack-dev-middleware')
const webpackHotMiddleware = require('webpack-hot-middleware')
const WebpackConfig = require('./webpack.config')

const app = express()
const compiler = webpack(WebpackConfig)
const router = express.Router()
app.use(webpackDevMiddleware(compiler, {
  publicPath: '/__build__/',
  stats: {
    colors: true,
    chunks: false
  }
}))

app.use(webpackHotMiddleware(compiler))

app.use(express.static(__dirname))

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(router)

router.get('/simple/get', (request, response) => {
  response.json({
    message: 'Hello World'
  })
})

router.get('/base/get', (request, response) => {
  response.json(request.query)
})

router.post('/base/post', (request, response) => {
  response.json(request.query)
})

router.post('/base/buffer', (request, response) => {
  let msg = []
  request.on('data', (chunk) => {
    if (chunk) {
      msg.push(chunk)
    }
  })
  request.on('end', () => {
    let buf = Buffer.concat(msg)
    response.json(buf.toJSON())
  })
})
const port = process.env.PORT || 8088
module.exports = app.listen(port, (err) => {
  if (!err) {
    console.log(`Server listening on http://localhost:${port}, Ctrl+C to stop`)
  }
})
