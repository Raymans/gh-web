import { Form, Icon as LegacyIcon } from '@ant-design/compatible';
import '@ant-design/compatible/assets/index.css';

import {
  Button, Cascader, Input, Switch, Tabs, Tooltip,
} from 'antd';
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
let uuid = 4;
if (typeof window !== 'undefined' && typeof window.navigator !== 'undefined') {
  CodeMirror = require('react-codemirror');
  require('codemirror/mode/javascript/javascript');
  require('codemirror/lib/codemirror.css');
}

const GlobalStyle = createGlobalStyle`
    @media (min-width: 1024px) {
    .article {
      max-width: ${(props) => props.theme.text.maxWidth.desktopForm} !important;
    }
  }
`;
const StyledButton = styled(Button)`
  color: green;
`;
const StyledIcon = styled(LegacyIcon)`
    cursor: pointer;
    position: relative;
    top: 4px;
    font-size: 24px;
    color: #999;
    transition: all .3s;
    :hover {
      color: #777;
    }
  `;
const Question = (props) => {
  const { getFieldDecorator, getFieldValue } = props.form;

  const formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 4 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 20 },
    },
  };
  const remove = (k) => {
    const { form } = props;
    // can use data-binding to get
    const keys = form.getFieldValue('keys');
    // We need at least one answer
    if (keys.length === 1) {
      return;
    }

    // can use data-binding to set
    form.setFieldsValue({
      keys: keys.filter((key) => key !== k),
    });
  };

  const add = () => {
    const { form } = props;
    // can use data-binding to get
    const keys = form.getFieldValue('keys');
    const nextKeys = keys.concat(uuid);
    uuid++;
    // can use data-binding to set
    // important! notify form to detect changes
    form.setFieldsValue({
      keys: nextKeys,
    });
  };

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


  getFieldDecorator('keys', { initialValue: [0, 1, 2, 3] });
  const keys = getFieldValue('keys');
  const formItems = keys.map((k, index) => (
    <FormItem
      {...(formItemLayout)}
      required={false}
      key={k}
    >

      <InputGroup>
        {keys.length > 1 ? (
          <StyledIcon
            type="minus-circle-o"
            disabled={keys.length === 1}
            onClick={() => remove(k)}
          />
        ) : null}
        <Tooltip placement="topLeft" title={<span>Check for Right answer</span>}>
          {getFieldDecorator(`corrects[${k}]`, {
            valuePropName: 'checked', initialValue: true,
          })(
            <Switch
              checkedChildren={<LegacyIcon type="check" />}
              unCheckedChildren={<LegacyIcon type="close" />}
              style={{ float: 'left', margin: '5px' }}
            />,
          )}
        </Tooltip>

        {getFieldDecorator(`answers[${k}]`, {
          validateTrigger: ['onChange', 'onBlur'],
          rules: [{
            required: true,
            message: 'Please input answer and check if corrected',
          }],
        })(
          <Input placeholder="Please input answer option" style={{ width: '60%', marginRight: 8 }} />,
        )}
      </InputGroup>
    </FormItem>
  ));

  return (
    <>
      <div className="form">
        <Form onSubmit={handleSubmit} data-netlify="true" data-netlify-honeypot="bot-field">
          <GlobalStyle />
          <FormItem label="Title">
            {getFieldDecorator('question', {
              rules: [
                {
                  required: true,
                  whitespace: true,
                },
              ],
            })(<Input placeholder="please input question's title" />)}
          </FormItem>
          <FormItem label="Category">
            {getFieldDecorator('category', {
              rules: [
                {
                  required: true,
                },
              ],
            })(<Cascader
              options={data}
              onChange={onChange}
              placeholder="Please select one"
              showSearch={{ filter }}
              expandTrigger="hover"
            />)}
          </FormItem>


          <FormItem label="Description">
            {getFieldDecorator('description', {
              rules: [
                {
                  required: true,
                  message: 'Please enter description!',
                  whitespace: true,
                },
              ],
            })(<TextArea placeholder="please input question's description" autoSize={{ minRows: 2, maxRows: 6 }} />)}
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
              <FormItem>
                <StyledButton type="dashed" onClick={add} style={{ width: '60%' }}>
                  <LegacyIcon type="plus" />
                  {' '}
Add Answer
                </StyledButton>
              </FormItem>
            </TabPane>
            <TabPane
              tab={(
                <span>
                  <LegacyIcon type="code-o" />
Coding
                </span>
)}
              key="2"
              disabled
            >
              {CodeMirror
            && (
            <FormItem label="code">
              {getFieldDecorator('code', {
                rules: [
                  {
                    required: true,
                    message: 'Please enter your code!',
                    initialValue: 'function(){}',
                  },
                ],
                initialValue: 'function(){}',
              })(
                <CodeMirror options={{ lineNumbers: true, mode: 'javascript' }} />,
              )}
            </FormItem>
            )}
            </TabPane>
          </Tabs>
          <Button type="primary" htmlType="submit">
            <GatsbyLink to="/questions" replace>Back</GatsbyLink>
          </Button>
          <FormItem>
            <Button type="primary" htmlType="submit">
            Submit
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
