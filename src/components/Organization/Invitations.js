import PropTypes from 'prop-types';
import { message, Space, Table } from 'antd';
import React, { useContext } from 'react';
import ConfirmModal from './ConfirmModal';
import useApi from '../../hooks/useApi';
import { StoreContext } from '../../context/ContextProvider';
import AddUserModal from './AddUserModal';

const { Column } = Table;

const Invitations = ({ invitations, orgId }) => {
  const { unInviteUserFromOrganization } = useApi();
  const { refreshUserOrg } = useContext(StoreContext);

  const invite = () => {
    message.loading({
      content: 'Sending Invite email....',
      key: 'invite',
      duration: 4,
    });
    setTimeout(() => {
      message.success({
        content: 'Invitation has sent to Raymans!',
        key: 'invite',
        duration: 4,
      });
    }, 1000);
  };

  const handleUnInviteUserFromOrg = (invitation) => {
    // deleteInterview(id)
    //   .then(() => {
    //     onDeleted();
    unInviteUserFromOrganization({
      email: invitation.email,
      organizationId: orgId,
    })
      .then(() => refreshUserOrg({ id: orgId }));
    //   });
  };

  return (
    <>
      <AddUserModal organizationId={orgId} />
      <Table dataSource={invitations} pagination={false} size="small">
        <Column title="Email" dataIndex="email" key="email" />
        <Column title="Inviter" dataIndex="inviterName" key="inviterName" />
        <Column title="Inviter's email" dataIndex="inviterEmail" key="inviterEmail" />
        <Column
          align="right"
          render={(text, record) => (
            <Space key={record.email} size="middle">
              <a onClick={invite}>Resend Invitation</a>
              <ConfirmModal
                title="UnInvite User"
                onOK={() => handleUnInviteUserFromOrg(record)}
                openButtonTitle="UnInvite"
                submitButtonTitle="UnInvite"
                openButtonType="link"
                successMessage={`${record.email} has been Removed from Organization`}
                danger
              >
                {'Are you sure to cancel the invitation for '}
                <b>
                  {record.email}
                </b>
                ?
              </ConfirmModal>
            </Space>
          )}
        />
      </Table>

    </>
  );
};

Invitations.propTypes = {
  invitations: PropTypes.array,
  orgId: PropTypes.string,
};

Invitations.defaultProps = {
  invitations: [],
  orgId: '',
};

export default Invitations;
