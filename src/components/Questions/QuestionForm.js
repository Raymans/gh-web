import '@ant-design/compatible/assets/index.css';

import { Button, Form, Input, Spin, Switch, Tabs, Tooltip } from 'antd';
import {
  CheckOutlined,
  CheckSquareOutlined,
  CloseOutlined,
  CodeOutlined,
  FormOutlined,
  LoadingOutlined,
  MinusCircleOutlined,
  PlusOutlined,
  RetweetOutlined
} from '@ant-design/icons';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { FormattedMessage, Link, navigate, useIntl } from 'gatsby-plugin-intl';
import Headline from '../Article/Headline';
import CustomBreadcrumb from '../CustomBreadcrumb';
import useApi from '../../hooks/useApi';
import Seo from '../Seo';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';

const FormItem = Form.Item;
const { TabPane } = Tabs;
const { TextArea } = Input;

let CodeMirror = null;
if (typeof window !== 'undefined' && typeof window.navigator !== 'undefined') {
  CodeMirror = require('react-codemirror');
  require('codemirror/mode/javascript/javascript');
  require('codemirror/lib/codemirror.css');
}

const StyledQuestionSection = styled.div`
  .ant-form-item-explain-error {
    padding-left: 66px;
  }
`;
const StyledActionIconsSection = styled.span`
  span {
    margin-left: 10px;
    color: #999;
    transition: all .3s;

    :hover {
      color: ${(props) => props.theme.color.brand.primary};
    }

    &.anticon-minus-circle:hover {
      color: red;
    }
  }
`;

const StyledButtonsGroup = styled(FormItem)`
  margin: 30px 0;
`;
const inputLayout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 20 }
};

const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin/>;

const getListStyle = isDraggingOver => ({
  background: isDraggingOver ? '#c9ecec' : '',
  padding: '1px',
  position: 'relative'
});

const getItemStyle = (isDragging, draggableStyle) => ({
  userSelect: 'none',
  padding: 4,
  background: isDragging ? '#2f9eba' : '',
  ...draggableStyle
});

const QuestionForm = (props) => {
  const [saving, setSaving] = useState(false);
  const intl = useIntl();
  const {
    id,
    sectionId,
    form
  } = props;

  const {
    createQuestion,
    getQuestion,
    updateQuestion
  } = useApi();
  const questionType = form.getFieldsValue().sections?.[sectionId].questions?.[id].questionType ?? 'MULTI_CHOICE';
  const formContent = (
    <>
      <FormItem
        label={intl.formatMessage({ defaultMessage: 'Description' })}
        name={form ? [id, 'question'] : 'question'}
        rules={[{
          required: true,
          message: intl.formatMessage({ defaultMessage: 'Please enter description.' }),
          whitespace: true
        }]}
      >
        <TextArea
          autoSize={{
            minRows: 2
          }}
          placeholder={intl.formatMessage({ defaultMessage: 'Question description' })}
        />
      </FormItem>
      <Tabs activeKey={questionType} onChange={(key) => {
        const formData = form.getFieldValue();
        const question = formData.sections[sectionId].questions[id];
        question.questionType = key;
        if (key === 'MULTI_CHOICE' && question.possibleAnswers.length === 0) {
          question.possibleAnswers = [{}];
        }
        form.setFieldsValue(formData);
      }}>
        <TabPane
          tab={(
            <span>
              <FormOutlined/>
              <FormattedMessage defaultMessage="Short-Answer"/>
            </span>
          )}
          key="SHORT_ANSWER"
        >
          <FormattedMessage defaultMessage="Ask the question as a Short-Answer type."/>
        </TabPane>
        <TabPane
          tab={(
            <span>
              <CheckSquareOutlined/>
              <FormattedMessage defaultMessage="Multiple Question"/>
            </span>
          )}
          key="MULTI_CHOICE"
        >
          {questionType === 'MULTI_CHOICE' &&
          <Form.List name={form ? [id, 'possibleAnswers'] : 'possibleAnswers'}>
            {(fields, {
              add,
              remove,
              move
            }) => (
              <QuestionFormItem form={form} id={id} fields={fields} add={add} remove={remove}
                                move={move}/>
            )}
          </Form.List>
          }
        </TabPane>
        <TabPane
          disabled
          tab={(
            <Tooltip title={<FormattedMessage defaultMessage="Coming soon!"/>}>
              <CodeOutlined/>
              <FormattedMessage defaultMessage="Coding"/>
            </Tooltip>
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
                message: 'Please enter your code!'
              }]}
            >
              <CodeMirror options={{
                lineNumbers: true,
                mode: 'javascript'
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
        correctAnswer: !!possibleAnswer.correctAnswer
      }));
      if (isEditForm) {
        updateQuestion({
          id,
          params: { possibleAnswers, ...values }
        })
          .then(() => {
            navigate('questions');
          });
      } else {
        createQuestion({
          params: { possibleAnswers, ...values }
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
        <CustomBreadcrumb crumbs={[{
          label: 'List Questions',
          path: '/questions'
        }, {
          label: isEditForm ? 'Question - edit' : 'Question - create',
          path: location.pathname
        }]}/>
        <Headline title={isEditForm ? 'Question - Edit' : 'Question - Create'}/>
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
                <Button type="link">
                  <Link to="/questions" replace>Back</Link>
                </Button>
                <Button type="primary" htmlType="submit">
                  {isEditForm ? 'Update' : 'Create'}
                </Button>
              </StyledButtonsGroup>
            </Form>
          </div>
        </Spin>
        <Seo subTitle={isEditForm ? 'Question - Edit' : 'Question - Create'}/>
      </>
    );
  }
  return formContent;
};

