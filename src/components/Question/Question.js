/* eslint no-unused-vars: 0 */

import { navigateTo } from "gatsby-link";
import Button from "antd/lib/button";
import Form from "antd/lib/form";
import Input from "antd/lib/input";
import PropTypes from "prop-types";
import React from "react";

const FormItem = Form.Item;
const { TextArea } = Input;
import "antd/lib/form/style/index.css";
import "antd/lib/input/style/index.css";
import "antd/lib/button/style/index.css";
import { ThemeContext } from "../../layouts";

let CodeMirror = null;
if (typeof window !== 'undefined' && typeof window.navigator !== 'undefined') {
  CodeMirror = require('react-codemirror');
  require('codemirror/mode/javascript/javascript');
  require('codemirror/lib/codemirror.css');
}

const Question = props => {
  const { getFieldDecorator } = props.form;

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
        this.handleNetworkError();
      });
  }

  function handleNetworkError(e) {
    console.log("submit Error");
  }

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
              <FormItem>
                <Button type="primary" htmlType="submit">
                  Submit
                </Button>
              </FormItem>
              {/* --- STYLES --- */}
              <style jsx>{`

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
