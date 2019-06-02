import axios from 'axios'
import store from '../store'

axios.defaults.baseURL = 'http://127.0.0.1:8093'
// axios.defaults.headers.Accept = 'application/json;charset=utf-8'
// axios.defaults.headers['Content-Type'] = 'application/json'

axios.interceptors.request.use(config => {
  // config.headers['Content-Type'] = 'application/json;charset=utf-8'
  // if (config.method === 'post' || config.method === 'put' || config.method === 'patch') {
  //   config.transformRequest = [
  //     data => JSON.stringify(data)
  //   ]
  // }
  if (store.state.token !== '') {
    config.headers['X-Access-Token'] = store.state.token
  }

  return config
})

axios.interceptors.response.use((res) => {
  return res.data
})

export default axios
