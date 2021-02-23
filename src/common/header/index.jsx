import React from 'react'
import { connect } from 'react-redux'
import {
  HeaderWRapper,
  Logo,
  Nav,
  NavItem,
  NavSearch,
  Addition,
  Button,
  SearchWrapper,
  SearchInfo,
  SearchInfoTitle,
  SearchInfoSwitch,
  SearchInfoItem,
  SearchInfoList
} from './style'
import { CSSTransition } from 'react-transition-group'

import { actionCreators } from './store'
import { actionCreators as loginActionCreators } from '../../page/login/store'
import { Link } from 'react-router-dom'


class Header extends React.Component {
  render() {
    const {
      focused,
      handleInpuFocus,
      handleInpuBlur,
      list,
      login,
      loginOut
    } = this.props
    return (
      <>
        <HeaderWRapper>
          <Link to='/'>
            <Logo />
          </Link>
          <Nav>
            <NavItem className='left active'>首页</NavItem>
            <NavItem className='left'>下载App</NavItem>

            {login ? (
              <NavItem onClick={loginOut} className='right'>
                退出
              </NavItem>
            ) : (
              <Link to='/login'>
                <NavItem className='right'>登录</NavItem>
              </Link>
            )}

            <NavItem className='right'>Aa</NavItem>
            {/* 搜索 */}
            <SearchWrapper>
              {/* 当focused为true拥有focused属性 */}
              <CSSTransition in={focused} timeout={200} classNames='slide'>
                <NavSearch
                  className={focused ? 'focused' : ''}
                  onFocus={() => handleInpuFocus(list)}
                  onBlur={handleInpuBlur}
                />
              </CSSTransition>
              <i className={focused ? 'iconfont focused' : 'iconfont'}>
                &#xe623;
              </i>
              {/* 显示搜索推荐框 */}
              {this.getListArea(focused)}
            </SearchWrapper>
          </Nav>
          <Addition>
            <Link to='/write'>
              <Button className='writting'>
                <i className='iconfont'>&#xe6e5;</i>
                写文章
              </Button>
            </Link>
            <Button className='reg'>注册</Button>
          </Addition>
        </HeaderWRapper>
      </>
    )
  }

  getListArea = () => {
    const {
      list,
      focused,
      page,
      mouseIn,
      totalPage,
      handelMouseEnter,
      handelMouseLeave,
      handelChangePage
    } = this.props
    // console.log(this.props)
    const newList = list.toJS()
    const pageList = []

    if (newList.length) {
      // 最后一页个数
      const lastPageNum = newList.length % 10
      // 整数页的个数
      const integerPage = parseInt(newList.length / 10)

      if (page > integerPage) {
        for (let i = (page - 1) * 10; i < (page - 1) * 10 + lastPageNum; i++) {
          pageList.push(
            // 不支持 list[i]的形式 提供toJS() 方法
            <SearchInfoItem key={newList[i]}>{newList[i]}</SearchInfoItem>
          )
        }
      } else {
        for (let i = (page - 1) * 10; i < page * 10; i++) {
          pageList.push(
            // 不支持 list[i]的形式 提供toJS() 方法
            <SearchInfoItem key={newList[i]}>{newList[i]}</SearchInfoItem>
          )
        }
      }
    }

    if (focused || mouseIn) {
      return (
        <SearchInfo
          onMouseEnter={handelMouseEnter}
          onMouseLeave={handelMouseLeave}>
          <SearchInfoTitle>
            热门搜索
            <SearchInfoSwitch onClick={() => handelChangePage(page, totalPage)}>
              换一批
            </SearchInfoSwitch>
          </SearchInfoTitle>
          <SearchInfoList>
            {/* {list.map(item => {
							return <SearchInfoItem key={item}>{item}</SearchInfoItem>
						})} */}
            {pageList}
          </SearchInfoList>
        </SearchInfo>
      )
    }
    return null
  }
}

const mapStateToProps = state => {
  return {
    // focused: state.get('header').get('focused')
    focused: state.getIn(['header', 'focused']),
    list: state.getIn(['header', 'list']),
    page: state.getIn(['header', 'page']),
    mouseIn: state.getIn(['header', 'mouseIn']),
    totalPage: state.getIn(['header', 'totalPage']),
    login: state.getIn(['login', 'login'])
  }
}

const mapDispatchToProps = dispatch => {
  return {
    handleInpuFocus(list) {
      console.log(list)
      list.size === 0 && dispatch(actionCreators.getList())
      dispatch(actionCreators.searchFocus())
    },
    handleInpuBlur() {
      dispatch(actionCreators.searchBlur())
    },
    handelMouseEnter() {
      dispatch(actionCreators.mouseEnter())
    },
    handelMouseLeave() {
      dispatch(actionCreators.mouseLeave())
    },
    // totalPage 总页码
    handelChangePage(page, totalPage) {
      // console.log(page, totalPage)
      if (page < totalPage) {
        dispatch(actionCreators.changePageList(page + 1))
      } else {
        dispatch(actionCreators.changePageList(1))
      }
    },
    loginOut() {
      dispatch(loginActionCreators.LoginOut())
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header)
