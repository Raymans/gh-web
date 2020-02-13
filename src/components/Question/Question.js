/* eslint no-unused-vars: 0 */

import { navigateTo } from "gatsby-link";
import { Form,  Input, Button, Tabs, Icon, Checkbox, Switch, Cascader, Tooltip } from 'antd';
import styled from 'styled-components';
import PropTypes from "prop-types";
import React from "react";
import data from './data';
import {createQuestion} from "../../utils/api"

const InputGroup = Input.Group;
const FormItem = Form.Item;
const TabPane = Tabs.TabPane;
const { TextArea } = Input;
import { ThemeContext } from "../../layouts";

let CodeMirror = null;
let uuid = 4;
if (typeof window !== 'undefined' && typeof window.navigator !== 'undefined') {
  CodeMirror = require('react-codemirror');
  require('codemirror/mode/javascript/javascript');
  require('codemirror/lib/codemirror.css');
}

const StyledButton = styled(Button)`
  color: green;
`;
const Question = props => {
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
      keys: keys.filter(key => key !== k),
    });
  }

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
  }

  function encode(data) {
    return Object.keys(data)
      .map(key => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
      .join("&");
  }

  function handleSubmit(e) {
    e.preventDefault();
    props.form.validateFields((err, values) => {
      if (!err) {
        console.log("Received values of form: ", values);
        values.corrects = values.corrects.filter(value => value != null);
        values.answers = values.answers.filter(value => value != null);
        sendMessage(values);
      }
    });
  }

  function sendMessage(values) {

    createQuestion({
      ...values,
      "category": "General",
      "topic": "dummy",
      "difficulty": "EASY",
      "contributedBy": null,
    }).then(() => alert('success'))
  }

  function onChange(value, selectedOptions) {
    console.log(value, selectedOptions);
  }

  function filter(inputValue, path) {
    return (path.some(option => (option.label).toLowerCase().indexOf(inputValue.toLowerCase()) > -1));
  }


  getFieldDecorator('keys', { initialValue: [0,1,2,3] });
  const keys = getFieldValue('keys');
  const formItems = keys.map((k, index) => {
    return (
      <FormItem
        {...(formItemLayout)}
        required={false}
        key={k}
      >

        <InputGroup>
          {keys.length > 1? (
            <Icon
              className="dynamic-delete-button"
              type="minus-circle-o"
              disabled={keys.length === 1}
              onClick={() => remove(k)}
            />
          ) : null}
          <Tooltip placement="topLeft" title={<span>Check for Right answer</span>}>
          {getFieldDecorator(`corrects[${k}]`, { valuePropName: 'checked', initialValue: true
          })(
              <Switch checkedChildren={<Icon type="check" />} unCheckedChildren={<Icon type="cross" />} style={{float: "left", margin: "5px"}} />
          )}
          </Tooltip>

      {getFieldDecorator(`answers[${k}]`, {
        validateTrigger: ['onChange', 'onBlur'],
        rules: [{
          required: true,
          message: "Please input answer and check if corrected",
        }],
      })(
        <Input placeholder="Please input answer option" style={{ width: '60%', marginRight: 8 }} />
      )}
        </InputGroup>
    </FormItem>

    );
  });

  return (
    <React.Fragment>
      <div className="form">
        <ThemeContext.Consumer>
          {theme => (
            <Form onSubmit={handleSubmit} data-netlify="true" data-netlify-honeypot="bot-field">
              <FormItem label="Title">
                {getFieldDecorator("question", {
                  rules: [
                    {
                      required: true,
                      whitespace: true
                    }
                  ]
                })(<Input placeholder="please input question's title"/>)}
              </FormItem>
              <FormItem label="Category">
                {getFieldDecorator("category", {
                  rules: [
                    {
                      required: true
                    }
                  ]
                })(<Cascader
                  options={data}
                  onChange={onChange}
                  placeholder="Please select one"
                  showSearch={{ filter }}
                  expandTrigger="hover"
                />)}
              </FormItem>


              <FormItem label="Description">
                {getFieldDecorator("description", {
                  rules: [
                    {
                      required: true,
                      message: "Please enter description!",
                      whitespace: true,
                    }
                  ]
                })(<TextArea placeholder="please input question's description" autosize={{ minRows: 2, maxRows: 6 }} />)}
              </FormItem>
              <Tabs defaultActiveKey="1">
                <TabPane tab={<span><Icon type="check-square" />Multiple Question</span>} key="1">
                  {formItems}
                  <FormItem>
                    <StyledButton type="dashed" onClick={add} style={{ width: '60%' }}>
                      <Icon type="plus" /> Add Answer
                    </StyledButton>
                  </FormItem>
                </TabPane>
                <TabPane tab={<span><Icon type="code-o" />Coding</span>} key="2" disabled>
                  {CodeMirror &&
                  <FormItem label="code">
                    {getFieldDecorator("code", {
                      rules: [
                        {
                          required: true,
                          message: "Please enter your code!",
                          initialValue: 'function(){}'
                        }
                      ],
                      initialValue: 'function(){}'
                    })(
                      <CodeMirror options={{ lineNumbers: true, mode: 'javascript' }}/>
                    )}
                  </FormItem>
                  }
                </TabPane>
              </Tabs>
              <FormItem>
                <Button type="primary" htmlType="submit">
                  Submit
                </Button>
              </FormItem>
              {/* --- STYLES --- */}
              <style jsx>{`
                .form {
                  background: transparent;
                }
                .form :global(.ant-row.ant-form-item) {
                  margin: 0 0 1em;
                }
                .form :global(.ant-row.ant-form-item:last-child) {
                  margin-top: 1em;
                }
                .form :global(.ant-form-item-control) {
                  line-height: 1em;
                }
                .form :global(.ant-form-item-label) {
                  line-height: 1em;
                  margin-bottom: 0.5em;
                }
                .form :global(.ant-form-item) {
                  margin: 0;
                }
                .form :global(.ant-input) {
                  appearance: none;
                  height: auto;
                  font-size: 1.2em;
                  padding: 0.5em 0.6em;
                }
                .form :global(.ant-btn-primary) {
                  height: auto;
                  font-size: 1.2em;
                  padding: 0.5em 3em;
                  background: ${theme.color.brand.primary};
                  border: 1px solid ${theme.color.brand.primary};
                }
                .form :global(.ant-form-explain) {
                  margin-top: 0.2em;
                }

                @from-width desktop {
                  .form :global(input) {
                    max-width: 50%;
                  }
                }
                :global(.dynamic-delete-button) {
                  cursor: pointer;
                  position: relative;
                  top: 4px;
                  font-size: 24px;
                  color: #999;
                  transition: all .3s;
                }
                :global(.dynamic-delete-button:hover) {
                  color: #777;
                }
                :global(.dynamic-delete-button[disabled]) {
                  cursor: not-allowed;
                  opacity: 0.5;
                }
                @from-width desktop {
                  :global(.article) {
                    max-width: ${theme.text.maxWidth.desktopForm} !important;
                  }
                }
              `}</style>
            </Form>
          )}
        </ThemeContext.Consumer>
      </div>
    </React.Fragment>
  );
};

Question.propTypes = {
  form: PropTypes.object
};

const QuestionForm = Form.create({})(Question);

export default QuestionForm;
