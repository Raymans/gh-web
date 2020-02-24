/* eslint no-unused-vars: 0 */

import { navigateTo } from 'gatsby-link';
import {
  AutoComplete, Button, Checkbox, Form, Icon, Input, Select, Tooltip,
} from 'antd';

import PropTypes from 'prop-types';
import React from 'react';

import { createGlobalStyle } from 'styled-components';
import { signup } from '../../utils/api';

const FormItem = Form.Item;
const { Option } = Select;
const AutoCompleteOption = AutoComplete.Option;


const Register = (props) => {
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
    const { value } = e.target;
    // this.setState({ confirmDirty: this.state.confirmDirty || !!value });
  };
  const compareToFirstPassword = (rule, value, callback) => {
    const { form } = props;
    if (value && value !== form.getFieldValue('password')) {
      callback('Two passwords that you enter is inconsistent!');
    } else {
      callback();
    }
  };
  const validateToNextPassword = (rule, value, callback) => {
    const { form } = props;
    // if (value && this.state.confirmDirty) {
    if (value) {
      form.validateFields(['confirm'], { force: true });
    }
    callback();
  };

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
          refreshAuth();
          navigateTo('/');
        });
      }
    });
  };

  function sendMessage(values) {
    return signup({
      firstName: 'Joe',
      lastName: 'Lin',
      ...values,
    }).then((user) => {
      console.log('Form submission success');
    })
      .catch((error) => {
        console.error('Form submission error:', error);
      });
  }

  return (
    <>
      <div className="form">
        <Form onSubmit={(e) => handleSubmit(e)}>
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
              <Input />,
            )}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label={(
              <span>
                User Name&nbsp;
                <Tooltip title="What do you want others to see you?">
                  <Icon type="question-circle-o" />
                </Tooltip>
              </span>
            )}
          >
            {getFieldDecorator('username', {
              rules: [{ required: true, message: 'Please input your user name!', whitespace: true }],
            })(
              <Input />,
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
              <Input type="password" />,
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
              <Input type="password" onBlur={handleConfirmBlur} />,
            )}
          </FormItem>
          <FormItem {...tailFormItemLayout}>
            {getFieldDecorator('remember', {
              valuePropName: 'checked',
              initialValue: true,
            })(
              <Checkbox>Remember me</Checkbox>,
            )}
          </FormItem>
          <FormItem {...tailFormItemLayout}>
            <Button type="primary" htmlType="submit">Register</Button>
          </FormItem>
        </Form>
      </div>
    </>
  );
};

Register.propTypes = {
  form: PropTypes.object,
};

const RegisterForm = Form.create({})(Register);

export default RegisterForm;
