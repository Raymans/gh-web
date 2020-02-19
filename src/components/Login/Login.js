/* eslint no-unused-vars: 0 */

import { navigateTo } from 'gatsby-link'
import { Button, Checkbox, Form, Icon, Input } from 'antd'
import PropTypes from 'prop-types'
import React from 'react'
import { AuthConsumer } from 'react-check-auth'
import { ThemeContext } from '../../layouts'
import { login } from '../../utils/api'
import styled, { createGlobalStyle } from 'styled-components'

const FormItem = Form.Item
const {TextArea} = Input


const Login = props => {
  const {getFieldDecorator} = props.form

  const StyledLoginButton = styled(Button)`
    width: 100%;
  `
  const StyledForgetLink = styled.a`
    float: right;
  `

  function encode(data){
    return Object.keys(data)
    .map(key => encodeURIComponent(key) + '=' + encodeURIComponent(data[key]))
    .join('&')
  }

  const handleSubmit = (e, refreshAuth) => {
    e.preventDefault()
    props.form.validateFieldsAndScroll((err, values) => {
      if(!err) {
        sendMessage(values).then(() => {

          navigateTo('/')
          refreshAuth({userName: 'raymans'})
        })
      }
    })
  }

  function sendMessage(values){
    return login(values).then((user) => {
      console.log('Form submission success', user)
      //
    }).catch(error => {
      console.error('Form submission error:', error)
    })
  }

  return (
    <React.Fragment>
      <div className="form">
        <ThemeContext.Consumer>
          {theme => {
            const GlobalStyle = createGlobalStyle`
                @media (min-width: 1024px) {
                .article {
                  max-width: ${theme.text.maxWidth.desktopForm} !important;
                }
              }
            `
            return (
              <AuthConsumer>
                {({refreshAuth}) => (
                  <Form onSubmit={(e) => handleSubmit(e, refreshAuth)}>
                    <GlobalStyle/>
                    <FormItem>
                      {getFieldDecorator('username', {
                        rules: [{required: true, message: 'Please input your username!'}]
                      })(
                        <Input prefix={<Icon type="user" style={{color: 'rgba(0,0,0,.25)'}}/>} placeholder="Username"/>
                      )}
                    </FormItem>
                    <FormItem>
                      {getFieldDecorator('password', {
                        rules: [{required: true, message: 'Please input your Password!'}]
                      })(
                        <Input prefix={<Icon type="lock" style={{color: 'rgba(0,0,0,.25)'}}/>} type="password"
                               placeholder="Password"/>
                      )}
                    </FormItem>
                    <FormItem>
                      {getFieldDecorator('remember', {
                        valuePropName: 'checked',
                        initialValue: true
                      })(
                        <Checkbox>Remember me</Checkbox>
                      )}
                      <StyledForgetLink href="">Forgot password</StyledForgetLink>
                      <StyledLoginButton type="primary" htmlType="submit">
                        Log in
                      </StyledLoginButton>
                      Or <a href="/register/">register now!</a>
                    </FormItem>
                  </Form>
                )}
              </AuthConsumer>
            )
          }}

        </ThemeContext.Consumer>
      </div>
    </React.Fragment>
  )
}

Login.propTypes = {
  form: PropTypes.object
}

const LoginForm = Form.create({})(Login)

export default LoginForm
