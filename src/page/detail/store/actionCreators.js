import Axios from 'axios'
import { constants } from './index'

const changeDetail = (title, content) => ({
  type: constants.CHANGE_DETAIL,
  title,
  content
})

export const getDetail = id => {
  return dispatch => {
    Axios.get(`/api/detail.json?id=${id}`)
      .then(res => {
        const result = res.data.data[0]
        // console.log(result)
        dispatch(changeDetail(result.title, result.content))
      })
      .catch(err => {
        console.log(err)
      })
  }
}
