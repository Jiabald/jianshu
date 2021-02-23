import { fromJS } from 'immutable'
import { constants } from './index'

const defaultState = fromJS({
	topicList: [],
	articleList: [],
	imgList: [],
	articlePage: 1
})

export default (state = defaultState, action) => {
	switch (action.type) {
		case 'change_home_data':
			return state.merge({
				topicList: fromJS(action.topicList),
				articleList: fromJS(action.articleList),
				imgList: fromJS(action.imgList)
			})
		case constants.ADD_ARTICLE_LIST:
			return state.merge({
				articleList: state.get('articleList').concat(action.list),
				articlePage: action.nextPage
			})
		default:
			return state
	}
}
