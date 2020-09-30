/* eslint no-unused-vars: 0 */

import { navigateTo } from 'gatsby-link';
import Button from 'antd/lib/button';
import Form from 'antd/lib/form';
import Input from 'antd/lib/input';
import PropTypes from 'prop-types';
import React from 'react';
import Seo from '../Seo';

const FormItem = Form.Item;
const { TextArea } = Input;

const Contact = (props) => {
  const { form } = props;

  function encode(data) {
    return Object.keys(data)
      .map((key) => `${encodeURIComponent(key)}=${encodeURIComponent(data[key])}`)
      .join('&');
  }

  function sendMessage(values) {
    fetch('/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: encode({ 'form-name': 'contact', ...values }),
    })
      .then(() => {
        console.log('Form submission success');
        navigateTo('/success');
      })
      .catch((error) => {
        console.error('Form submission error:', error);
        this.handleNetworkError();
      });
  }

  function handleSubmit(e) {
    e.preventDefault();
    form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        sendMessage(values);
      }
    });
  }

  function handleNetworkError(e) {
    console.log('submit Error');
  }

  return (
    <>
      <div className="form">
        <Form onSubmit={handleSubmit} data-netlify="true" data-netlify-honeypot="bot-field">
          <FormItem
            label="Name"
            name="name"
            rules={[
              {
                whitespace: true,
              },
            ]}
          >
            <Input />
          </FormItem>
          <FormItem
            label="E-mail"
            name="email"
            rules={[
              {
                required: true,
                message: 'Please input your e-mail address!',
                whitespace: true,
                type: 'email',
              },
            ]}
          >
            <Input />
          </FormItem>
          <FormItem
            label="Message"
            name="message"
            rules={[
              { required: true, message: 'Please input your message!', whitespace: true },
            ]}
          >
            <TextArea
              placeholder="Autosize height with minimum and maximum number of lines"
              autoSize={{ minRows: 4, maxRows: 10 }}
            />
          </FormItem>
          <FormItem>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </FormItem>
        </Form>
      </div>
      <Seo subTitle="Contact" />
    </>
  );
};

Contact.propTypes = {
  form: PropTypes.shape,
};

export default Contact;
