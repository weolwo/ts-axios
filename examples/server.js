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
  console.log('server----------------', request.body)
  response.json(request.body)
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
// 错误测试
router.get('/error/get', function(req, res) {
  if (Math.random() > 0.5) {
    res.json({
      msg: `hello world`
    })
  } else {
    res.status(500)
    res.end()
  }
})

router.get('/error/timeout', function(req, res) {
  setTimeout(() => {
    res.json({
      msg: `hello world`
    })
  }, 3000)
})

// 接口扩展测试接口
router.get('/extend/get', function(req, res) {
  res.json({
    msg: 'hello world'
  })
})

router.options('/extend/options', function(req, res) {
  res.end()
})

router.delete('/extend/delete', function(req, res) {
  res.end()
})

router.head('/extend/head', function(req, res) {
  res.end()
})

router.post('/extend/post', function(req, res) {
  res.json(req.body)
})

router.put('/extend/put', function(req, res) {
  res.json(req.body)
})

router.patch('/extend/patch', function(req, res) {
  console.log('patch----------', req.body)
  res.json(req.body)
})

router.get('/extend/user', function(req, res) {
  res.json({
    code: 0,
    message: 'ok',
    result: {
      name: 'jack',
      age: 18
    }
  })
})

// 拦截器测试接口
router.get('/interceptor/get', function(req, res) {
  res.end('hello')
})

const port = process.env.PORT || 8088
module.exports = app.listen(port, (err) => {
  if (!err) {
    console.log(`Server listening on http://localhost:${port}, Ctrl+C to stop`)
  }
})
