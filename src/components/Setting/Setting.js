import React, { useContext, useEffect, useState } from 'react';
import { Button, Checkbox, Form, Input, message, Spin } from 'antd';
import FormItem from 'antd/lib/form/FormItem';
import { LoadingOutlined } from '@ant-design/icons';
import Headline from '../Article/Headline';
import CustomBreadcrumb from '../CustomBreadcrumb';
import useApi from '../../hooks/useApi';
import Seo from '../Seo';
import UploadImage from '../UploadImgae/UploadImage';
import { FormattedMessage, useIntl } from 'gatsby-plugin-intl';
import { StoreContext } from '../../context/ContextProvider';

const Setting = () => {
  const intl = useIntl();
  const {
    updateUserProfile,
    updateUserAvatar
  } = useApi();
  const {
    userProfile,
    refreshUserProfile
  } = useContext(StoreContext);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [savingPwd, setSavingPwd] = useState(false);
  const [savingNotifications, setSavingNotifications] = useState(false);
  const [form] = Form.useForm();
  useEffect(() => {
    if (!userProfile) {
      return;
    }
    form.setFieldsValue({
      ...userProfile.metadata,
      ...userProfile
    });
    setLoading(false);
  }, [userProfile]);

  const postSuccess = () => {
    refreshUserProfile();
    message.success(intl.formatMessage({ defaultMessage: 'Setting has been updated successfully!' }));
    setTimeout(() => setSaving(false), 500);
  };
  const onFinish = (values) => {
    setSaving(true);
    if (values.avatar?.file) {
      updateUserAvatar({ file: values.avatar.file.originFileObj })
        .then(() => updateUserProfile(values))
        .then(() => {
          postSuccess();
        });
    } else {
      updateUserProfile(values)
        .then(() => {
          postSuccess();
        });
    }

  };

  return (
    <>
      <CustomBreadcrumb crumbs={[{
        label: <FormattedMessage defaultMessage="Setting"/>,
        path: '/setting'
      }]}
      />
      <Headline title={intl.formatMessage({ defaultMessage: 'Setting' })}/>
      <Spin spinning={loading} indicator={<LoadingOutlined spin/>}>
        <Form layout="vertical" onFinish={onFinish} scrollToFirstError form={form}>
          <h2><FormattedMessage defaultMessage="Profile"/></h2>
          <UploadImage name="avatar" imageUrl={userProfile?.avatar}/>
          <FormItem
            name="email"
            label={<FormattedMessage defaultMessage="Email"/>}
            rules={[{
              required: true,
              type: 'email'
            }]} required>
            <Input/>
          </FormItem>
          <FormItem name="name" label={<FormattedMessage defaultMessage="Name"/>}
                    rules={[{ required: true }]} required>
            <Input/>
          </FormItem>
          <FormItem name="nickname" label={<FormattedMessage defaultMessage="Nickname"/>}>
            <Input/>
          </FormItem>
          <FormItem name="companyName" label={<FormattedMessage defaultMessage="Company Name"/>}>
            <Input/>
          </FormItem>
          <FormItem name="note" label={<FormattedMessage defaultMessage="Note"/>}>
            <Input/>
          </FormItem>
          <FormItem name="github" label={<FormattedMessage defaultMessage="GitHub Profile"/>}>
            <Input addonBefore="https://github.com/"/>
          </FormItem>
          <FormItem name="linkedIn" label="LinkedIn">
            <Input addonBefore="https://www.linkedin.com/in/"/>
          </FormItem>
          <br/>
          <Form.Item>
            <Button type="primary" loading={saving} htmlType="submit">
              <FormattedMessage defaultMessage="Update Profile"/>
            </Button>
          </Form.Item>
          <br/>
        </Form>
        <Form layout="vertical" onFinish={onFinish} scrollToFirstError>
          <h2><FormattedMessage defaultMessage="Password"/></h2>
          <FormItem name="oldPassword"
                    label={intl.formatMessage({ defaultMessage: 'Old password' })}
                    rules={[{ required: true }]}>
            <Input defaultValue=""/>
          </FormItem>
          <FormItem name="newPassword"
                    label={intl.formatMessage({ defaultMessage: 'New password' })} required>
            <Input defaultValue=""/>
          </FormItem>
          <FormItem name="confirmPassword"
                    label={intl.formatMessage({ defaultMessage: 'Confirm new password' })} required>
            <Input defaultValue=""/>
          </FormItem>
          <br/>
          <Form.Item>
            <Button type="primary" loading={savingPwd} htmlType="submit">
              <FormattedMessage defaultMessage="Update Password"/>
            </Button>
          </Form.Item>
          <br/>
        </Form>
        <Form layout="vertical" onFinish={onFinish} scrollToFirstError>
          <h2><FormattedMessage defaultMessage="Notification"/></h2>
          <Checkbox>
            <FormattedMessage
              defaultMessage="Receives email Notification when a new candidate start testing your interviews"/>
          </Checkbox>

          <br/>
          <Form.Item>
            <Button type="primary" loading={savingNotifications} htmlType="submit">
              <FormattedMessage defaultMessage="Update Notification"/>
            </Button>
          </Form.Item>
          <br/>
        </Form>
      </Spin>
      <Seo subTitle={intl.formatMessage({ defaultMessage: 'Setting' })}/>
    </>
  );
};
Setting.propTypes = {};

export default Setting;
