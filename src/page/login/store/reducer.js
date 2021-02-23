import { fromJS } from 'immutable'
import { constants } from '.'
// import { constants } from './index'

const defaultState = fromJS({
  login: false
})

export default (state = defaultState, actions) => {
  switch (actions.type) {
    case constants.CHANGE_LOGIN:
      return state.set('login', actions.value)
    case constants.LOGINOUT:
      return state.set('login', actions.value)
    default:
      return state
  }
}
