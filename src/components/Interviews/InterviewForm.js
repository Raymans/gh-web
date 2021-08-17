import PropTypes from 'prop-types';
import {
  AutoComplete,
  Button,
  Form,
  Input,
  Layout,
  message,
  Modal,
  Select,
  Spin,
  Switch,
  Tooltip
} from 'antd';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Divider from 'antd/lib/divider';
import FormItem from 'antd/lib/form/FormItem';
import TextArea from 'antd/lib/input/TextArea';
import { FormattedMessage, Link, useIntl } from 'gatsby-plugin-intl';
import {
  LoadingOutlined,
  MinusCircleOutlined,
  PlusOutlined,
  QuestionCircleOutlined,
  RetweetOutlined
} from '@ant-design/icons';
import transformSwitchValue from '../../utils/questionHelpers';
import Headline from '../Article/Headline';
import QuestionList from '../Questions/QuestionList';
import QuestionForm from '../Questions/QuestionForm';
import CustomBreadcrumb from '../CustomBreadcrumb';
import useApi from '../../hooks/useApi';
import Seo from '../Seo';
import { globalHistory, useNavigate } from '@reach/router';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import LoginNeededWrapper from '../Auth/LoginNeededWrapper';
import ConfirmModal from '../Organization/ConfirmModal';
import AnchorSider from '../Sider/AnchorSider';
import { Option } from 'antd/lib/mentions';
import useGetStarted from '../../hooks/useGetStarted';
import useStore from '../../hooks/useStore';

const {
  Content
} = Layout;

const inputLayout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 20 }
};

const StyledQuestionCircleOutlined = styled(QuestionCircleOutlined)`
  margin: 10px;
  font-size: 0.7em;
`;

const StyledAutoComplete = styled(AutoComplete)`
  width: 100% !important;
`;

const StyledQuestionSection = styled.div`
  background-color: white;

  :hover {
    border-color: #2f9eba;
  }

  border: 1px;
  border-style: double;
  border-radius: 11px;
  padding: 10px;
  border-color: lightgray;
  margin-bottom: 24px;
`;

const StyledVisibilityDiv = styled.div`
  text-align: end;
  margin-bottom: 24px;
`;

const mockVal = (str, repeat = 1) => ({
  value: str.repeat(repeat)
});

let sectionIndexOfAddingQuestion = 0;
const interviewMessageKey = 'interviewMessage';
let selectedQuestions = [];
let isPublishAction = false;


const grid = 8;

const getItemStyle = (isDragging, draggableStyle) => ({
  userSelect: 'none',
  padding: grid * 2,
  margin: `0 0 ${grid}px 0`,
  background: isDragging ? '#2f9eba' : '',
  ...draggableStyle
});

const getListStyle = isDraggingOver => ({
  background: isDraggingOver ? '#c9ecec' : '',
  padding: grid,
  paddingBottom: '85px',
  position: 'relative'
});

const defaultQuestion = {
  questionType: 'MULTI_CHOICE',
  possibleAnswers: [{}]
};

const defaultSectionTitle = 'default section';

