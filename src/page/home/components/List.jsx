import React, { PureComponent } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { ListItem, ListInfo, LoadMore } from '../style'
import { actionCreators } from '../store'
import axios from 'axios'

class List extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {}
    this.source = axios.CancelToken.source()
  }
  render() {
    const { articleList, getMoreList, page } = this.props
    // console.log(articleList);
    return (
      <>
        {articleList.map((item, index) => {
          return (
            <Link to={`/detail/${item.get('id')}`} key={index}>
              <ListItem>
                <img className='list-pic' src={item.get('imgUrl')} alt='' />
                <ListInfo>
                  <h3 className='title'>{item.get('title')}</h3>
                  <p className='desc'>{item.get('desc')}</p>
                </ListInfo>
              </ListItem>
            </Link>
          )
        })}
        <LoadMore onClick={() => getMoreList(page)}>更多文章</LoadMore>
      </>
    )
  }
}

const mapState = state => ({
  articleList: state.getIn(['home', 'articleList']),
  page: state.getIn(['home', 'articlePage'])
})

const mapDispatch = dispatch => ({
  getMoreList(page) {
    dispatch(actionCreators.getMoreList(page))
  }
})

export default connect(mapState, mapDispatch)(List)
