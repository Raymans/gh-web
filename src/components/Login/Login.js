/* eslint no-unused-vars: 0 */

import { navigateTo } from "gatsby-link";
import { Form, Icon, Input, Button, Checkbox } from 'antd';
import PropTypes from "prop-types";
import React from "react";
import { AuthConsumer } from "react-check-auth";
const FormItem = Form.Item;
const { TextArea } = Input;
import { ThemeContext } from "../../layouts";
import {login} from '../../utils/api';


const Login = props => {
  const { getFieldDecorator } = props.form;

  function encode(data) {
    return Object.keys(data)
      .map(key => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
      .join("&");
  }

  const handleSubmit = (e, refreshAuth) => {
    e.preventDefault();
    props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        sendMessage(values).then(() => {
          refreshAuth({userName: 'raymans'});
          navigateTo("/");
        });
      }
    });
  };

  function sendMessage(values) {
    return login(values).then((user) => {
      console.log('Form submission success', user);
      //
    }).catch(error => {
      console.error('Form submission error:', error);
    });
  }

  return (
    <React.Fragment>
      <div className="form">
        <ThemeContext.Consumer>
          {theme => (
            <AuthConsumer>
              {({ refreshAuth }) => (
                <Form onSubmit={(e) => handleSubmit(e, refreshAuth)} className="login-form">
                  <FormItem>
                    {getFieldDecorator('username', {
                      rules: [{ required: true, message: 'Please input your username!' }],
                    })(
                      <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Username" />
                    )}
                  </FormItem>
                  <FormItem>
                    {getFieldDecorator('password', {
                      rules: [{ required: true, message: 'Please input your Password!' }],
                    })(
                      <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" />
                    )}
                  </FormItem>
                  <FormItem>
                    {getFieldDecorator('remember', {
                      valuePropName: 'checked',
                      initialValue: true,
                    })(
                      <Checkbox>Remember me</Checkbox>
                    )}
                    <a className="login-form-forgot" href="">Forgot password</a>
                    <Button type="primary" htmlType="submit" className="login-form-button">
                      Log in
                    </Button>
                    Or <a href="/register/">register now!</a>
                  </FormItem>
                  <style jsx>{`
                    :global(.login-form-button) {
                      width: 100%;
                    }

                      .login-form {
                        max-width: 300px;
                      }
                      .login-form-forgot {
                        float: right;
                      }
                  `}</style>
                </Form>
              )}
            </AuthConsumer>
          )}
        </ThemeContext.Consumer>
      </div>
    </React.Fragment>
  );
};

Login.propTypes = {
  form: PropTypes.object
};

const LoginForm = Form.create({})(Login);

export default LoginForm;
