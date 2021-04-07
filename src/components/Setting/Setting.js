import React, { useEffect, useState } from 'react';
import {
  Button, Checkbox, Form, Input, Spin,
} from 'antd';
import FormItem from 'antd/lib/form/FormItem';
import { LoadingOutlined } from '@ant-design/icons';
import { useAuth0 } from '@auth0/auth0-react';
import Headline from '../Article/Headline';
import CustomBreadcrumb from '../CustomBreadcrumb';
import useApi from '../../hooks/useApi';
import Seo from '../Seo';
import UploadImage from '../UploadImgae/UploadImage';

const Setting = () => {
  const { user } = useAuth0();
  const { getUserProfile, updateUserProfile } = useApi();
  const [profile, setProfile] = useState({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [form] = Form.useForm();
  useEffect(() => {
    if (!user) {
      return;
    }
    getUserProfile(user.sub)
      .then((res) => {
        form.setFieldsValue({
          ...res,
        });
        // setProfile(res);
        setLoading(false);
      });
  }, [user]);

  const onFinish = (values) => {
    console.log(values);
    // setSaving(true);
    updateUserProfile(values);
  };

  return (
    <>
      <CustomBreadcrumb crumbs={[{
        label: 'Setting',
        path: '/setting',
      }]}
      />
      <Headline title="Setting" />
      <Spin spinning={loading} indicator={<LoadingOutlined spin />}>
        <Form layout="vertical" onFinish={onFinish} scrollToFirstError form={form}>
          <h2>Profile</h2>
          <UploadImage name="avatar" />
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
            Receives email Notification when a new candidate start testing your interviews
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