const QuestionFormItem = (props) => {
  const intl = useIntl();
  const {
    form,
    id,
    fields,
    add,
    remove,
    move
  } = props;

  const handleReorderOptions = (result) => {
    if (!result.destination) {
      return;
    }
    move(result.source.index, result.destination.index);
  };

  return (
    <>
      <DragDropContext onDragEnd={handleReorderOptions}>
        <Droppable droppableId="options_droppable">
          {(provided, snapshot) => (
            <div {...provided.droppableProps}
                 ref={provided.innerRef}
                 style={getListStyle(snapshot.isDraggingOver)}>
              {fields.map((field, index) => (
                <Draggable key={`option_${index}`}
                           draggableId={`option_${index}`}
                           index={index}
                >
                  {(provided, snapshot) => (
                    <StyledQuestionSection
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      style={getItemStyle(
                        snapshot.isDragging,
                        provided.draggableProps.style
                      )}>
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
                            checkedChildren={<CheckOutlined/>}
                            unCheckedChildren={<CloseOutlined/>}
                            style={{
                              float: 'left',
                              margin: '5px'
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
                              message: intl.formatMessage({ defaultMessage: 'Please input answer option' })
                            }
                          ]}
                          noStyle
                        >
                          <Input
                            placeholder={intl.formatMessage({ defaultMessage: 'Please input answer option' })}
                            style={{
                              width: '80%',
                              marginRight: 8
                            }}
                          />
                        </Form.Item>
                        {fields.length > 1 ? (
                          <StyledActionIconsSection>
                            <MinusCircleOutlined
                              className="dynamic-delete-button"
                              onClick={() => {
                                remove(field.name);
                              }}
                            />
                            <Tooltip
                              title={intl.formatMessage({
                                id: 'question.options.reorder.tooltip',
                                defaultMessage: 'Reorder answer options'
                              })}>
                              <RetweetOutlined {...provided.dragHandleProps} />
                            </Tooltip>
                          </StyledActionIconsSection>
                        ) : null}
                      </Form.Item>
                    </StyledQuestionSection>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>

      <Button
        size="small"
        onClick={() => {
          add();
        }}
      >
        <PlusOutlined/>
        <FormattedMessage defaultMessage="Add Answer"/>
      </Button>
    </>
  );
};

QuestionForm.propTypes = {
  id: PropTypes.string
};

export default QuestionForm;

QuestionForm.defaultProps = {};
