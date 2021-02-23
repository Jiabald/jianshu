import Axios from 'axios'
import { constants } from './index'
import { fromJS } from 'immutable'

const changeHomeData = result => ({
	type: 'change_home_data',
	articleList: result.articleList,
	imgList: result.imgList,
	topicList: result.topicList
})

const addHomeList = (list, nextPage) => ({
	type: constants.ADD_ARTICLE_LIST,
	list: fromJS(list),
	nextPage
})

export const getHomeInfo = () => {
	return dispatch => {
		Axios.get('api/homeData.json').then(res => {
			const result = res.data.data
			const action = changeHomeData(result)
			dispatch(action)
		})
	}
}

export const getMoreList = page => {
	return dispatch => {
		Axios.get(`api/homeMoreList.json?page=${page}`).then(res => {
			const result = res.data.data
			dispatch(addHomeList(result, page + 1))
		})
	}
}
