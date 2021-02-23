import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { TopicWrapper, TopicItem } from '../style'

class Topic extends PureComponent {
	constructor(props) {
		super(props)
		this.state = {}
	}
	render() {
		const { list } = this.props
		// console.log(list)
		return (
			<>
				<TopicWrapper>
					{list.map(item => {
						return (
							<TopicItem key={item.get('id')}>
								<span className='topic-pic'></span>
								{item.get('title')}
							</TopicItem>
						)
					})}
					{/* <TopicItem>
					<span className="topic-pic"></span>
					社会教育
				</TopicItem> */}
				</TopicWrapper>
			</>
		)
	}
}

const mapState = state => ({
	list: state.getIn(['home', 'topicList'])
})

export default connect(mapState, null)(Topic)
