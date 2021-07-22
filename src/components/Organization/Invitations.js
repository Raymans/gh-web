import PropTypes from 'prop-types';
import { message, Space, Table, Tag } from 'antd';
import React, { useContext } from 'react';
import ConfirmModal from './ConfirmModal';
import useApi from '../../hooks/useApi';
import { StoreContext } from '../../context/ContextProvider';
import InviteUserModal from './InviteUserModal';
import { FormattedMessage, useIntl } from 'gatsby-plugin-intl';
import StyledTable from '../StyledComponent/StyledTable';

const { Column } = Table;

const Invitations = ({
  invitations,
  orgId
}) => {
  const intl = useIntl();
  const {
    inviteUserToOrganization,
    unInviteUserFromOrganization
  } = useApi();
  const {
    refreshUserOrg,
    userProfile
  } = useContext(StoreContext);
  const isOwner = userProfile?.accountPrivilege === 'OWNER';

  const invite = (email) => {
    message.loading({
      content: <FormattedMessage defaultMessage={'Sending Invite email....'}/>,
      key: 'invite',
      duration: 4
    });

    inviteUserToOrganization({
      email,
      organizationId: orgId
    })
      .then(() => {
        message.success({
          content: <FormattedMessage defaultMessage="Invitation has sent to {sentEmail}!"
                                     values={{ sentEmail: email }}/>,
          key: 'invite',
          duration: 4
        });
      });
  };

  const handleUnInviteUserFromOrg = (invitation) => {
    // deleteInterview(id)
    //   .then(() => {
    //     onDeleted();
    unInviteUserFromOrganization({
      email: invitation.email,
      organizationId: orgId
    })
      .then(() => refreshUserOrg());
    //   });
  };

  return (
    <>
      {
        isOwner && <InviteUserModal organizationId={orgId}/>
      }
      <StyledTable dataSource={invitations} pagination={false} size="small">
        <Column title={<FormattedMessage defaultMessage="Email"/>} dataIndex="email" key="email"/>
        <Column title={<FormattedMessage defaultMessage="Inviter"/>} dataIndex="inviterName"
                key="inviterName"/>
        <Column title={<FormattedMessage defaultMessage="Inviter's email"/>}
                dataIndex="inviterEmail" key="inviterEmail"/>
        <Column
          align="right"
          render={(text, record) => (
            <Space key={record.email} size="middle">
              {
                record.status === 'DECLINED' &&
                <Tag color="red"><FormattedMessage defaultMessage="DECLINED"/></Tag>
              }
              {
                record.status === 'INVITED' && isOwner &&
                <a onClick={() => invite(record.email)}>
                  <FormattedMessage defaultMessage="Resend Invitation"/></a>
              }
              {isOwner &&
              <ConfirmModal
                title={intl.formatMessage({ defaultMessage: 'UnInvite User' })}
                onOK={() => handleUnInviteUserFromOrg(record)}
                openButtonTitle={intl.formatMessage({ defaultMessage: 'UnInvite' })}
                submitButtonTitle={intl.formatMessage({ defaultMessage: 'UnInvite' })}
                openButtonType="link"
                successMessage={intl.formatMessage({ defaultMessage: '{email} has been Removed from Organization' }, { email: record.email })}
                danger
              >
                {intl.formatMessage({ defaultMessage: 'Are you sure to cancel the invitation for' })}
                <b>
                  {record.email}
                </b>
                ?
              </ConfirmModal>
              }
            </Space>
          )}
        />
      </StyledTable>
    </>
  );
};

Invitations.propTypes = {
  invitations: PropTypes.array,
  orgId: PropTypes.string
};

Invitations.defaultProps = {
  invitations: [],
  orgId: ''
};

export default Invitations;
