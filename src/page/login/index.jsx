import React, { Component } from 'react'
import { connect } from 'react-redux'
import { LoginWrapper, LoginBox, Input, Button } from './style'
import { actionCreators } from './store'
import { Redirect } from 'react-router-dom'

class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }
  render() {
    const { loginStatus } = this.props 
    // console.log(loginStatus)
    if(loginStatus){
      return <Redirect to='/' />
    }
    return (
      <>
        <LoginWrapper>
          <LoginBox>
            <Input
              placeholder='账号'
              ref={input => {
                this.account = input
              }}
            />
            <Input
              placeholder='密码'
              type='password'
              ref={input => {
                this.password = input
              }}
            />
            <Button
              onClick={() => this.props.login(this.account, this.password)}>
              登录
            </Button>
          </LoginBox>
        </LoginWrapper>
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

const mapDispatch = dispatch => ({
  login(accountElen, passwordElen) {
    dispatch(actionCreators.login(accountElen.value, passwordElen.value))
    // console.log(accountElen.value,passwordElen.value);
  }
})

export default connect(mapState, mapDispatch)(Login)
