import React, { useContext, useEffect, useState } from 'react';
import {
  Button, Form, Input, message, Modal, Result, Spin,
} from 'antd';
import FormItem from 'antd/lib/form/FormItem';
import { LoadingOutlined } from '@ant-design/icons';
import Headline from '../Article/Headline';
import CustomBreadcrumb from '../CustomBreadcrumb';
import useApi from '../../hooks/useApi';
import Seo from '../Seo';
import UploadImage from '../UploadImgae/UploadImage';
import { StoreContext } from '../../context/ContextProvider';
import Departments from './Departments';
import UserList from './UserList';
import Invitations from './Invitations';
import ConfirmModal from './ConfirmModal';

const Organization = () => {
  const { userProfile, refreshUserProfile, organization } = useContext(StoreContext);
  const {
    enableOrganization, joinOrganization, removeUserFromOrganization, updateOrganization, updateUserAvatar,
  } = useApi();
  const [newOrgName, setNewOrgName] = useState('');
  const [saving, setSaving] = useState(false);
  const [joining, setJoining] = useState(false);
  const [form] = Form.useForm();

  const handleLeaveOrg = () => {
    removeUserFromOrganization({
      userId: userProfile?.id,
      organizationId: organization?.id,
    })
      .then(() => refreshUserProfile());
    //   });
  };

  const onFinish = (values) => {
    setSaving(true);
    if (values.avatar) {
      updateUserAvatar({ file: values.avatar.file.originFileObj })
        .then(() => updateOrganization({
          id: organization.id,
          name: values.name,
        }))
        .then(() => {
          message.success('Organization has been updated successfully!');
          setTimeout(() => setSaving(false), 500);
        });
    } else {
      updateOrganization({
        id: organization.id,
        name: values.name,
      })
        .then(() => {
          message.success('Organization has been updated successfully!');
          setTimeout(() => setSaving(false), 500);
        });
    }
  };

  const handleJoinOrg = () => {
    setJoining(true);
    joinOrganization({ organizationId: userProfile.invitations[0].inviterId })
      .then(() => refreshUserProfile())
      .then(() => setJoining(false));
  };

  const handleEnableOrg = () => {
    enableOrganization({ organizationName: newOrgName })
      .then(refreshUserProfile());
  };
  const OpenEnableOrgModal = () => {
    Modal.info({
      title: 'Enable your Organization',
      content: <Input
        placeholder="Organization Name"
        onChange={(e) => {
          setNewOrgName(e.target.value);
        }}
      />,
      onOk: handleEnableOrg,
    });
  };

  const JoinConfirm = (
    <Result
      status="info"
      title="Confirm to join DigitalRiver Organization?"
      subTitle={`${userProfile?.invitations[0]?.inviterName} (${userProfile?.invitations[0]?.inviterEmail}) is inviting you to join DigitalRiver Organization.`}
      extra={[
        <Button type="primary" key="join" danger>
          Decline
        </Button>,
        <Button type="primary" key="join" onClick={handleJoinOrg} loading={joining}>
          Join DitialRiver
        </Button>,
      ]}
    />
  );

  const EnableOrganization = (
    <>
      <Result
        status="info"
        title="Enable your Organization can really give you so many benefits."
        subTitle="Bring your organization on the table, manage interview across departments, invites people work with you to boost interview process together!"
        extra={[
          <Button type="primary" key="enableOrg" onClick={OpenEnableOrgModal}>
            Enable your Organization
          </Button>,
        ]}
      />
    </>
  );

  useEffect(() => {
    form.setFieldsValue({ name: organization?.name });
  }, [organization]);

  return (
    <>
      <CustomBreadcrumb crumbs={[{
        label: 'Organization',
        path: '/organization',
      }]}
      />
      <Headline title="Organization" />

      <Spin spinning={!userProfile} indicator={<LoadingOutlined spin />}>
        {(!userProfile?.organization && userProfile?.invitations.length > 0) && JoinConfirm}
        {(!userProfile?.organization && userProfile?.invitations.length === 0) && EnableOrganization}
        {organization
        && (
          <>
            {userProfile.accountPrivilege !== 'OWNER'
            && (
              <ConfirmModal
                style={{
                  position: 'absolute',
                  right: '30px',
                  zIndex: 999,
                }}
                openButtonTitle="Leave Organization"
                title="Leave Organization"
                onOK={handleLeaveOrg}
                successMessage="Leave success"
                submitButtonTitle="Leave"
                danger
              >
                <p>
                  Are you sure to Leave?
                  <br />
                  {'All interviews and questions you created for the Organization will be allocated to Organization\'s Owner.'}
                </p>
              </ConfirmModal>
            )}
            <Form layout="vertical" onFinish={onFinish} scrollToFirstError form={form}>
              <UploadImage name="companyPhoto" />
              <FormItem
                name="name"
                label="Name"
                required
                rules={[{
                  required: true,
                  message: 'Please input your Organization Name.',
                }]}
              >
                <Input />
              </FormItem>
              <br />
              <Form.Item>
                <Button type="primary" loading={saving} htmlType="submit">
                  Update Organization
                </Button>
              </Form.Item>
              <br />
            </Form>

            <h2>Departments</h2>
            <Departments />

            <h2>Accounts</h2>
            <h3>Invitations</h3>

            <Invitations invitations={organization.userInvitations} orgId={organization.id} />

            <h3>Members</h3>
            <UserList users={organization.users} />

            {/* <h2>Interviews</h2> */}
            {/* <h3>In Progress</h3> */}
            {/* <h4>Architecture Team</h4> */}
            {/* <InterviewsSummary isOwnerChangeable /> */}
            {/* <h4>UI Experience</h4> */}
            {/* <InterviewsSummary isOwnerChangeable /> */}
            {/* <h3>Completed</h3> */}
            {/* <h4>Architecture Team</h4> */}
            {/* <InterviewsSummary /> */}

            {/* <h3>Archived</h3> */}
            {/* <h4>Architecture Team</h4> */}
            {/* <InterviewsSummary /> */}
          </>
        )}
      </Spin>

      <Seo subTitle="Organization" />
    </>
  );
};
Organization.propTypes = {};

export default Organization;
