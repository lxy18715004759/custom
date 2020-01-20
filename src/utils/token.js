
const setToken = (token, expire) => {
  localStorage.setItem('token', `bearer ${token}`)
  localStorage.setItem('token_expire', expire)
}

const setRefreshToken = (token) => {
  localStorage.setItem('refresh_token', token)
}

const getToken = () => {
  return localStorage.getItem('token') || ''
}

const getRefreshToken = () => {
  return localStorage.getItem('refresh_token') || ''
}

const getTokenExpire = () => {
  return parseInt(localStorage.getItem('token_expire') || 0)
}

const removeToken = () => {
  localStorage.removeItem("token")
  localStorage.removeItem("token_expire")
  localStorage.removeItem("refresh_token")
}

export {
  setToken,
  setRefreshToken,
  getToken,
  getRefreshToken,
  getTokenExpire,
  removeToken
}