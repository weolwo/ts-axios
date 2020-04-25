import axios from '../../src/index'
import qs from 'QueryString'

axios.defaults.headers.common['test2'] = 123

axios({
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
})
