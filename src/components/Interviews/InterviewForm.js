import {
  AutoComplete, Button, Form, Input, Layout, Select, Tooltip,
} from 'antd';
import React, { useState } from 'react';
import styled from 'styled-components';
import Divider from 'antd/lib/divider';
import FormItem from 'antd/lib/form/FormItem';
import TextArea from 'antd/lib/input/TextArea';
import { Link } from 'gatsby-plugin-intl';
import { PlusOutlined, QuestionCircleOutlined } from '@ant-design/icons';
import QuestionForm from '../Question';
import AnchorSilder from '../Sider/AnchorSider';
import transformSwitchValue from '../../utils/questionHelpers';
import { createInterview } from '../../utils/api';
import Headline from '../Article/Headline';

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

const StyledSection = styled.div`
  border: 1px;
  border-style: double;
  border-radius: 11px;
  padding: 10px;
  border-color: lightgray;
  margin-bottom: 24px;
`;

const mockVal = (str, repeat = 1) => ({
  value: str.repeat(repeat),
});

const InterviewForm = () => {
  const [form] = Form.useForm();
  const [value, setValue] = useState('');
  const [options, setOptions] = useState([]);
  const [sections, setSections] = useState([]);

  function onSpecialityChange(val) {
    console.log(`selected ${val}`);
  }

  function onBlur() {
    console.log('blur');
  }

  function onFocus() {
    console.log('focus');
  }

  function onSpecialitySearch(val) {
    console.log('search:', val);
  }

  const onSearch = (searchText) => {
    setOptions(
      !searchText ? [] : [mockVal(searchText), mockVal(searchText, 2), mockVal(searchText, 3)],
    );
  };

  const onSelect = (data) => {
    console.log('onSelect', data);
  };

  const onChange = (data) => {
    setValue(data);
  };

  const onFinish = (values) => {
    values.sections.map((section) => (
      section.questions.map((question) => (
        question.possibleAnswers = transformSwitchValue(question.possibleAnswers)
      ))
    ));
    createInterview(values).then(console.log('success'));
  };
  const addSection = (id, name) => (
    setSections([...sections, { href: `#${id}`, title: name }])
  );
  const onSectionTitleChange = (index, e) => {
    sections[index].title = e.target.value;
    setSections([...sections]);
  };
  return (
    <>
      <Headline title="Create Interview" />
      <Layout>
        <AnchorSilder anchors={sections} />
        <Content>
          <Form {...inputLayout} onFinish={onFinish} form={form}>
            <FormItem label="Name" name="interviewName" rules={[{ required: true, whitespace: true }]}>
              <Input />
            </FormItem>
            <FormItem
              label="Speciality"
              name="speciality"
              rules={[{ required: true, message: 'Please choose a Speciality' }]}
            >
              <Select
                showSearch
                style={{ width: 200 }}
                placeholder="Select a speciality"
                optionFilterProp="children"
                onChange={onSpecialityChange}
                onFocus={onFocus}
                onBlur={onBlur}
                onSearch={onSpecialitySearch}
                filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
              >
                <Select.Option value="UX">UX Designer</Select.Option>
                <Select.Option value="UI">UI Engineer</Select.Option>
                <Select.Option value="FE">Frontend Engineer</Select.Option>
                <Select.Option value="BE">Backend Engineer</Select.Option>
                <Select.Option value="FSE">Full Stack Engineer</Select.Option>
              </Select>
            </FormItem>
            <FormItem
              label="Job Title"
              name="jobTitle"
              rules={[{ required: true, message: 'Please enter Job Title' }]}
              size="small"
            >
              <StyledAutoComplete
                value={value}
                options={options}
                style={{
                  width: 200,
                }}
                onSelect={onSelect}
                onSearch={onSearch}
                onChange={onChange}
              />
            </FormItem>
            <FormItem
              label="Description"
              name="interviewDes"
              rules={[{
                required: true,
                message: 'Interview description',
                whitespace: true,
              }]}
            >
              <TextArea placeholder="Interview description" autoSize={{ minRows: 2, maxRows: 6 }} />
            </FormItem>
            <Form.List name="sections">
              {(fields, { add, remove }) => (
                <>
                  {fields.map((field, index) => (
                    <>
                      <h2 id={`section_${index}`}>
                        Section
                        {' '}
                        <FormItem name={[index, 'title']} noStyle>
                          <Input
                            style={{ width: 160 }}
                            defaultValue="default"
                            onChange={onSectionTitleChange.bind(this, index)}
                          />
                        </FormItem>
                        <Tooltip title="Organize your questions via Sections like Basic Concept or Design Pattern">
                          <StyledQuestionCircleOutlined />
                        </Tooltip>

                      </h2>

                      <Form.List name={[index, 'questions']}>
                        {(fields, { add, remove }) => (
                          <>
                            {fields.map((field, index) => (
                              <StyledSection key={field}>
                                <QuestionForm id={field.name} form={form} showCreateButton={false} />
                              </StyledSection>
                            ))}
                            <StyledSection key={field} style={{ textAlign: 'center' }}>
                              <Button
                                onClick={() => {
                                  add();
                                }}
                              >
                                <PlusOutlined />
                                {' '}
                                Add Question
                              </Button>
                            </StyledSection>
                          </>
                        )}
                      </Form.List>

                    </>
                  ))}
                  <Divider />
                  <Button
                    onClick={() => {
                      add();
                      addSection(`section_${fields.length}`, 'default');
                    }}
                    style={{ width: '100%', margin: '10px 0' }}
                  >
                    <PlusOutlined />
                    {' '}
                    Add Section
                  </Button>
                </>
              )}
            </Form.List>
            {/* <h2 id="question1">Q.1</h2> */}
            {/* <QuestionForm form={form} showCreateButton={false} /> */}
            {/* <h2 id="question2">Q.2</h2> */}
            {/* <QuestionForm form={form} showCreateButton={false} /> */}
            {/* <h2 id="question3">Q.3</h2> */}
            {/* <QuestionForm form={form} showCreateButton={false} /> */}
            {/* <h2 id="question4">Q.4</h2> */}
            {/* <QuestionForm form={form} showCreateButton={false} /> */}
            {/* <QuestionForm form={form} showCreateButton={false} /> */}
            {/* <QuestionForm form={form} showCreateButton={false} /> */}
            {/* <QuestionForm form={form} showCreateButton={false} /> */}
            <Button type="primary" htmlType="submit">
              Create Interview
            </Button>
            <Button type="link">
              <Link to="/interviews" replace>Back</Link>
            </Button>
          </Form>
        </Content>
      </Layout>
    </>
  );
};

export default InterviewForm;
