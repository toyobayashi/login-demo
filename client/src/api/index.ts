import axios from './axios'

interface ServerResponse<T = any> {
  err: null | string,
  data: T
}

export function register (code: string, pass: string): Promise<ServerResponse<string>> {
  return axios.post('/api/user/create', {
    code,
    pass
  })
}

export function login (code: string, pass: string): Promise<ServerResponse<{ token: string }>> {
  return axios.post('/api/user/login', {
    code,
    pass
  })
}

export function getUserInfo (): Promise<ServerResponse<{ code: string; name: string }>> {
  return axios.get('/api/user/info')
}
