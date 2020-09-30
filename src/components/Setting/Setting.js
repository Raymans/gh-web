import React, { useEffect, useState } from 'react';
import {
  Avatar, Button, Checkbox, Form, Input, message, Spin, Upload,
} from 'antd';
import FormItem from 'antd/lib/form/FormItem';
import {
  LoadingOutlined, PlusOutlined, UploadOutlined, UserOutlined,
} from '@ant-design/icons';
import styled from 'styled-components';
import { useAuth0 } from '@auth0/auth0-react';
import Headline from '../Article/Headline';
import CustomBreadcrumb from '../CustomBreadcrumb';
import useApi from '../../hooks/useApi';
import Seo from '../Seo';

const FlexAvatarDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const StyledAvatar = styled(Avatar)`
  margin-bottom: 15px;
  cursor: pointer;
`;

function getBase64(img, callback) {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
}

function beforeUpload(file) {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
  if (!isJpgOrPng) {
    message.error('You can only upload JPG/PNG file!');
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error('Image must smaller than 2MB!');
  }
  return isJpgOrPng && isLt2M;
}

const Setting = () => {
  const { user } = useAuth0();
  const { getUserProfile, updateUserProfile } = useApi();
  const [profile, setProfile] = useState({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [form] = Form.useForm();
  const [uploadImage, setUploadingImage] = useState({
    loading: false,
    imageUrl: 'https://avatars0.githubusercontent.com/u/5819635?s=400&u=28fed09b4c20e36c8dfa58063d3dedfa93bee04c&v=4',
  });
  useEffect(() => {
    getUserProfile(user?.sub).then((res) => {
      form.setFieldsValue({
        ...res,
      });
      // setProfile(res);
      setLoading(false);
    });
  }, []);

  const normFile = (e) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  };
  const onFinish = (values) => {
    console.log(values);
    // setSaving(true);
    updateUserProfile(values);
  };

  const handleChange = (info) => {
    if (info.file.status === 'uploading') {
      setUploadingImage({
        ...uploadImage,
        loading: true,
      });
      return;
    }
    if (info.file.status === 'done') {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj, (imageUrl) => setUploadingImage({
        imageUrl,
        loading: false,
      }));
    }
  };
  const uploadButton = (
    <div>
      {uploadImage.loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div className="ant-upload-text">Upload</div>
    </div>
  );
  return (
    <>
      <CustomBreadcrumb crumbs={[{ label: 'Setting', path: '/setting' }]} />
      <Headline title="Setting" />
      <Spin spinning={loading} indicator={<LoadingOutlined spin />}>
        <Form layout="vertical" onFinish={onFinish} scrollToFirstError form={form}>
          <h2>Profile</h2>
          <Form.Item
            name="avatar"
            label="Avatar"
            valuePropName="fileList"
            getValueFromEvent={normFile}
          >
            <Upload
              name="avatar"
              showUploadList={false}
              action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
              beforeUpload={beforeUpload}
              onChange={handleChange}
            >
              <FlexAvatarDiv>
                {uploadImage.imageUrl
                  ? (
                    <StyledAvatar
                      size={150}
                      src={uploadImage.imageUrl ? uploadImage.imageUrl : uploadButton}
                    />
                  ) : <StyledAvatar size={150} icon={<UserOutlined />} />}
                <Button>
                  <UploadOutlined />
                  {' Edit '}
                </Button>
              </FlexAvatarDiv>
            </Upload>
          </Form.Item>
          <FormItem name="email" label="Email" rules={[{ type: 'email' }]} required>
            <Input />
          </FormItem>
          <FormItem name="github" label="GitHub username">
            <Input />
          </FormItem>
          <FormItem name="linkedIn" label="LinkedIn">
            <Input />
          </FormItem>
          <FormItem name="company" label="Company">
            <Input />
          </FormItem>
          <FormItem name="note" label="Note">
            <Input />
          </FormItem>
          <br />
          <Form.Item>
            <Button type="primary" loading={saving} htmlType="submit">
            Update Profile
            </Button>
          </Form.Item>
          <br />
        </Form>
        <Form layout="vertical" onFinish={onFinish} scrollToFirstError>
          <h2>Password</h2>
          <FormItem name="oldPassword" label="Old password" rules={[{ required: true }]}>
            <Input defaultValue="" />
          </FormItem>
          <FormItem name="newPassword" label="New password" required>
            <Input defaultValue="" />
          </FormItem>
          <FormItem name="confirmPassword" label="Confirm new password" required>
            <Input defaultValue="" />
          </FormItem>
          <br />
          <Form.Item>
            <Button type="primary" loading={saving} htmlType="submit">
            Update Password
            </Button>
          </Form.Item>
          <br />
        </Form>
        <Form layout="vertical" onFinish={onFinish} scrollToFirstError>
          <h2>Notification</h2>
          <Checkbox>
            {'Receives email Notification when a new candidate start testing your interviews'}
          </Checkbox>

          <br />
          <Form.Item>
            <Button type="primary" loading={saving} htmlType="submit">
            Update Notification
            </Button>
          </Form.Item>
          <br />
        </Form>
      </Spin>
      <Seo subTitle="Setting" />
    </>
  );
};
Setting.propTypes = {};

export default Setting;
