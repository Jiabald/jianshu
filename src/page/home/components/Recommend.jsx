import React, { PureComponent } from 'react'
import { RecommendWrapper, RecommendItem } from '../style'
import { connect } from 'react-redux'

class Recommen extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {}
  }
  render() {
    const { imgList } = this.props
    // console.log(imgList);
    return (
      <RecommendWrapper>
        {imgList.map(item => (
          <RecommendItem imgUrl={item.get('imgUrl')} key={item.get('id')} />
        ))}
      </RecommendWrapper>
    )
  }
}

const setState = state => ({
  imgList: state.getIn(['home', 'imgList'])
})

export default connect(setState, null)(Recommen)
