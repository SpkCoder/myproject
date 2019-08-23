import axios from 'axios'

const instance = axios.create({
        baseURL: '',
        'Access-Control-Allow-Origin': '*',
})
/**
 * 返回拦截器
 */
instance.interceptors.response.use(
    res => {
        // console.log(res)
        return Promise.resolve(res.data)
    },
    err => {
        // console.log(err);
        return Promise.reject(err)
    }
)
const http = {
    request(options) {
        return instance(options)
    },
    get(url, params) {
        return instance.get(url, {
            params: params
        })
    },
    post(url, data) {
        return instance.post(url, data)
    },
    put(url, data) {
        return instance.put(url, data)
    },
    delete(url, data) {
        return instance.delete(url, data)
    }
}

export default http