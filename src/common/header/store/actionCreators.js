import * as constants from './constants'
import { fromJS } from 'immutable'
import axios from 'axios'

const chageList = data => ({
	type: constants.CHAGE_LIST,
	data: fromJS(data),
	totalPage: Math.ceil(data.length / 10)
})

// 生成类型
export const searchFocus = () => ({
	type: constants.SEARCH_FOCUS
})

export const searchBlur = () => ({
	type: constants.SEARCH_BLUR
})

export const mouseEnter = () => ({
	type: constants.MOUSE_ENTER
})

export const mouseLeave = () => ({
	type: constants.MOUSE_LEAVE
})

export const changePageList = page => ({
	type: constants.CHANGE_PAGE_LIST,
	page
})

export const getList = () => {
	return dispatch => {
		axios
			.get('api/headerList.json')
			.then(res => {
				dispatch(chageList(res.data.data))
			})
			.catch(err => {
				console.log(err, 'err')
			})
	}
}
