import axios from 'axios'
import { Message, MessageBox } from 'element-ui'
import store from '../store'
import { getToken } from '@/utils/auth'

// 创建axios实例
const service = axios.create({
  baseURL: process.env.BASE_API, // api 的 base_url
  timeout: 5000 // 请求超时时间
})

// request拦截器
service.interceptors.request.use(
  config => {
    if (store.getters.token) {
      config.headers['x-access-token'] = getToken() // 让每个请求携带自定义token 请根据实际情况自行修改
    }
    return config
  },
  error => {
    // Do something with request error
    console.log(error) // for debug
    Promise.reject(error)
  }
)

// response 拦截器
service.interceptors.response.use(
  response => {
    /**
     * code为非20000是抛错 可结合自己业务进行修改
     */
    const res = response.data
    if(typeof(res) == "string"){
        if(res == "Success"){
            Message({
              message: res,
              type: 'success',
              duration: 1 * 1000
            });
            return res
        }else{
            Message({
              message: res,
              type: 'error',
              duration: 1 * 1000
            });
            return Promise.reject(res)
        }
    }

    if(typeof(res) == "object" && res.code == 0){
        return res
    }

    if(typeof(res) == "object" && res.meg == "Success"){
        return res
    }

    if(typeof(res) == "object" && res.meg != "Success"){
        Message({
          message: res.meg,
          type: 'error',
          duration: 1 * 1000
        });
        return Promise.reject(res.meg)
    }

  },
  error => {
    console.log('err' + error) // for debug
    Message({
      message: error.message,
      type: 'error',
      duration: 3 * 1000
    })
    return Promise.reject(error)
  }
)

export default service
