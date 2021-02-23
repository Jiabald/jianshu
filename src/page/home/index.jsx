import React, { PureComponent } from 'react'
// import { Link } from 'react-router-dom'
import { HomeLeft, HomeRigth, HomeWrapper } from './style'
import * as Homes from './components'
import { connect } from 'react-redux'
import { actionCreators } from './store'
import { BackTop } from './style'

class Home extends PureComponent {
	constructor(props) {
		super(props)
		this.state = {
			showBackTopFlag: false
		}
	}
	render() {
		return (
			<>
				<HomeWrapper>
					<HomeLeft>
						<div className='banner-img'></div>
						<Homes.Topic />
						<Homes.List />
					</HomeLeft>
					<HomeRigth>
						<Homes.Recommend />
						<Homes.Writer />
					</HomeRigth>
					{this.showBackTop()}
				</HomeWrapper>
			</>
		)
	}
	componentDidMount() {
		this.props.changHomeData()
		window.addEventListener('scroll',this.scrolldistance)
	}
	handleScrollTop() {
		window.scrollTo(0, 0)
	}
	showBackTop = () => {
		if (this.state.showBackTopFlag) {
			return <BackTop onClick={this.handleScrollTop}>顶部</BackTop>
		}
		return null
	}
	// 监听距离顶部的距离
	scrolldistance = () => {
		// console.log(window.scrollY)
		this.setState({
			showBackTopFlag: window.scrollY < 600 ? false : true
		})
	}
	// 在组建销毁钱清除state
	componentWillUnmount() {
		this.setState = (state, callback) => {
		  return
		}
	  }
}

const mapDispatch = dispatch => ({
	changHomeData() {
		const action = actionCreators.getHomeInfo()
		dispatch(action)
	}
})

export default connect(null, mapDispatch)(Home)
