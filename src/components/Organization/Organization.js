import React, { useContext, useEffect, useState } from 'react';
import { Button, Form, Input, message, Modal, Result, Spin } from 'antd';
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
import { FormattedMessage, useIntl } from 'gatsby-plugin-intl';
import { useAuth0 } from '@auth0/auth0-react';

const Organization = () => {
  const intl = useIntl();
  const {
    isLoading,
    isAuthenticated,
    loginWithRedirect
  } = useAuth0();
  const {
    userProfile,
    refreshUserProfile,
    organization
  } = useContext(StoreContext);
  const {
    enableOrganization,
    joinOrganization,
    removeUserFromOrganization,
    updateOrganization,
    updateOrganizationImage,
    declineOrganization
  } = useApi();
  const [newOrgName, setNewOrgName] = useState('');
  const [saving, setSaving] = useState(false);
  const [joining, setJoining] = useState(false);
  const [declining, setDeclining] = useState(false);
  const [form] = Form.useForm();

  const isOwner = userProfile?.accountPrivilege === 'OWNER';

  const handleLeaveOrg = () => {
    removeUserFromOrganization({
      userId: userProfile?.id,
      organizationId: organization?.id
    })
      .then(() => refreshUserProfile());
    //   });
  };

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
    joinOrganization({ organizationId: userProfile.invitations[0].inviterId })
      .then(() => refreshUserProfile())
      .then(() => setJoining(false));
  };

  const handleDecline = () => {
    setDeclining(true);
    declineOrganization({
      organizationId: userProfile.invitations[0].inviterId
    })
      .then(() => {
        refreshUserProfile();
      });
  };
  const handleEnableOrg = () => {
    enableOrganization({ organizationName: newOrgName })
      .then(refreshUserProfile());
  };
  const OpenEnableOrgModal = () => {
    Modal.info({
      title: intl.formatMessage({ defaultMessage: 'Enable your Organization' }),
      content: <Input
        placeholder={intl.formatMessage({ defaultMessage: 'Organization Name' })}
        onChange={(e) => {
          setNewOrgName(e.target.value);
        }}
      />,
      onOk: handleEnableOrg
    });
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
        subTitle={intl.formatMessage({ defaultMessage: 'Bring your organization on the table, manage interview across departments, invites people work with you to boost interview process together!' })}
        extra={[
          <Button type="primary" key="enableOrg" onClick={OpenEnableOrgModal}>
            <FormattedMessage defaultMessage="Enable your Organization"/>
          </Button>
        ]}
      />
    </>
  );

  const LoginNeeded = (
    <>
      <Result
        status="info"
        title={intl.formatMessage({ defaultMessage: 'Login to see your organization info.' })}
        subTitle={intl.formatMessage({ defaultMessage: 'Anyone invite you for joining their Organization? No Problem! login to review the details right now.' })}
        extra={[
          <Button type="primary" key="enableOrg"
                  onClick={() => loginWithRedirect(location.pathname)}>
            <FormattedMessage defaultMessage="Login here"/>
          </Button>
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
        label: <FormattedMessage defaultMessage="Organization"/>,
        path: '/organization'
      }]}
      />
      <Headline title={<FormattedMessage defaultMessage="Organization - {orgName}"
                                         values={{ orgName: organization?.name }}/>}/>
      <Spin spinning={isLoading} indicator={<LoadingOutlined spin/>}>
        {
          !isLoading && !isAuthenticated && LoginNeeded
        }

        {(isAuthenticated && !userProfile?.organization && userProfile?.invitations.length > 0) && JoinConfirm}
        {(isAuthenticated && !userProfile?.organization && userProfile?.invitations.length === 0) && EnableOrganization}
        {organization
        && (
          <>
            {!isOwner
            && (
              <ConfirmModal
                style={{
                  position: 'absolute',
                  right: '30px',
                  zIndex: 999
                }}
                openButtonTitle={intl.formatMessage({ defaultMessage: 'Leave Organization' })}
                title={intl.formatMessage({ defaultMessage: 'Leave Organization' })}
                onOK={handleLeaveOrg}
                successMessage={intl.formatMessage({ defaultMessage: 'Leave success' })}
                submitButtonTitle={intl.formatMessage({ defaultMessage: 'Leave' })}
                danger
              >
                <p>
                  <FormattedMessage defaultMessage="Are you sure to Leave?"/>
                  <br/>
                  <FormattedMessage
                    defaultMessage="All interviews and questions you created for the Organization will be allocated to Organization's Owner."/>
                </p>
              </ConfirmModal>
            )}
            {
              isOwner &&
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
                  <FormattedMessage defaultMessage="Update Organization"/>
                </Button>
              </Form>
            }

            <h2><FormattedMessage defaultMessage="Departments"/></h2>
            <Departments/>

            <h2><FormattedMessage defaultMessage="Invitations"/></h2>

            <Invitations invitations={organization.userInvitations} orgId={organization.id}/>

            <h2><FormattedMessage defaultMessage="Members"/></h2>
            <UserList users={organization.users}/>

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

      <Seo subTitle={intl.formatMessage({ defaultMessage: 'Organization' })}/>
    </>
  );
};
Organization.propTypes = {};

export default Organization;
