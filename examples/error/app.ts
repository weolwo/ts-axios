import axios from '../../src/index'
import { AxiosError } from '../../src/axios'

axios({
  method: 'get',
  url: '/error/get1'
}).then((res) => {
  console.log(res)
}).catch((e) => {
  console.log(e)
})

axios({
  method: 'get',
  url: '/error/get'
}).then((res) => {
  console.log(res)
}).catch((e) => {
  console.log(e)
})

setTimeout(() => {
  axios({
    method: 'get',
    url: '/error/get'
  }).then((res) => {
    console.log(res)
  }).catch((e) => {
    console.log(e)
  })
}, 7000)

axios({
  method: 'get',
  url: '/error/timeout',
  timeout: 2000
}).then((res) => {
  console.log(res)
}).catch((e) => {
  console.log(e.message)
})

// 测试错误信息增强
axios({
  method: 'get',
  url: '/error/timeout',
  timeout: 2000
}).then((res) => {
  console.log(res)
}).catch((e: AxiosError) => {
  console.log(e.message)
  console.log(e.code)
  console.log(e.response)
  console.log(e.config)
})
