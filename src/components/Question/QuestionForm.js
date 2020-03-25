import { Icon as LegacyIcon } from '@ant-design/compatible';
import '@ant-design/compatible/assets/index.css';

import {
  Button, Form, Input, Spin, Switch, Tabs, Tooltip,
} from 'antd';
import { LoadingOutlined, MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { Link, navigate } from 'gatsby-plugin-intl';
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

const inputLayout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 20 },
};

const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

const QuestionForm = (props) => {
  const [saving, setSaving] = useState(false);

  const {
    id, showCreateButton, form,
  } = props;

  function encode(data) {
    return Object.keys(data)
      .map((key) => `${encodeURIComponent(key)}=${encodeURIComponent(data[key])}`)
      .join('&');
  }

  function sendMessage(values) {
    createQuestion({
      ...values,
    }).then(() => {
      setSaving(false);
      navigate('/questions');
    });
  }

  function handleSubmit(values) {
    setSaving(true);
    if (!values.possibleAnswers) {
      return;
    }
    const possibleAnswers = values.possibleAnswers.map((possibleAnswer) => {
      const correct = !!possibleAnswer.correctAnswer;
      return { ...possibleAnswer, correctAnswer: correct };
    });
    sendMessage({ ...values, possibleAnswers });
  }

  const formContent = (
    <>
      <FormItem
        label="Description"
        name="question"
        rules={[{
          required: true,
          message: 'Please enter description.',
          whitespace: true,
        }]}
      >
        <TextArea autoSize={{ minRows: 2, maxRows: 6 }} />
      </FormItem>
      <Tabs defaultActiveKey="1">
        <TabPane
          tab={(
            <span>
              <LegacyIcon type="check-square" />
              {' '}
              Multiple Question
            </span>
          )}
          key="1"
        >
          <Form.List name="possibleAnswers">
            {(fields, { add, remove }) => (
              <QuestionFormItem fields={fields} add={add} remove={remove} />
            )}
          </Form.List>
        </TabPane>
        <TabPane
          tab={(
            <span>
              <LegacyIcon type="code-o" />
              {' '}
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
      {showCreateButton
      && (
        <FormItem>
          <Button type="primary" htmlType="submit">
            Create
          </Button>
          {' '}
          <Button type="primary" htmlType="submit">
            Create and Next
          </Button>
          <Button type="link">
            <Link to="/questions" replace>Back</Link>
          </Button>
        </FormItem>
      )}
    </>
  );
  if (!form) {
    return (
      <Spin spinning={saving} indicator={antIcon}>
        <div className="form">
          <Form
            {...inputLayout}
            id={id}
            onFinish={handleSubmit}
            data-netlify="true"
            data-netlify-honeypot="bot-field"
            initialValues={{ code: 'function(){}' }}
          >
            {formContent}
          </Form>
        </div>
      </Spin>
    );
  }
  return formContent;
};

const QuestionFormItem = (props) => {
  const { fields, add, remove } = props;
  return (
    <div>
      {fields.map((field, index) => (
        <Form.Item
          required={false}
          key={field.key}
        >
          <FormItem name={[index, 'correctAnswer']} noStyle>
            <Switch
              checkedChildren={<LegacyIcon type="check" />}
              unCheckedChildren={<LegacyIcon type="close" />}
              style={{ float: 'left', margin: '5px' }}
            />
          </FormItem>
          <Form.Item
            name={[index, 'answer']}
            validateTrigger={['onChange', 'onBlur']}
            rules={[
              {
                required: true,
                whitespace: true,
                message: 'answer option',
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
  );
};

QuestionForm.propTypes = {
  id: PropTypes.string,
  showCreateButton: PropTypes.bool,
};

export default QuestionForm;

QuestionForm.defaultProps = {
  showCreateButton: true,
};