const InterviewForm = ({
  id,
  onPublished
}) => {
  const isEditForm = !!id;
  const intl = useIntl();
  const {
    createInterview,
    getInterview,
    getQuestions,
    //getSpecializations,
    updateInterview,
    publishInterview
  } = useApi();
  const { isGetStarted } = useGetStarted();
  const { organization } = useStore();
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [jobTitle, setJobTitle] = useState('');
  const [jobOptions, setJobTitleOptions] = useState([]);
  const [anchorSections, setAnchorSections] = useState([]);
  //const [specializations, setSpecializations] = useState([]);
  const [isSelectedQuestionVisible, setIsSelectedQuestionVisible] = useState(false);
  const [questionList, setQuestionList] = useState([]);
  const [selectedQuestionIds, setSelectedQuestionIds] = useState([]);
  const [publishedInterviewId, setPublishedInterviewId] = useState(null);

  useEffect(() => {
    const historyUnsubscribe = globalHistory.listen((listener) => {
    });
    window.onbeforeunload = () => {
      return form.isFieldsTouched() ? true : undefined;
    };

    return () => {
      historyUnsubscribe();
      window.onbeforeunload = undefined;
    };
  }, []);
  useEffect(() => {
    // getSpecializations()
    //   .then(((data = []) => {
    //     setSpecializations(data);
    //   }));
    if (isEditForm) {
      setLoading(true);
      getInterview(id)
        .then((data = { sections: [] }) => {
          data.visibility = data.visibility === 'PUBLIC';
          form.setFieldsValue({
            ...data,
            // specializationId: data.specialization.id,
            defaultDuration: data.defaultDuration === -1 ? '' : data.defaultDuration
          });
          setAnchorSections(data.sections.map((section, index) => ({
            href: `#section_${index}`,
            title: section.title,
            subAnchors: section.questions?.map((question, qindex) =>
              ({
                href: `#section_${index}_question_${qindex}`,
                title: `Q ${qindex + 1}`
              }))
          })));
          setPublishedInterviewId(data.publishedInterviewId);
          setLoading(false);
        });
    } else {
      const formdata = {
        sections: [{
          title: defaultSectionTitle,
          questions: [{ ...defaultQuestion }]
        }]
      };
      form.setFieldsValue(formdata);
      pushSection(`section_0`, defaultSectionTitle);
    }
  }, []);

  const onJobTitleSearch = (searchText) => {
    setJobTitleOptions(
      !searchText ? [] : [mockVal(searchText), mockVal(searchText, 2), mockVal(searchText, 3)]
    );
  };

  const onJobTitleChange = (data) => {
    setJobTitle(data);
  };

  const beforeSaving = () => {
    setLoading(true);
    message.loading({
      content: intl.formatMessage({ defaultMessage: 'Saving' }),
      key: interviewMessageKey
    });
  };

  const afterSaving = (content) => {
    window.onbeforeunload = undefined;
    message.success({
      content,
      key: interviewMessageKey
    });
    setLoading(false);
  };

  const publish = (data) => {
    if (isPublishAction) {
      return publishInterview({ id: data.id })
        .then((pi) => {
          setPublishedInterviewId(pi.interview.publishedInterviewId);
          onPublished(data);
          return data;
        });
    }
    return data;
  };
  const onFinish = (values) => {
    if (isPublishAction) {
      if (!values.sections[0]?.questions) {
        message.error(<FormattedMessage
          defaultMessage="Publish Assessment needs at least one section and one question."/>);
        return;
      }
    }
    beforeSaving();
    values.sections && values.sections.map((section) => (
      section.questions && section.questions.map((question) => {
        if (question.questionType === 'MULTI_CHOICE') {
          question.possibleAnswers = transformSwitchValue(question.possibleAnswers);
        } else if (question.questionType === 'SHORT_ANSWER') {
          question.possibleAnswers = [];
        }
      })
    ));
    values.visibility = !values.visibility || values.visibility === 'PRIVATE' ? 'PRIVATE' : 'PUBLIC';
    if (isEditForm) {
      updateInterview({
        id,
        params: values
      })
        .then(publish)
        .then(() => {
          afterSaving(isPublishAction ? intl.formatMessage({ defaultMessage: 'Assessment Published.' }) : intl.formatMessage({ defaultMessage: 'Assessment Saved.' }));
        })
        .catch((error) => {
          message.error({
            content: error.response.data.message,
            key: interviewMessageKey,
            duration: 5
          });
          setLoading(false);
        });
    } else {
      createInterview(values)
        .then(publish)
        .then((data) => {
          afterSaving(isPublishAction ? intl.formatMessage({ defaultMessage: 'Assessment Published.' }) : intl.formatMessage({ defaultMessage: 'Assessment Created.' }));
          navigate(`/interviews/${data.id}/edit`);
        });
    }
  };
  const pushSection = (id, name) => (
    setAnchorSections([...anchorSections, {
      href: `#${id}`,
      title: name,
      subAnchors: [{
        href: `#${id}_question_${0}`,
        title: 'Q 1'
      }]
    }])
  );
  const popSection = (index) => {
    let removed = [...anchorSections];
    removed.splice(index, 1);
    removed = removed.map((section, sindex) => {
      return {
        ...section,
        href: `#section_${sindex}`,
        subAnchors: section.subAnchors.map((subAnchor, index) => (
          {
            ...subAnchor,
            href: `#section_${sindex}_question_${index}`
          }
        ))
      };
    });
    setAnchorSections(removed);
  };

  const pushQuestion = (index, sectionIndex) => {
    const updatedSubAnchors = [...anchorSections[sectionIndex].subAnchors, {
      href: `#section_${sectionIndex}_question_${index}`,
      title: `Q ${index + 1}`
    }];
    const updatedAnchors = [...anchorSections];
    updatedAnchors[sectionIndex].subAnchors = updatedSubAnchors;
    //...anchorSections[sectionIndex], subAnchors: subAnchors.
    setAnchorSections(updatedAnchors);
  };

  const popQuestion = (index, sectionIndex) => {
    let removed = [...anchorSections[sectionIndex].subAnchors];
    removed.splice(index, 1);
    removed = removed.map((question, qindex) => {
      return {
        ...question,
        title: `Q ${qindex + 1}`,
        href: `#section_${sectionIndex}_question_${qindex}`
      };
    });
    const updatedAnchors = [...anchorSections];
    updatedAnchors[sectionIndex].subAnchors = removed;
    setAnchorSections(updatedAnchors);
  };

  const onSectionTitleChange = (index, e) => {
    anchorSections[index].title = e.target.value;
    setAnchorSections([...anchorSections]);
  };

  const onOpenSelectQuestionModal = (sectionIndex) => {
    sectionIndexOfAddingQuestion = sectionIndex;
    getQuestions()
      .then((data) => {
        setQuestionList(data.results);
        setIsSelectedQuestionVisible(true);
      });
  };

  const onSelectQuestions = () => {
    setIsSelectedQuestionVisible(false);
    const formdata = form.getFieldValue();
    if (!formdata.sections[sectionIndexOfAddingQuestion].questions) {
      formdata.sections[sectionIndexOfAddingQuestion].questions = [];
    }
    selectedQuestions?.map((question, index) => (
      pushQuestion(formdata.sections[sectionIndexOfAddingQuestion].questions.length + index, sectionIndexOfAddingQuestion)));
    formdata.sections[sectionIndexOfAddingQuestion].questions = [...formdata.sections[sectionIndexOfAddingQuestion].questions, ...selectedQuestions];
    form.setFieldsValue(formdata);
    setSelectedQuestionIds([]);
    selectedQuestions = [];
  };

  const handleSelectQuestions = (question) => {
    if (!selectedQuestionIds.includes(question.id)) {
      selectedQuestions = [...selectedQuestions, question];
      setSelectedQuestionIds(
        [...selectedQuestionIds, question.id]
      );
    } else {
      setSelectedQuestionIds(selectedQuestionIds.filter((selectedQuestionId) => (
        selectedQuestionId !== question.id
      )));
      selectedQuestions = selectedQuestions.filter((selectedQuestion) => (
        selectedQuestion.id !== question.id
      ));
    }
  };

  const handleCloseSelectQuestionsModal = () => {
    setSelectedQuestionIds([]);
    selectedQuestions = [];
    setIsSelectedQuestionVisible(false);
  };

  const handleSave = () => {
    isPublishAction = false;
    form.submit();
  };
  const handlePublish = () => {
    isPublishAction = true;
    form.submit();
  };

  let moveQuestions;
  const handleReorderQuestions = (result) => {
    if (!result.destination) {
      return;
    }
    moveQuestions(result.source.index, result.destination.index);
  };
  return (
    <>
      <Modal
        visible={isSelectedQuestionVisible}
        title={intl.formatMessage({ defaultMessage: 'Select Questions' })}
        onCancel={handleCloseSelectQuestionsModal}
        footer={[
          <Button
            key="back"
            onClick={handleCloseSelectQuestionsModal}
          >
            <FormattedMessage defaultMessage="Close"/>
          </Button>,
          <Button
            key="submit"
            type="primary"
            onClick={onSelectQuestions}
          >
            <FormattedMessage defaultMessage="Select"/>
          </Button>
        ]}
      >
        <QuestionList
          dataSource={questionList}
          isModal
          onSelectQuestion={handleSelectQuestions}
          selectedQuestions={selectedQuestionIds}
        />
      </Modal>
      <CustomBreadcrumb crumbs={[{
        label: <FormattedMessage defaultMessage="List Assessments"/>,
        path: '/interviews'
      }, {
        label: isEditForm ? intl.formatMessage({ defaultMessage: 'Edit Assessment' }) : intl.formatMessage({ defaultMessage: 'Create Assessment' }),
        path: location.pathname
      }]}/>
      <LoginNeededWrapper
        title={<FormattedMessage defaultMessage="Login to manage Assessments"/>}
        subTitle={<FormattedMessage
          defaultMessage="Please login to enable abilities to create/edit your Assessments."/>}
        isLoginNeeded={!isGetStarted}
      >
        <Headline
          title={isEditForm ? intl.formatMessage({ defaultMessage: 'Edit Assessment' }) : intl.formatMessage({ defaultMessage: 'Create Assessment' })}>
          {
            isEditForm &&
            <>
              <a href={location.pathname.replace(`${id}/edit`, `${id}`)}
                 target="_blank">
                <FormattedMessage defaultMessage="view latest Assessment"/></a>
              {
                publishedInterviewId
                &&
                <a
                  href={location.pathname.replace(`${id}/edit`, `${publishedInterviewId}/published`)}
                  target="_blank">
                  <FormattedMessage defaultMessage="view live version"/></a>
              }
            </>
          }

        </Headline>
        <Layout style={{ position: 'relative' }}>
          <AnchorSider anchors={anchorSections}/>
          <Content>
            <Spin spinning={loading} indicator={<LoadingOutlined spin/>}>
              <Form
                layout={'vertical'}
                onFinish={onFinish}
                form={form}
                scrollToFirstError
              >
                <StyledVisibilityDiv>
                  <FormItem label="Visibility" name="visibility" valuePropName="checked" noStyle>
                    <Switch checkedChildren={intl.formatMessage({ defaultMessage: 'Public' })}
                            unCheckedChildren={intl.formatMessage({ defaultMessage: 'Private' })}/>
                  </FormItem>
                </StyledVisibilityDiv>
                <FormItem
                  label={intl.formatMessage({ defaultMessage: 'Title' })}
                  name="title"
                  rules={[{
                    required: true,
                    message: intl.formatMessage({ defaultMessage: 'Please enter interview\'s Title' })
                  }]}
                >
                  <Input/>
                </FormItem>
                {/*<FormItem*/}
                {/*  label={intl.formatMessage({ defaultMessage: 'Specialization' })}*/}
                {/*  name="specializationId"*/}
                {/*  rules={[{*/}
                {/*    required: true,*/}
                {/*    message: intl.formatMessage({ defaultMessage: 'Please choose a Specialization' })*/}
                {/*  }]}*/}
                {/*>*/}
                {/*  <Select*/}
                {/*    showSearch*/}
                {/*    style={{ width: 200 }}*/}
                {/*    placeholder={intl.formatMessage({ defaultMessage: 'Select a Specialization' })}*/}
                {/*    optionFilterProp="children"*/}
                {/*    filterOption={(input, option) => option.children.toLowerCase()*/}
                {/*      .indexOf(input.toLowerCase()) >= 0}*/}
                {/*  >*/}
                {/*    {specializations.map((spec) => (*/}
                {/*      <Select.Option key={spec.id} value={spec.id}>{spec.name}</Select.Option>*/}
                {/*    ))}*/}
                {/*  </Select>*/}
                {/*</FormItem>*/}
                <FormItem
                  label={intl.formatMessage({ defaultMessage: 'Job Title' })}
                  name="jobTitle"
                  rules={[{
                    required: true,
                    message: intl.formatMessage({ defaultMessage: 'Please enter Job Title' })
                  }]}
                  size="small"
                >
                  {/*<StyledAutoComplete*/}
                  {/*  value={jobTitle}*/}
                  {/*  options={jobOptions}*/}
                  {/*  style={{*/}
                  {/*    width: 200*/}
                  {/*  }}*/}
                  {/*  onSearch={onJobTitleSearch}*/}
                  {/*  onChange={onJobTitleChange}*/}
                  {/*/>*/}
                  <Input/>
                </FormItem>
                <FormItem
                  label={intl.formatMessage({ defaultMessage: 'Description' })}
                  name="description"
                  rules={[{
                    required: true,
                    message: intl.formatMessage({ defaultMessage: 'Assessment description' }),
                    whitespace: true
                  }]}
                >
                  <TextArea
                    placeholder={intl.formatMessage({ defaultMessage: 'Assessment description' })}
                    autoSize={{
                      minRows: 4
                    }}
                  />
                </FormItem>
                <FormItem
                  label={intl.formatMessage({ defaultMessage: 'Duration' })}
                  name="defaultDuration"
                >
                  <Select
                    placeholder={intl.formatMessage({ defaultMessage: 'Please select assess duration' })}
                    allowClear
                  >
                    <Option value={0}><FormattedMessage defaultMessage="No limit"
                                                        values={{ minutes: 0 }}/> </Option>
                    <Option value={30}><FormattedMessage defaultMessage="{minutes} Minutes"
                                                         values={{ minutes: 30 }}/> </Option>
                    <Option value={60}><FormattedMessage defaultMessage="{minutes} Minutes"
                                                         values={{ minutes: 60 }}/></Option>
                    <Option value={90}><FormattedMessage defaultMessage="{minutes} Minutes"
                                                         values={{ minutes: 90 }}/></Option>
                    <Option value={120}><FormattedMessage defaultMessage="{minutes} Minutes"
                                                          values={{ minutes: 120 }}/></Option>
                  </Select>
                </FormItem>
                <FormItem
                  label={
                    <FormattedMessage defaultMessage={'Show Answer Immediately:'}/>
                  }
                  name="releaseResult"
                  tooltip={intl.formatMessage({ defaultMessage: 'choose yes if you want your candidate can see answers right after submitting.' })}
                >
                  <Select
                    defaultValue="NO"
                  >
                    <Option value="YES"><FormattedMessage defaultMessage="YES"/></Option>
                    <Option value="NO"><FormattedMessage defaultMessage="NO"/> </Option>
                  </Select>
                </FormItem>
                {(!!organization || isGetStarted) &&
                <FormItem
                  label={
                    <FormattedMessage id="interview.form.ownershipType"
                                      defaultMessage={'Belongs to:'}/>
                  }
                  name="ownershipType"
                  tooltip={intl.formatMessage({
                    id: 'interview.form.ownershipType.tooltip',
                    defaultMessage: 'Whether the assessment should belongs to yourself or organization.'
                  })}
                >
                  <Select
                    defaultValue="DEFAULT"
                    disabled={isEditForm}
                  >
                    <Option value="PERSONAL"><FormattedMessage
                      id="interview.form.ownershipType.individual"
                      defaultMessage="Individual"/></Option>
                    <Option value="DEFAULT"><FormattedMessage
                      id="interview.form.ownershipType.organization" defaultMessage="Organization"/>
                    </Option>
                  </Select>
                </FormItem>
                }
                <Form.List name="sections">
                  {(sections, {
                    add: addSection,
                    remove: removeSection
                  }) => (
                    <>
                      {sections.map((section, sectionIndex) => (
                        <div key={`section_${section.name}`}>
                          <h2 id={`section_${section.name}`}>
                            {
                              sections.length > 1 &&
                              <ConfirmModal
                                title={<FormattedMessage defaultMessage="Remove Section"/>}
                                danger
                                openButtonTitle=""
                                submitButtonTitle={<FormattedMessage defaultMessage="Remove"/>}
                                icon={<Tooltip title={<FormattedMessage
                                  defaultMessage="Remove Section"/>}><MinusCircleOutlined/></Tooltip>}
                                shape={'circle'}
                                style={{ border: '0px' }}
                                onOK={() => {
                                  removeSection(section.name);
                                  popSection(sectionIndex);
                                }}
                              >
                                <FormattedMessage
                                  defaultMessage="Are you sure to remove the section?"/>
                              </ConfirmModal>
                            }
                            <FormattedMessage defaultMessage="Section"/>
                            {' '}
                            <FormItem name={[sectionIndex, 'title']} noStyle>
                              <Input
                                style={{ width: 160 }}
                                onChange={onSectionTitleChange.bind(this, sectionIndex)}
                              />
                            </FormItem>
                            <Tooltip
                              title={intl.formatMessage({ defaultMessage: 'Organize your questions via Sections like Basic Concept or Design Pattern' })}
                            >
                              <StyledQuestionCircleOutlined/>
                            </Tooltip>
                          </h2>

                          <DragDropContext onDragEnd={handleReorderQuestions}>
                            <Droppable droppableId="droppable">
                              {(provided, snapshot) => (
                                <div {...provided.droppableProps}
                                     ref={provided.innerRef}
                                     style={getListStyle(snapshot.isDraggingOver)}>
                                  <Form.List
                                    name={[sectionIndex, 'questions']}
                                  >
                                    {(questions, {
                                      add: addQuestion,
                                      remove: removeQuestion,
                                      move
                                    }) => {
                                      moveQuestions = move;
                                      return (
                                        <>
                                          {questions.map((question, questionIndex) => (
                                            <Draggable key={`question_${questionIndex}`}
                                                       draggableId={`question_${questionIndex}`}
                                                       index={questionIndex}
                                            >
                                              {(provided, snapshot) => (
                                                <StyledQuestionSection
                                                  key={question.name}
                                                  ref={provided.innerRef}
                                                  {...provided.draggableProps}
                                                  style={getItemStyle(
                                                    snapshot.isDragging,
                                                    provided.draggableProps.style
                                                  )}
                                                >
                                                  {
                                                    questions.length > 1 &&
                                                    <>
                                                      <ConfirmModal title={<FormattedMessage
                                                        defaultMessage="Remove Question"/>}
                                                                    danger
                                                                    openButtonTitle=""
                                                                    submitButtonTitle={
                                                                      <FormattedMessage
                                                                        defaultMessage="Remove"/>}
                                                                    icon={<Tooltip
                                                                      title={<FormattedMessage
                                                                        defaultMessage="Remove Question"/>}><MinusCircleOutlined/></Tooltip>}
                                                                    shape={'circle'}
                                                                    style={{ border: '0px' }}
                                                                    onOK={() => {
                                                                      removeQuestion(question.name);
                                                                      popQuestion(questionIndex, sectionIndex);
                                                                    }}
                                                      >
                                                        <FormattedMessage
                                                          defaultMessage="Are you sure to remove the question?"/>
                                                      </ConfirmModal>
                                                      <Tooltip
                                                        title={intl.formatMessage({
                                                          id: 'interview.questions.reorder.tooltip',
                                                          defaultMessage: 'Reorder questions in section'
                                                        })}>
                                                        <RetweetOutlined {...provided.dragHandleProps}
                                                                         style={{
                                                                           float: 'right',
                                                                           fontSize: '20px'
                                                                         }}/>
                                                      </Tooltip>
                                                    </>
                                                  }
                                                  <span
                                                    id={`section_${sectionIndex}_question_${question.name}`}>{`Q ${question.name + 1}`}</span>
                                                  <QuestionForm id={question.name}
                                                                sectionId={sectionIndex}
                                                                form={form}/>
                                                </StyledQuestionSection>
                                              )}
                                            </Draggable>
                                          ))}
                                          <StyledQuestionSection key={section}
                                                                 style={{
                                                                   textAlign: 'center',
                                                                   position: 'absolute',
                                                                   bottom: 0,
                                                                   width: '98%'
                                                                 }}>
                                            <Button
                                              onClick={() => {
                                                addQuestion({ ...defaultQuestion });
                                                pushQuestion(questions.length, sectionIndex);
                                              }}
                                            >
                                              <PlusOutlined/>
                                              {' '}
                                              <FormattedMessage
                                                defaultMessage="Add a New Question"/>
                                            </Button>
                                            <Button
                                              onClick={onOpenSelectQuestionModal.bind(this, sectionIndex)}
                                            >
                                              <PlusOutlined/>
                                              {' '}
                                              <FormattedMessage
                                                defaultMessage="Select an Existed Question"/>
                                            </Button>
                                          </StyledQuestionSection>
                                        </>
                                      );
                                    }}
                                  </Form.List>
                                  {provided.placeholder}
                                </div>
                              )}
                            </Droppable>
                          </DragDropContext>

                        </div>
                      ))}
                      <Divider/>
                      <Button
                        onClick={() => {
                          addSection({
                            title: defaultSectionTitle,
                            questions: [{ ...defaultQuestion }]
                          });
                          pushSection(`section_${sections.length}`, defaultSectionTitle);
                        }}
                        style={{
                          width: '100%',
                          margin: '10px 0'
                        }}
                      >
                        <PlusOutlined/>
                        {' '}
                        <FormattedMessage defaultMessage="Add Section"/>
                      </Button>
                    </>
                  )}
                </Form.List>
                <Button type="link">
                  <Link to="/interviews" replace><FormattedMessage
                    defaultMessage="Back to List"/></Link>
                </Button>
                {/*wrap tooltip if it's getStarted mode*/}
                {
                  (() => {
                    const _button = (
                      <Button type="primary" onClick={handleSave} disabled={isGetStarted}>
                        {isEditForm ? <FormattedMessage defaultMessage="Update"/> :
                          <FormattedMessage defaultMessage="Create"/>}
                      </Button>
                    );
                    if (isGetStarted) {
                      return (
                        <Tooltip
                          title={intl.formatMessage({ defaultMessage: 'cannot do this in Get Started' })}
                          popupVisible={isGetStarted}
                        >
                          {_button}
                        </Tooltip>
                      );
                    }
                    return _button;
                  })()
                }
                <Button type="primary" onClick={handlePublish}>
                  <FormattedMessage defaultMessage="Publish"/>
                </Button>
              </Form>
            </Spin>
          </Content>
        </Layout>
      </LoginNeededWrapper>
      <Seo
        subTitle={isEditForm ? intl.formatMessage({ defaultMessage: 'Edit Assessment' }) : intl.formatMessage({ defaultMessage: 'Create Assessment' })}/>
    </>
  );
};

export default InterviewForm;

InterviewForm.propTypes = {
  id: PropTypes.any,
  onPublished: PropTypes.func
};

InterviewForm.defaultProps = {
  onPublished: () => {
  }
};
