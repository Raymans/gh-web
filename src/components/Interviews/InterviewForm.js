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
  Tooltip,
} from 'antd';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Divider from 'antd/lib/divider';
import FormItem from 'antd/lib/form/FormItem';
import TextArea from 'antd/lib/input/TextArea';
import { Link, navigate } from 'gatsby-plugin-intl';
import {
  LoadingOutlined,
  MinusCircleOutlined,
  PlusOutlined,
  QuestionCircleOutlined,
} from '@ant-design/icons';
import transformSwitchValue from '../../utils/questionHelpers';
import Headline from '../Article/Headline';
import QuestionList from '../Questions/QuestionList';
import QuestionForm from '../Questions/QuestionForm';
import CustomBreadcrumb from '../CustomBreadcrumb';
import useApi from '../../hooks/useApi';
import Seo from '../Seo';

const {
  Content,
} = Layout;

const inputLayout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 20 },
};

const StyledQuestionCircleOutlined = styled(QuestionCircleOutlined)`
  margin: 10px;
  font-size: 0.7em;
`;

const StyledAutoComplete = styled(AutoComplete)`
  width: 100% !important;
`;

const StyledQuestionSection = styled.div`
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
  value: str.repeat(repeat),
});

let sectionIndexOfAddingQuestion = 0;
let numberOfSection = 0;
const interviewMessageKey = 'interviewMessage';
let selectedQuestions = [];
let isPublishAction = false;

const InterviewForm = ({ id }) => {
  const isEditForm = !!id;
  const {
    createInterview, getInterview, getQuestions, getSpecializations, updateInterview, publishInterview,
  } = useApi();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [jobTitle, setJobTitle] = useState('');
  const [jobOptions, setJobTitleOptions] = useState([]);
  const [anchorSections, setAnchorSections] = useState([]);
  const [specializations, setSpecializations] = useState([]);
  const [isSelectedQuestionVisible, setIsSelectedQuestionVisible] = useState(false);
  const [questionList, setQuestionList] = useState([]);
  const [selectedQuestionIds, setSelectedQuestionIds] = useState([]);
  const [publishedInterviewId, setPublishedInterviewId] = useState(null);

  useEffect(() => {
    numberOfSection = 0;

    getSpecializations()
      .then(((data = []) => {
        setSpecializations(data);
      }));
    if (isEditForm) {
      setLoading(true);
      getInterview(id)
        .then((data = { sections: [] }) => {
          data.visibility = data.visibility === 'PUBLIC';
          form.setFieldsValue({
            ...data,
            specializationId: data.specialization.id,
            defaultDuration: data.defaultDuration === -1 ? '' : data.defaultDuration,
          });
          setAnchorSections(data.sections.map((section, index) => ({
            href: `#section_${index}`,
            title: section.title,
          })));
          numberOfSection = data.sections.length;
          setPublishedInterviewId(data.publishedInterviewId);
          setLoading(false);
        });
    }
  }, []);

  const onJobTitleSearch = (searchText) => {
    setJobTitleOptions(
      !searchText ? [] : [mockVal(searchText), mockVal(searchText, 2), mockVal(searchText, 3)],
    );
  };

  const onJobTitleChange = (data) => {
    setJobTitle(data);
  };

  const beforeSaving = () => {
    setLoading(true);
    message.loading({
      content: 'Saving',
      key: interviewMessageKey,
    });
  };

  const afterSaving = (content) => {
    message.success({
      content,
      key: interviewMessageKey,
      duration: 3,
    });
    setLoading(false);
  };

  const publish = (data) => {
    if (isPublishAction) {
      return publishInterview({ id: data.id }).then((pi) => {
        setPublishedInterviewId(pi.interview.publishedInterviewId);
      });
    }
    return data;
  };
  const onFinish = (values) => {
    beforeSaving();
    values.sections && values.sections.map((section) => (
      section.questions && section.questions.map((question) => (
        question.possibleAnswers = transformSwitchValue(question.possibleAnswers)
      ))
    ));
    values.visibility = !values.visibility || values.visibility === 'PRIVATE' ? 'PRIVATE' : 'PUBLIC';
    if (isEditForm) {
      updateInterview({ id, params: values }).then(publish)
        .then(() => {
          afterSaving(isPublishAction ? 'Interview Published.' : 'Interview Saved.');
        }).catch((error) => {
          message.error({
            content: error.response.data.message,
            key: interviewMessageKey,
            duration: 5,
          });
          setLoading(false);
        });
    } else {
      createInterview(values)
        .then(publish)
        .then((data) => {
          afterSaving(isPublishAction ? 'Interview Published.' : 'Interview Created.');
          navigate(`/interviews/${data.id}/edit`);
        });
    }
  };
  const pushSection = (id, name) => (
    setAnchorSections([...anchorSections, {
      href: `#${id}`,
      title: name,
    }])
  );
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
    formdata.sections[sectionIndexOfAddingQuestion].questions = [...formdata.sections[sectionIndexOfAddingQuestion].questions, ...selectedQuestions];
    form.setFieldsValue(formdata);
    setSelectedQuestionIds([]);
    selectedQuestions = [];
  };

  const handleSelectQuestions = (question) => {
    if (!selectedQuestionIds.includes(question.id)) {
      selectedQuestions = [...selectedQuestions, question];
      setSelectedQuestionIds(
        [...selectedQuestionIds, question.id],
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
  return (
    <>
      <Modal
        visible={isSelectedQuestionVisible}
        title="Select Questions"
        onCancel={handleCloseSelectQuestionsModal}
        footer={[
          <Button
            key="back"
            onClick={handleCloseSelectQuestionsModal}
          >
            Close
          </Button>,
          <Button
            key="submit"
            type="primary"
            onClick={onSelectQuestions}
          >
            Select
          </Button>,
        ]}
      >
        <QuestionList
          dataSource={questionList}
          isModal
          onSelectQuestion={handleSelectQuestions}
          selectedQuestions={selectedQuestionIds}
        />
      </Modal>
      <CustomBreadcrumb crumbs={[{ label: 'List Interviews', path: '/interviews' }, { label: isEditForm ? 'Interview - edit' : 'Interview - create', path: location.pathname }]} />
      <Headline title={isEditForm ? 'Interview - edit' : 'Interview - create'}>
        {
          publishedInterviewId
          && <Link to={`/interviews/${publishedInterviewId}/published`} target="_blank">Published</Link>
        }
      </Headline>
      <Layout>
        {/* <AnchorSilder anchors={anchorSections} /> */}
        <Content>
          <Spin spinning={loading} indicator={<LoadingOutlined spin />}>
            <Form {...inputLayout} onFinish={onFinish} form={form} scrollToFirstError>
              <StyledVisibilityDiv>
                <FormItem label="Visibility" name="visibility" valuePropName="checked" noStyle>
                  <Switch checkedChildren="public" unCheckedChildren="private" />
                </FormItem>
              </StyledVisibilityDiv>
              <FormItem
                label="Title"
                name="title"
                rules={[{
                  required: true,
                  whitespace: true,
                }]}
              >
                <Input />
              </FormItem>
              <FormItem
                label="Specialization"
                name="specializationId"
                rules={[{
                  required: true,
                  message: 'Please choose a Specialization',
                }]}
              >
                <Select
                  showSearch
                  style={{ width: 200 }}
                  placeholder="Select a Specialization"
                  optionFilterProp="children"
                  filterOption={(input, option) => option.children.toLowerCase()
                    .indexOf(input.toLowerCase()) >= 0}
                >
                  {specializations.map((spec) => (
                    <Select.Option key={spec.id} value={spec.id}>{spec.name}</Select.Option>
                  ))}
                </Select>
              </FormItem>
              <FormItem
                label="Job Title"
                name="jobTitle"
                rules={[{
                  required: true,
                  message: 'Please enter Job Title',
                }]}
                size="small"
              >
                <StyledAutoComplete
                  value={jobTitle}
                  options={jobOptions}
                  style={{
                    width: 200,
                  }}
                  onSearch={onJobTitleSearch}
                  onChange={onJobTitleChange}
                />
              </FormItem>
              <FormItem
                label="Description"
                name="description"
                rules={[{
                  required: true,
                  message: 'Interview description',
                  whitespace: true,
                }]}
              >
                <TextArea
                  placeholder="Interview description"
                  autoSize={{
                    minRows: 2,
                    maxRows: 6,
                  }}
                />
              </FormItem>
              <FormItem
                label="Duration"
                name="defaultDuration"
              >
                <Input placeholder="Minutes" />
              </FormItem>
              <Form.List name="sections">
                {(sections, { add: addSection, remove: removeSection }) => (
                  <>
                    {sections.map((section, sectionIndex) => (
                      <div key={`section_${section.name}`}>
                        <h2 id={`section_${section.name}`}>
                          <Tooltip title="remove Section">
                            <MinusCircleOutlined style={{ color: 'lightcoral', padding: '0 10px' }} onClick={() => { removeSection(section.name); numberOfSection--; }} />
                          </Tooltip>
                          Section
                          {' '}
                          <FormItem name={[sectionIndex, 'title']} noStyle>
                            <Input
                              style={{ width: 160 }}
                              onChange={onSectionTitleChange.bind(this, sectionIndex)}
                            />
                          </FormItem>
                          <Tooltip
                            title="Organize your questions via Sections like Basic Concept or Design Pattern"
                          >
                            <StyledQuestionCircleOutlined />
                          </Tooltip>
                        </h2>
                        <Form.List name={[sectionIndex, 'questions']}>
                          {(questions, { add: addQuestion, remove: removeQuestion }) => (
                            <>
                              {questions.map((question, quesionIndex) => (
                                <StyledQuestionSection key={question.name}>
                                  <Tooltip title="remove Question">
                                    <MinusCircleOutlined style={{ color: 'lightcoral', padding: '0 10px' }} onClick={() => { removeQuestion(question.name); }} />
                                  </Tooltip>
                                  <QuestionForm id={`${question.name}`} form={form} />
                                </StyledQuestionSection>
                              ))}
                              <StyledQuestionSection key={section} style={{ textAlign: 'center' }}>
                                <Button
                                  onClick={() => {
                                    addQuestion();
                                  }}
                                >
                                  <PlusOutlined />
                                  {' '}
                                  Add a New Question
                                </Button>
                                <Button
                                  onClick={onOpenSelectQuestionModal.bind(this, sectionIndex)}
                                >
                                  <PlusOutlined />
                                  {' '}
                                  Select an Existed Question
                                </Button>
                              </StyledQuestionSection>
                            </>
                          )}
                        </Form.List>

                      </div>
                    ))}
                    <Divider />
                    <Button
                      onClick={() => {
                        addSection();
                        const formdata = form.getFieldValue();
                        formdata.sections[numberOfSection] = { title: 'default' };

                        form.setFieldsValue(formdata);
                        pushSection(`section_${sections.length}`, 'default');
                        numberOfSection++;
                      }}
                      style={{
                        width: '100%',
                        margin: '10px 0',
                      }}
                    >
                      <PlusOutlined />
                      {' '}
                      Add Section
                    </Button>
                  </>
                )}
              </Form.List>
              <Button type="link">
                <Link to="/interviews" replace>Back</Link>
              </Button>
              <Button type="primary" onClick={handleSave}>
                {isEditForm ? 'Update' : 'Create'}
              </Button>
              <Button type="primary" onClick={handlePublish}>
                Publish
              </Button>
            </Form>
          </Spin>
        </Content>
      </Layout>
      <Seo subTitle={isEditForm ? 'Interview - Edit' : 'Interview - Create'} />
    </>
  );
};

export default InterviewForm;
