import axios from 'axios'
import { constants } from './index'

const changeLogin = () => ({
  type: constants.CHANGE_LOGIN,
  value: true
})

export const login = (account, password) => {
  return dispatch => {
    axios
      .get(`/api/login.json?account=${account}&password=${password}`)
      .then(res => {
        const result = res.data.data
        if (result) {
          dispatch(changeLogin())
        }
      })
      .catch(err => {
        console.log(err)
      })
  }
}

export const LoginOut = () => ({
  type: constants.LOGINOUT,
  value: false
})
