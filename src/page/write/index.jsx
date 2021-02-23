import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

class Write extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }
  render() {
    const { loginStatus } = this.props 
    // console.log(loginStatus);
    if(!loginStatus){
      return <Redirect to='/login' />
    }
    return (
      <>
        <h1>写文章</h1>
      </>
    )
  }
  // login = (account, password) => {
  //   console.log(account.value, password.value)
  // }
}

const mapState = state => ({
  loginStatus:state.getIn(['login','login'])
})


export default connect(mapState, null)(Write)
