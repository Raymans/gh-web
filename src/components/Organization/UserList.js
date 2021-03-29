import PropTypes from 'prop-types';
import {
  message, Space, Table, Tag,
} from 'antd';
import React from 'react';
import useApi from '../../hooks/useApi';
import ConfirmModal from './ConfirmModal';

const { Column } = Table;
const UserList = ({ users }) => {
  const { removeUserFromOrganization } = useApi();

  const handleRemoveUserFromOrg = (user) => removeUserFromOrganization({
    userId: user.id,
    organizationId: user.orgId,
  })
    .catch((error) => {
      message.error(error.data.message);
      return Promise.reject(error);
    })
    //   });
  ;

  return (
    <>
      <div style={{
        marginBottom: 16,
      }}
      >
        <Tag>Architecture Team</Tag>
        <Tag>UI Developer Team</Tag>
        <Tag>HR</Tag>
      </div>

      <Table dataSource={users} pagination={false} size="small">
        <Column title="Name" dataIndex="name" key="name" />
        <Column title="Email" dataIndex="email" key="email" />
        <Column title="Department" dataIndex="department" key="department" />
        <Column title="Role" dataIndex="role" key="role" />
        <Column
          align="right"
          render={(text, record) => (record.accountPrivilege !== 'OWNER' ? (
            <Space size="middle" key={record.id}>
              <ConfirmModal
                title="Remove User from Organization"
                onOK={() => handleRemoveUserFromOrg(record)}
                successMessage={`${record.name} has been Removed from Organization.`}
                openButtonType="link"
                openButtonTitle="Remove"
                submitButtonTitle="Remove"
                danger
              >
                <p>
                  {'Are you sure to cancel the invitation for '}
                  <b>
                    {record.name}
                  </b>
                  ?
                </p>
              </ConfirmModal>
            </Space>
          ) : (<Tag color="blue">OWNER</Tag>))}
        />
      </Table>
    </>
  );
};

export default UserList;

UserList.propTypes = {
  users: PropTypes.array,
};

UserList.defaultProps = {
  users: [],
};
