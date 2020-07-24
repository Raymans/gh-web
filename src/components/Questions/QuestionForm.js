import '@ant-design/compatible/assets/index.css';

import {
  Button, Form, Input, Spin, Switch, Tabs,
} from 'antd';
import {
  CheckOutlined,
  CheckSquareOutlined,
  CloseOutlined,
  CodeOutlined,
  LoadingOutlined,
  MinusCircleOutlined,
  PlusOutlined,
} from '@ant-design/icons';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { Link, navigate } from 'gatsby-plugin-intl';
import { createQuestion, getQuestion, updateQuestion } from '../../utils/api';
import Headline from '../Article/Headline';
import CustomBreadcrumb from '../CustomBreadcrumb';

const FormItem = Form.Item;
const { TabPane } = Tabs;
const { TextArea } = Input;

let CodeMirror = null;
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
const StyledButtonsGroup = styled(FormItem)`
  margin: 30px 0;
`;
const inputLayout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 20 },
};

const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

const QuestionForm = (props) => {
  const [saving, setSaving] = useState(false);

  const {
    id, form,
  } = props;

  const formContent = (
    <>
      <FormItem
        label="Description"
        name={form ? [id, 'question'] : 'question'}
        rules={[{
          required: true,
          message: 'Please enter description.',
          whitespace: true,
        }]}
      >
        <TextArea autoSize={{
          minRows: 2,
          maxRows: 6,
        }}
        />
      </FormItem>
      <Tabs defaultActiveKey="1">
        <TabPane
          tab={(
            <span>
              <CheckSquareOutlined />
              {' '}
              Multiple Question
            </span>
          )}
          key="1"
        >
          <Form.List name={form ? [id, 'possibleAnswers'] : 'possibleAnswers'}>
            {(fields, { add, remove }) => (
              <QuestionFormItem form={form} id={id} fields={fields} add={add} remove={remove} />
            )}
          </Form.List>
        </TabPane>
        <TabPane
          tab={(
            <span>
              <CodeOutlined />
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
              <CodeMirror options={{
                lineNumbers: true,
                mode: 'javascript',
              }}
              />
            </FormItem>
          )}
        </TabPane>
      </Tabs>
    </>
  );
  if (!form) {
    const isEditForm = !!id;
    const [editForm] = Form.useForm();

    function encode(data) {
      return Object.keys(data)
        .map((key) => `${encodeURIComponent(key)}=${encodeURIComponent(data[key])}`)
        .join('&');
    }

    const handleFinish = (values) => {
      setSaving(true);
      if (!values.possibleAnswers) {
        return;
      }
      const possibleAnswers = values.possibleAnswers.map((possibleAnswer) => ({
        ...possibleAnswer,
        correctAnswer: !!possibleAnswer.correctAnswer,
      }));
      if (isEditForm) {
        updateQuestion({
          id,
          params: { possibleAnswers, ...values },
        })
          .then(() => {
            navigate('questions');
          });
      } else {
        createQuestion({
          params: { possibleAnswers, ...values },
        })
          .then(() => {
            navigate('/questions');
          });
      }
    };

    useEffect(() => {
      if (isEditForm) {
        setSaving(true);
        getQuestion({ id })
          .then((data) => {
            editForm.setFieldsValue({ ...data });
            setSaving(false);
          });
      }
    }, []);

    return (
      <>
        <CustomBreadcrumb crumbs={[{ label: 'List Questions', path: '/questions' },  { label: isEditForm ? 'Question - edit' : 'Question - create', path: location.pathname }]} />
        <Headline title={isEditForm ? 'Question - Edit' : 'Question - Create'} />
        <Spin spinning={saving} indicator={antIcon}>
          <div className="form">
            <Form
              {...inputLayout}
              id={id}
              onFinish={handleFinish}
              data-netlify="true"
              data-netlify-honeypot="bot-field"
              initialValues={{ code: 'function(){}' }}
              form={editForm}
            >
              {formContent}
              <StyledButtonsGroup>
                <Button type="primary" htmlType="submit">
                  {isEditForm ? 'Update' : 'Create'}
                </Button>
                {' '}
                <Button type="link">
                  <Link to="/questions" replace>Back</Link>
                </Button>
              </StyledButtonsGroup>
            </Form>
          </div>
        </Spin>
      </>
    );
  }
  return formContent;
};

const QuestionFormItem = (props) => {
  const {
    form, id, fields, add, remove,
  } = props;
  return (
    <div>
      {fields.map((field, index) => (
        <Form.Item
          required={false}
          key={field.key}
        >
          <FormItem
            name={form ? [index, 'correctAnswer'] : [index, 'correctAnswer']}
            valuePropName="checked"
            noStyle
          >
            <Switch
              checkedChildren={<CheckOutlined />}
              unCheckedChildren={<CloseOutlined />}
              style={{
                float: 'left',
                margin: '5px',
              }}
            />
          </FormItem>
          <Form.Item
            name={form ? [index, 'answer'] : [index, 'answer']}
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
            <Input
              placeholder="Please input answer option"
              style={{
                width: '80%',
                marginRight: 8,
              }}
            />
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
      <Button
        size="small"
        onClick={() => {
          add();
        }}
      >
        <PlusOutlined />
        {' '}
        Add Answer
      </Button>
    </div>
  );
};

QuestionForm.propTypes = {
  id: PropTypes.string,
};

export default QuestionForm;

QuestionForm.defaultProps = {};
