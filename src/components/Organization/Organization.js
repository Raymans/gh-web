import React, { useContext, useEffect, useState } from 'react';
import { Avatar, Button, Form, Input, message, Result } from 'antd';
import FormItem from 'antd/lib/form/FormItem';
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
import { FormattedMessage, useIntl } from 'gatsby-plugin-intl';
import LoginNeededWrapper from '../Auth/LoginNeededWrapper';
import UserSelect from '../User';
import AnchorSider from '../Sider/AnchorSider';
import ContentLayout from '../Layout/ContentLayout';
import styled from 'styled-components';


const H2 = styled.h2`
  padding-bottom: 10px;
  margin: 68px 0 0;
`;

const anchors = [
  {
    href: '#members',
    title: <FormattedMessage defaultMessage="Members"/>
  }, {
    href: '#departments',
    title: <FormattedMessage defaultMessage="Departments"/>
  }, {
    href: '#invitations',
    title: <FormattedMessage defaultMessage="Invitations"/>
  }];

const Organization = () => {
  const intl = useIntl();
  const {
    userProfile,
    refreshUserProfile,
    organization,
    isLoading
  } = useContext(StoreContext);
  const {
    enableOrganization,
    joinOrganization,
    removeUserFromOrganization,
    updateOrganization,
    updateOrganizationImage,
    declineOrganization,
    changeOrganizationOwner,
    leaveOrganization
  } = useApi();
  const [saving, setSaving] = useState(false);
  const [joining, setJoining] = useState(false);
  const [declining, setDeclining] = useState(false);
  const [form] = Form.useForm();
  const [switchOwnerForm] = Form.useForm();
  const [enableForm] = Form.useForm();

  const isOwner = userProfile?.accountPrivilege === 'OWNER';

  const handleSwitchOwner = () => {
    if (isOwner && organization.users.length > 1) {
      const switchedOwner = switchOwnerForm.getFieldValue('switchedOwner');
      return switchOwnerForm.validateFields()
        .then(() => {
          return changeOrganizationOwner({ clientUserId: switchedOwner })
            .then(() => refreshUserProfile());
        })
        .catch(() => {
          return Promise.reject();
        });
    }
    return Promise.resolve();
  };
  const handleLeaveOrg = () =>
    leaveOrganization()
      .then(() => refreshUserProfile());

  const postSuccess = () => {
    message.success(intl.formatMessage({ defaultMessage: 'Organization has been updated successfully!' }));
    setTimeout(() => setSaving(false), 500);
  };

  const onFinish = (values) => {
    setSaving(true);
    if (values.companyPhoto) {
      updateOrganizationImage({
        id: organization.id,
        file: values.companyPhoto.file.originFileObj
      })
        .then(() => updateOrganization({
          id: organization.id,
          name: values.name
        }))
        .then(() => {
          postSuccess();
        });
    } else {
      updateOrganization({
        id: organization.id,
        name: values.name
      })
        .then(() => {
          postSuccess();
        });
    }
  };

  const handleJoinOrg = () => {
    setJoining(true);
    joinOrganization({ organizationId: userProfile.invitations[0].inviterOrganizationId })
      .then(() => refreshUserProfile())
      .then(() => setJoining(false));
  };

  const handleDecline = () => {
    setDeclining(true);
    declineOrganization({
      organizationId: userProfile.invitations[0].inviterOrganizationId
    })
      .then(() => {
        refreshUserProfile();
      });
  };
  const handleEnableOrg = () => {
    return enableForm.validateFields()
      .then(() =>
        enableOrganization({ organizationName: enableForm.getFieldValue('name') })
      )
      .then(() =>
        refreshUserProfile()
      )
      .catch(() => Promise.reject());
  };

  const JoinConfirm = (
    <Result
      status="info"
      title={<FormattedMessage defaultMessage="Confirm to join {orgName} Organization?"
                               values={{ orgName: userProfile?.invitations[0]?.inviterOrganization }}/>}
      subTitle={<FormattedMessage
        defaultMessage="{inviterName} {inviterEmail}  is inviting you to join {orgName} Organization."
        values={{
          inviterName: userProfile?.invitations[0]?.inviterName,
          inviterEmail: userProfile?.invitations[0]?.inviterEmail,
          orgName: userProfile?.invitations[0]?.inviterOrganization
        }}/>}
      //subTitle={`${userProfile?.invitations[0]?.inviterName} (${userProfile?.invitations[0]?.inviterEmail}) is inviting you to join DigitalRiver Organization.`}
      extra={[
        <Button type="primary" key="decline" danger loading={declining} onClick={handleDecline}>
          <FormattedMessage defaultMessage="Decline"/>
        </Button>,
        <Button type="primary" key="join" onClick={handleJoinOrg} loading={joining}>
          <FormattedMessage defaultMessage="Join {orgName}"
                            values={{ orgName: userProfile?.invitations[0]?.inviterOrganization }}/>
        </Button>
      ]}
    />
  );

  const EnableOrganization = (
    <>
      <Result
        status="info"
        title={intl.formatMessage({ defaultMessage: 'Enable your Organization can really give you so many benefits.' })}
        subTitle={intl.formatMessage({ defaultMessage: 'Bring your organization on the table, manage assessment across departments, invites people work with you to boost assessment process together!' })}
        extra={[
          <ConfirmModal
            openButtonTitle={intl.formatMessage({ defaultMessage: 'Enable your Organization' })}
            title={intl.formatMessage({ defaultMessage: 'Enable your Organization' })}
            submitButtonTitle={intl.formatMessage({ defaultMessage: 'Enable' })}
            onOK={handleEnableOrg}
            openButtonType="primary"
          >
            <Form form={enableForm}>
              <FormItem
                name="name"
                required
                rules={[{
                  required: true,
                  message: intl.formatMessage({ defaultMessage: 'Please input your Organization Name.' })
                }]}
              >
                <Input size="large"
                       placeholder={intl.formatMessage({ defaultMessage: 'Organization Name' })}/>
              </FormItem>
            </Form>
          </ConfirmModal>
        ]}
      />
    </>
  );

  const onSelectUser = (userId) => {
    switchOwnerForm.setFieldsValue({ switchedOwner: userId });
  };

  useEffect(() => {
    form.setFieldsValue({ name: organization?.name });
  }, [organization]);

  return (
    <>
      <CustomBreadcrumb crumbs={[{
        label: <FormattedMessage defaultMessage="Organization"/>,
        path: '/organization'
      }]}
      />
      <Headline title={<FormattedMessage defaultMessage="Organization - {orgName}"
                                         values={{ orgName: organization?.name }}/>}/>
      <ContentLayout loading={isLoading}>
        <LoginNeededWrapper
          title={<FormattedMessage defaultMessage="Login to see your organization info."/>}
          subTitle={<FormattedMessage
            defaultMessage="Anyone invite you for joining their Organization? No Problem! login to review the details right now."/>}
        >
          {(!userProfile?.organization && userProfile?.invitations.length > 0) && JoinConfirm}
          {(!userProfile?.organization && userProfile?.invitations.length === 0) && EnableOrganization}
          {organization
          && (
            <>
              <ConfirmModal
                style={{
                  position: 'absolute',
                  right: 0,
                  zIndex: 999
                }}
                openButtonTitle={intl.formatMessage({ defaultMessage: 'Leave Organization' })}
                title={intl.formatMessage({ defaultMessage: 'Leave Organization' })}
                onBeforeSubmit={handleSwitchOwner}
                onOK={handleLeaveOrg}
                onCancel={() => switchOwnerForm.resetFields()}
                successMessage={intl.formatMessage({ defaultMessage: 'Leave success' })}
                submitButtonTitle={intl.formatMessage({ defaultMessage: 'Leave' })}
                danger
              >
                <p>
                  <FormattedMessage defaultMessage="Are you sure to Leave?"/>
                  <br/>
                  {
                    isOwner && organization.users.length > 1 ?
                      <>
                        <FormattedMessage
                          defaultMessage="You are the Owner, before leaving {orgName} you need to switch owner to others."
                          values={{ orgName: organization.name }}/>
                        <Form form={switchOwnerForm}>
                          <Form.Item name="switchedOwner" rules={[{
                            required: true,
                            message: intl.formatMessage({ defaultMessage: 'Please select a member to switch Owner' })
                          }]}>
                            <UserSelect users={organization.users} onSelect={onSelectUser}
                                        filteredIds={[userProfile.id]}/>
                          </Form.Item>
                        </Form>

                        <FormattedMessage
                          defaultMessage="All interviews and questions you created for the Organization will be allocated to Organization's Owner."/>
                      </>
                      :
                      <FormattedMessage
                        defaultMessage="All interviews and questions you created for the Organization will be allocated to Organization's Owner."/>

                  }
                </p>
              </ConfirmModal>
              <AnchorSider anchors={anchors}/>
              {
                isOwner ?
                  <Form layout="vertical" onFinish={onFinish} scrollToFirstError form={form}>
                    <UploadImage name="companyPhoto" imageUrl={organization.avatar}/>
                    <FormItem
                      name="name"
                      required
                      rules={[{
                        required: true,
                        message: intl.formatMessage({ defaultMessage: 'Please input your Organization Name.' })
                      }]}
                    >
                      <Input size="large"
                             placeholder={intl.formatMessage({ defaultMessage: 'Organization Name' })}/>
                    </FormItem>
                    <Button type="primary" loading={saving} htmlType="submit">
                      <span><FormattedMessage defaultMessage="Update Organization"/></span>
                    </Button>
                  </Form> :
                  <>
                    <div style={{
                      fontSize: '30px',
                      padding: '10px'
                    }}>
                      {`${organization.name}`}
                    </div>
                    <Avatar size={150} src={organization.avatar}/>
                  </>
              }

              <H2 id="members"><FormattedMessage defaultMessage="Members"/></H2>
              {
                isOwner &&
                <ConfirmModal
                  openButtonTitle={intl.formatMessage({ defaultMessage: 'Change Organization Owner' })}
                  title={intl.formatMessage({ defaultMessage: 'Change Organization Owner' })}
                  onOK={handleSwitchOwner}
                  onCancel={() => switchOwnerForm.resetFields()}
                  successMessage={intl.formatMessage({ defaultMessage: 'Change Organization Owner success.' })}
                  submitButtonTitle={intl.formatMessage({ defaultMessage: 'Change' })}
                >
                  <FormattedMessage
                    defaultMessage="Once you change the ownership you will not allow to update information of organization.  {br}{br}Please select a member to change Organization Owner."
                    values={{
                      orgName: organization.name,
                      br: <br/>
                    }}/>
                  <Form form={switchOwnerForm}>
                    <Form.Item name="switchedOwner" rules={[{
                      required: true,
                      message: intl.formatMessage({ defaultMessage: 'Please select a member to switch Owner' })
                    }]}>
                      <UserSelect users={organization.users} onSelect={onSelectUser}
                                  filteredIds={[userProfile.id]}/>
                    </Form.Item>
                  </Form>

                </ConfirmModal>
              }
              <UserList users={organization.users}/>

              <H2 id="departments"><FormattedMessage defaultMessage="Departments"/></H2>
              <Departments/>

              <H2 id="invitations"><FormattedMessage defaultMessage="Invitations"/></H2>

              <Invitations invitations={organization.userInvitations} orgId={organization.id}/>

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
        </LoginNeededWrapper>
      </ContentLayout>

      <Seo subTitle={intl.formatMessage({ defaultMessage: 'Organization' })}/>
    </>
  );
};
Organization.propTypes = {};

export default Organization;
