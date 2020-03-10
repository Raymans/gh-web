import { Icon as LegacyIcon } from '@ant-design/compatible';
import '@ant-design/compatible/assets/index.css';

import {
  Form, Button, Cascader, Input, Switch, Tabs, Tooltip,
} from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import styled, { createGlobalStyle } from 'styled-components';
import PropTypes from 'prop-types';
import React from 'react';
import GatsbyLink from 'gatsby-link';
import data from './data';
import { createQuestion } from '../../utils/api';

const InputGroup = Input.Group;
const FormItem = Form.Item;
const { TabPane } = Tabs;
const { TextArea } = Input;

let CodeMirror = null;
const uuid = 4;
if (typeof window !== 'undefined' && typeof window.navigator !== 'undefined') {
  CodeMirror = require('react-codemirror');
  require('codemirror/mode/javascript/javascript');
  require('codemirror/lib/codemirror.css');
}

const StyledMinusCircleOutlined = styled(MinusCircleOutlined)`
    color: #999;
    transition: all .3s;
    :hover {
      color: #777;
    }
  `;
const Question = (props) => {
  const { id } = props;
  function encode(data) {
    return Object.keys(data)
      .map((key) => `${encodeURIComponent(key)}=${encodeURIComponent(data[key])}`)
      .join('&');
  }

  function handleSubmit(e) {
    e.preventDefault();
    props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        values.corrects = values.corrects.filter((value) => value != null);
        values.answers = values.answers.filter((value) => value != null);
        sendMessage(values);
      }
    });
  }

  function sendMessage(values) {
    createQuestion({
      ...values,
      category: 'General',
      topic: 'dummy',
      difficulty: 'EASY',
      contributedBy: null,
    }).then(() => alert('success'));
  }

  function onChange(value, selectedOptions) {
    console.log(value, selectedOptions);
  }

  function filter(inputValue, path) {
    return (path.some((option) => (option.label).toLowerCase().indexOf(inputValue.toLowerCase()) > -1));
  }


  const formItems = (
    <Form.List name="names">
      {(fields, { add, remove }) => (
        <div>
          {fields.map((field, index) => (
            <Form.Item
              required={false}
              key={field.key}
            >
              <Tooltip placement="topLeft" title={<span>Check for Right answer</span>}>
                <Switch
                  checkedChildren={<LegacyIcon type="check" />}
                  unCheckedChildren={<LegacyIcon type="close" />}
                  style={{ float: 'left', margin: '5px' }}
                  name={`corrects[${field.key}]`}
                />
              </Tooltip>
              <Form.Item
                {...field}
                validateTrigger={['onChange', 'onBlur']}
                rules={[
                  {
                    required: true,
                    whitespace: true,
                    message: 'Please input answer option',
                  },
                ]}
                noStyle
              >
                <Input placeholder="Please input answer option" style={{ width: '80%', marginRight: 8 }} />
              </Form.Item>
              {fields.length > 1 ? (
                <StyledMinusCircleOutlined
                  className="dynamic-delete-button"
                  onClick={() => {
                    remove(field.name);
                  }}
                />
              ) : null}
            </Form.Item>
          ))}
          <Form.Item>
            <Button
              type="dashed"
              onClick={() => {
                add();
              }}
              style={{ width: '90%' }}
            >
              <PlusOutlined />
              {' '}
              Add Answer
            </Button>
          </Form.Item>
        </div>
      )}
    </Form.List>
  );

  return (
    <>
      <div className="form">
        <Form id={id} onSubmit={handleSubmit} data-netlify="true" data-netlify-honeypot="bot-field" initialValues={{ code: 'function(){}' }}>
          <FormItem name="question" rules={[{ required: true, whitespace: true }]}>
            <Input placeholder="please input question's title" />
          </FormItem>
          <FormItem name="category" rules={[{ required: true }]}>
            <Cascader
              options={data}
              onChange={onChange}
              placeholder="Please select one"
              showSearch={{ filter }}
              expandTrigger="hover"
            />
          </FormItem>


          <FormItem
            name="description"
            rules={[{
              required: true,
              message: 'Please enter description!',
              whitespace: true,
            }]}
          >
            <TextArea placeholder="please input question's description" autoSize={{ minRows: 2, maxRows: 6 }} />
          </FormItem>
          <Tabs defaultActiveKey="1">
            <TabPane
              tab={(
                <span>
                  <LegacyIcon type="check-square" />
Multiple Question
                </span>
              )}
              key="1"
            >
              {formItems}
            </TabPane>
            <TabPane
              tab={(
                <span>
                  <LegacyIcon type="code-o" />
Coding
                </span>
              )}
              key="2"
            >
              {CodeMirror
              && (
                <FormItem
                  label="code"
                  name="code"
                  rules={[{
                    required: true,
                    message: 'Please enter your code!',
                  }]}
                >
                  <CodeMirror options={{ lineNumbers: true, mode: 'javascript' }} />
                </FormItem>
              )}
            </TabPane>
          </Tabs>
          <FormItem>
            <Button type="primary" htmlType="submit">
              Create
            </Button>
            {' '}
            <Button type="primary" htmlType="submit">
              Create and Next
            </Button>
            <Button type="link">
              <GatsbyLink to="/questions" replace>Back</GatsbyLink>
            </Button>
          </FormItem>
        </Form>
      </div>
    </>
  );
};

Question.propTypes = {
  form: PropTypes.object,
};

export default Question;
