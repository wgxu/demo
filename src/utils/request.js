import axios from "axios"
import store from '@/stores/index'
import { setToken } from '@/stores/token'
import { message } from "antd"
const FILE_TYPE = ['application/force-download', 'application/octet-stream', 'application/vnd.ms-excel', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet']

const service = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  timeout: 15000,
  headers: {
    'Cache-Control': 'no-cache',
    'If-Modified-Since': '0'
  }
})

service.interceptors.request.use(
  config => {
    if (store.getState()?.token?.value) {
      config.headers.Authorization = `Bearer ${store.getState()?.token?.value}`
    }
    return config
  },
  error => {
    console.log(error, 'request interceptors error')
    return Promise.reject(error)
  }
)

service.interceptors.response.use(response => {
  // response里的status,config,headers等可做网络相关判断
  // response.data里的做业务相关的判断
  const res = response.data
  if (res.code === 200) {
    // res.data 是业务数据体
    return res.data
  } else if (FILE_TYPE.includes(res.type)) {
    return response
  } else if (res.code === 401) {
    store.dispatch(setToken(''))
    window.location.reload()
  } else if (res.code === 10009) {
    console.log(res.message)
    // 不弹出全局信息，交由页面业务处理
  } else {
    console.log(res.message)
    message.error(res.message)
  }
  return Promise.reject(res)
}, error => {
  console.dir('interceptors err' + error) // for debug
  store.dispatch(setToken(''))
  // window.location.reload()
  return Promise.reject(error)
})

export default service