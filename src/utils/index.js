import axios from 'axios'
import router from '../router'
import { Message } from 'element-ui'
const baseURL = '/api/admin'

const instance = axios.create({
  baseURL
  // timeout: 1800000
})

const getDate = {
  get (url, data, config) {
    return new Promise((resolve, reject) => {
      instance.get(url, { params: data }, config).then(res => {
        if (res.data.code === 401) {
          Message.error('登录信息已失效，正在为您跳转登陆页面')
          setTimeout(() => {
            router.push('/')
          }, 1000)
        }
        resolve(res)
      }).catch(err => {
        reject(err)
      })
    })
  },
  post (url, data, config) {
    return new Promise((resolve, reject) => {
      instance.post(url, data, config).then(res => {
        if (res.data.code === 401) {
          Message.error('登录信息已失效，正在为您跳转登陆页面')
          setTimeout(() => {
            router.push('/')
          }, 1000)
        }
        resolve(res.data)
      }).catch(err => {
        reject(err)
      })
    })
  },
  send (url, data, config, type) {
    return new Promise((resolve, reject) => {
      instance[type](url, data, config).then(res => {
        if (res.code === 401) {
          Message.error('登录信息已失效，正在为您跳转登陆页面')
          setTimeout(() => {
            router.push('/')
          }, 1000)
        }
        resolve(res.data)
      }).catch(err => {
        reject(err)
      })
    })
  },
  put (url, data, config) {
    return this.send(url, data, config, 'put')
  },
  delete (url, data, config) {
    return this.send(url, data, config, 'delete')
  }
}

export const $axios = getDate
