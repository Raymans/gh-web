import React, { useContext, useEffect, useState } from 'react';
import { Button, Form, Input, message, Spin } from 'antd';
import FormItem from 'antd/lib/form/FormItem';
import { LoadingOutlined } from '@ant-design/icons';
import Headline from '../Article/Headline';
import CustomBreadcrumb from '../CustomBreadcrumb';
import useApi from '../../hooks/useApi';
import Seo from '../Seo';
import UploadImage from '../UploadImgae/UploadImage';
import { FormattedMessage, useIntl } from 'gatsby-plugin-intl';
import { StoreContext } from '../../context/ContextProvider';
import AnchorSider from '../Sider/AnchorSider';

const Setting = () => {
  const intl = useIntl();
  const {
    updateUserProfile,
    updateUserAvatar,
    updatePassword
  } = useApi();
  const {
    userProfile,
    refreshUserProfile
  } = useContext(StoreContext);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [savingPwd, setSavingPwd] = useState(false);
  const [form] = Form.useForm();
  const [passwordForm] = Form.useForm();
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

  const onPasswordFinish = (values) => {
    setSavingPwd(true);
    updatePassword(values)
      .then(() => {
        message.success(intl.formatMessage({ defaultMessage: 'Password has been updated successfully!' }));
        setSavingPwd(false);
        passwordForm.resetFields();
      })
      .catch(() => {
        message.error(intl.formatMessage({ defaultMessage: 'Old Password is not matched.' }));
        setSavingPwd(false);
      });
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
        <AnchorSider anchors={[{
          href: '#profile',
          title: <FormattedMessage defaultMessage="Profile"/>
        }, !userProfile?.isSocialMedia && {
          href: '#password',
          title: <FormattedMessage defaultMessage="Password"/>
        }]}/>
        <Form layout="vertical" onFinish={onFinish} scrollToFirstError form={form}>
          <h2 id="profile"><FormattedMessage defaultMessage="Profile"/></h2>
          <UploadImage name="avatar" imageUrl={userProfile?.avatar}/>
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
              <span><FormattedMessage defaultMessage="Update Profile"/></span>
            </Button>
          </Form.Item>
          <br/>
        </Form>
        {
          !userProfile?.isSocialMedia &&
          <Form layout="vertical" onFinish={onPasswordFinish} scrollToFirstError
                form={passwordForm}>
            <h2 id="password"><FormattedMessage defaultMessage="Password"/></h2>
            <FormItem name="oldPassword"
                      label={intl.formatMessage({ defaultMessage: 'Old password' })}
                      rules={[{
                        required: true,
                        message: intl.formatMessage({ defaultMessage: 'Please input your old password!' })
                      }]}
            >
              <Input.Password/>
            </FormItem>
            <FormItem name="newPassword"
                      label={intl.formatMessage({ defaultMessage: 'New password' })} required
                      rules={[{
                        required: true,
                        message: intl.formatMessage({ defaultMessage: 'Please input your password!' })
                      }, ({ getFieldValue }) => ({
                        validator(_, value) {
                          if (!value || value.length > 7) {
                            return Promise.resolve();
                          }

                          return Promise.reject(new Error(
                            intl.formatMessage({
                              defaultMessage: 'Password is too short (minimum is 8 characters).'
                            })
                          ));
                        }
                      })]}
            >
              <Input.Password/>
            </FormItem>
            <FormItem name="confirmPassword"
                      label={intl.formatMessage({ defaultMessage: 'Confirm new password' })}
                      required
                      dependencies={['newPassword']}
                      rules={[{
                        required: true,
                        message: intl.formatMessage({ defaultMessage: 'Please confirm your password!' })
                      },
                        ({ getFieldValue }) => ({
                          validator(_, value) {
                            if (!value || getFieldValue('newPassword') === value) {
                              return Promise.resolve();
                            }
                            return Promise.reject(new Error(intl.formatMessage({ defaultMessage: 'The two passwords that you entered do not match!' })));
                          }
                        })]}
            >
              <Input.Password/>
            </FormItem>
            <br/>
            <Form.Item>
              <Button type="primary" loading={savingPwd} htmlType="submit">
                <span><FormattedMessage defaultMessage="Update Password"/></span>
              </Button>
            </Form.Item>
            <br/>
          </Form>
        }
      </Spin>
      <Seo subTitle={intl.formatMessage({ defaultMessage: 'Setting' })}/>
    </>
  );
};
Setting.propTypes = {};

export default Setting;
