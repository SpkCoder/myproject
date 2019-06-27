import axios from 'axios'
let baseUrl = "";
switch (process.env.NODE_ENV) {
    case 'development':
        baseUrl = "http://192.168.40.236:2234" //这里是本地的请求url
        break
    case 'production':
        baseUrl = "http://api.ottmon.com:2234" //这里是本地的请求url
        break
    case 'test':
        baseUrl = "http://api.hz.ottmon.com:49994"
        break
}
const instance = axios.create({
        baseURL: baseUrl,
        'Access-Control-Allow-Origin': '*',
    })
    /**
     * 返回拦截器
     */
instance.interceptors.response.use(
    res => {
        console.log(res)
        return Promise.resolve(res.data.data)
    },
    err => {
        console.log(err);
        return Promise.reject(err)
    }
)
const http = {
    request(options) {
        return instance(options)
    },
    get(url, params) {
        return instance.get(url, {
            params
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
    },
    baseurl: baseUrl
}

export default http