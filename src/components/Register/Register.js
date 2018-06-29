/* eslint no-unused-vars: 0 */

import { navigateTo } from "gatsby-link";
import { Form, Input, Tooltip, Icon, Cascader, Select, Row, Col, Checkbox, Button, AutoComplete } from 'antd';

import PropTypes from "prop-types";
import React from "react";

import {signup} from '../../utils/api';

const FormItem = Form.Item;
const Option = Select.Option;
const AutoCompleteOption = AutoComplete.Option;
import 'antd/dist/antd.css';
import { ThemeContext } from "../../layouts";



const Register = props => {
  const { getFieldDecorator } = props.form;

  const formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 8 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 16 },
    },
  };
  const tailFormItemLayout = {
    wrapperCol: {
      xs: {
        span: 24,
        offset: 0,
      },
      sm: {
        span: 16,
        offset: 8,
      },
    },
  };

  const handleConfirmBlur = (e) => {
    const value = e.target.value;
    //this.setState({ confirmDirty: this.state.confirmDirty || !!value });
  }
  const compareToFirstPassword = (rule, value, callback) => {
    const form = props.form;
    if (value && value !== form.getFieldValue('password')) {
      callback('Two passwords that you enter is inconsistent!');
    } else {
      callback();
    }
  }
  const validateToNextPassword = (rule, value, callback) => {
    const form = props.form;
    //if (value && this.state.confirmDirty) {
    if (value) {
      form.validateFields(['confirm'], { force: true });
    }
    callback();
  }

  function encode(data) {
    return Object.keys(data)
      .map(key => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
      .join("&");
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        sendMessage(values);
      }
    });
  }

  function sendMessage(values) {
    signup({
      "username": "raymans123123",
      "email": "tingjan1982132@gmail.com",
      "password": "password"
    }).then(() => {
      console.log("Form submission success");
      //navigateTo("/success");
    })
      .catch(error => {
        console.error("Form submission error:", error);
      });
  }

  return (
    <React.Fragment>
      <div className="form">
        <ThemeContext.Consumer>
          {theme => (
            <Form onSubmit={handleSubmit}>
              <FormItem
                {...formItemLayout}
                label="E-mail"
              >
                {getFieldDecorator('email', {
                  rules: [{
                    type: 'email', message: 'The input is not valid E-mail!',
                  }, {
                    required: true, message: 'Please input your E-mail!',
                  }],
                })(
                  <Input />
                )}
              </FormItem>
              <FormItem
                {...formItemLayout}
                label="Password"
              >
                {getFieldDecorator('password', {
                  rules: [{
                    required: true, message: 'Please input your password!',
                  }, {
                    validator: validateToNextPassword,
                  }],
                })(
                  <Input type="password" />
                )}
              </FormItem>
              <FormItem
                {...formItemLayout}
                label="Confirm Password"
              >
                {getFieldDecorator('confirm', {
                  rules: [{
                    required: true, message: 'Please confirm your password!',
                  }, {
                    validator: compareToFirstPassword,
                  }],
                })(
                  <Input type="password" onBlur={handleConfirmBlur} />
                )}
              </FormItem>
              <FormItem
                {...formItemLayout}
                label={(
                  <span>
                    Nickname&nbsp;
                    <Tooltip title="What do you want others to see you?">
                      <Icon type="question-circle-o" />
                  </Tooltip>
                  </span>
                )}
              >
                {getFieldDecorator('nickname', {
                  rules: [{ required: true, message: 'Please input your nickname!', whitespace: true }],
                })(
                  <Input />
                )}
              </FormItem>
              <FormItem
                {...formItemLayout}
                label="Captcha"
                extra="We must make sure that your are a human."
              >
                <Row gutter={8}>
                  <Col span={12}>
                    {getFieldDecorator('captcha', {
                      rules: [{ required: true, message: 'Please input the captcha you got!' }],
                    })(
                      <Input />
                    )}
                  </Col>
                  <Col span={12}>
                    <Button>Get captcha</Button>
                  </Col>
                </Row>
              </FormItem>
              <FormItem {...tailFormItemLayout}>
                {getFieldDecorator('agreement', {
                  valuePropName: 'checked',
                })(
                  <Checkbox>I have read the <a href="">agreement</a></Checkbox>
                )}
              </FormItem>
              <FormItem {...tailFormItemLayout}>
                <Button type="primary" htmlType="submit">Register</Button>
              </FormItem>
            </Form>
          )}
        </ThemeContext.Consumer>
      </div>
    </React.Fragment>
  );
};

Register.propTypes = {
  form: PropTypes.object
};

const RegisterForm = Form.create({})(Register);

export default RegisterForm;
