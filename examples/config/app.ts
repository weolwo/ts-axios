import axios from '../../src/index'
import qs from 'QueryString'
import { AxiosTransformer } from '../../src/types'

axios.defaults.headers.common['test2'] = 123

/*axios({
  url: '/config/post',
  method: 'post',
  // 此处安装qs还需要安装他的类型定义文件@types/qs
  data: qs.stringify({
    a: 1
  }),
  headers: {
    test: '321'
  }
}).then((res) => {
  console.log(res.data)
})*/

// 请求和响应的配置化测试用例
axios({
  transformRequest: [(function(data) {
    return qs.stringify(data)
  }), ...(axios.defaults.transformRequest as AxiosTransformer[])
  ],
  transformResponse: [...(axios.defaults.transformResponse as AxiosTransformer[]), function(data) {
    if (typeof data === 'object') {
      data.result.name = 'Tom'
    }
    return data
  }],
  url: '/config/post',
  method: 'post',
  data: {
    a: 1
  }
}).then((res) => {
  console.log(res.data)
})
