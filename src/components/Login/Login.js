/* eslint no-unused-vars: 0 */

import { navigateTo } from 'gatsby-link';
import { Form, Icon as LegacyIcon } from '@ant-design/compatible';
import '@ant-design/compatible/assets/index.css';
import { Button, Checkbox, Input } from 'antd';
import PropTypes from 'prop-types';
import React from 'react';
import styled, { createGlobalStyle } from 'styled-components';

const FormItem = Form.Item;
const { TextArea } = Input;

const StyledLoginButton = styled(Button)`
    width: 100%;
  `;
const StyledForgetLink = styled.a`
    float: right;
  `;
const Login = (props) => {
  function encode(data) {
    return Object.keys(data)
      .map((key) => `${encodeURIComponent(key)}=${encodeURIComponent(data[key])}`)
      .join('&');
  }

  const handleSubmit = (e, refreshAuth) => {
    e.preventDefault();
    props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        sendMessage(values).then(() => {
          navigateTo('/');
          refreshAuth({ userName: 'raymans' });
        });
      }
    });
  };

  function sendMessage(values) {
    // return login(values).then((user) => {
    //   console.log('Form submission success', user);
    //   //
    // }).catch((error) => {
    //   console.error('Form submission error:', error);
    // });
  }

  return (
    <>
      <div className="form">
        <Form onSubmit={(e) => handleSubmit(e)}>
          <FormItem name="username" rules={[{ required: true, message: 'Please input your username!' }]}>
            <Input prefix={<LegacyIcon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Username" />
          </FormItem>
          <FormItem name="password" rules={[{ required: true, message: 'Please input your Password!' }]}>
            <Input
              prefix={<LegacyIcon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
              type="password"
              placeholder="Password"
            />
          </FormItem>
          <FormItem name="remember">
            <Checkbox>Remember me</Checkbox>
            <StyledForgetLink href="">Forgot password</StyledForgetLink>
            <StyledLoginButton type="primary" htmlType="submit">
              Log in
            </StyledLoginButton>
            Or
            {' '}
            <a href="/register/">register now!</a>
          </FormItem>
        </Form>
      </div>
    </>
  );
};

Login.propTypes = {
  form: PropTypes.object,
};

export default Login;
