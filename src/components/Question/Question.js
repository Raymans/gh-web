/* eslint no-unused-vars: 0 */

import { navigateTo } from "gatsby-link";
import { Form, Input, Button, Tabs, Icon, Checkbox, Switch } from 'antd';
import PropTypes from "prop-types";
import React from "react";

const InputGroup = Input.Group;
const FormItem = Form.Item;
const TabPane = Tabs.TabPane;
const { TextArea } = Input;
import "antd/lib/form/style/index.css";
import "antd/lib/input/style/index.css";
import "antd/lib/button/style/index.css";
import { ThemeContext } from "../../layouts";

let CodeMirror = null;
let uuid = 0;
if (typeof window !== 'undefined' && typeof window.navigator !== 'undefined') {
  CodeMirror = require('react-codemirror');
  require('codemirror/mode/javascript/javascript');
  require('codemirror/lib/codemirror.css');
}

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
  const formItemLayoutWithOutLabel = {
    wrapperCol: {
      xs: { span: 24, offset: 0 },
      sm: { span: 20, offset: 4 },
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
        sendMessage(values);
      }
    });
  }

  function sendMessage(values) {
    fetch("/", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: encode({ "form-name": "Question", ...values })
    })
      .then(() => {
        console.log("Form submission success");
        navigateTo("/success");
      })
      .catch(error => {
        console.error("Form submission error:", error);
        handleNetworkError();
      });
  }

  function handleNetworkError(e) {
    console.log("submit Error");
  }

  getFieldDecorator('keys', { initialValue: [] });
  const keys = getFieldValue('keys');
  const formItems = keys.map((k, index) => {
    return (
      <FormItem
        {...(formItemLayout)}
        label={index + 1}
        required={false}
        key={k}
      >

        <InputGroup compact>
          {getFieldDecorator(`corrects[${k}]`, {

          })(
            <Switch checkedChildren={<Icon type="check" />} unCheckedChildren={<Icon type="cross" />} defaultChecked />
          )}

      {getFieldDecorator(`names[${k}]`, {
        validateTrigger: ['onChange', 'onBlur'],
        rules: [{
          required: true,
          whitespace: true,
          message: "Please input answer and check if corrected",
          initialValue: { number: 0, currency: 'rmb' },
        }],
      })(
            <Input placeholder="Please input answer and check if corrected" style={{ width: '60%', marginRight: 8 }} />

      )}
        {keys.length > 1 ? (
          <Icon
            className="dynamic-delete-button"
            type="minus-circle-o"
            disabled={keys.length === 1}
            onClick={() => remove(k)}
          />
        ) : null}
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
                {getFieldDecorator("title", {
                  rules: [
                    {
                      required: true,
                      whitespace: true
                    }
                  ]
                })(<Input placeholder="please input question's title"/>)}
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
                })(<Input placeholder="please input question's description"/>)}
              </FormItem>
              <Tabs defaultActiveKey="2">
                <TabPane tab={<span><Icon type="code-o" />Coding</span>} key="1">
                  {CodeMirror &&
                  <FormItem label="code">
                    {getFieldDecorator("code", {
                      rules: [
                        {
                          required: true,
                          message: "Please enter description!",
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
                <TabPane tab={<span><Icon type="check-square" />Multiple Question</span>} key="2">
                  {formItems}
                  <FormItem {...formItemLayoutWithOutLabel}>
                    <Button type="dashed" onClick={add} style={{ width: '60%' }}>
                      <Icon type="plus" /> Add Answer
                    </Button>
                  </FormItem>
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
