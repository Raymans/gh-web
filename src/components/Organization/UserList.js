import PropTypes from 'prop-types';
import { Avatar, Cascader, message, Space, Table, Tag } from 'antd';
import React, { useContext, useEffect, useState } from 'react';
import useApi from '../../hooks/useApi';
import ConfirmModal from './ConfirmModal';
import { StoreContext } from '../../context/ContextProvider';
import { FormattedMessage } from 'gatsby-plugin-intl';
import styled from 'styled-components';

const StyledAvatar = styled(Avatar)`
  margin: 0 5px;
`;

const { Column } = Table;
const UserList = ({ users }) => {
  const {
    removeUserFromOrganization,
    getDepartments,
    assignUserToDepartment
  } = useApi();
  const {
    refreshUserOrg,
    userProfile
  } = useContext(StoreContext);
  const [departments, setDepartments] = useState([]);

  const isOwner = userProfile?.accountPrivilege === 'OWNER';

  const handleRemoveUserFromOrg = (user) => removeUserFromOrganization({
    userId: user.id,
    organizationId: user.orgId
  })
    .catch((error) => {
      message.error(error.data.message);
      return Promise.reject(error);
    });

  const handleChangeDept = (user, departmentId) => {
    if (user.department?.id === departmentId) {
      return;
    }
    assignUserToDepartment({
      userId: user.id,
      departmentId
    })
      .then(() => refreshUserOrg());
  };
  const renderDept = (val, user) => (
    <span>
      {val?.name}
      {
        isOwner &&
        <>
          &nbsp;
          (
          <Cascader
            options={departments}
            onChange={(selectedDept) => handleChangeDept(user, selectedDept[0])}
            defaultValue={[user.department?.id]}
          >
            <a href="#">Change</a>
          </Cascader>
          )
        </>
      }

    </span>
  );
  useEffect(() => {
    getDepartments()
      .then(({ results = [] }) => setDepartments(results.length === 0 ? [] : results.map((dept) => ({
        value: dept.id,
        label: dept.name
      }))));
  }, []);
  return (
    <>
      <Table dataSource={users} pagination={false} size="small">
        <Column title={<FormattedMessage defaultMessage="Name"/>} dataIndex="name" key="name"
                render={(text, record) => (
                  <>
                    <StyledAvatar
                      src={record.avatar}
                    >
                      {record.name}
                    </StyledAvatar>
                    {text} &nbsp;
                    {
                      record.accountPrivilege === 'OWNER' &&
                      <Tag color="blue">OWNER</Tag>
                    }
                  </>
                )}/>
        <Column title={<FormattedMessage defaultMessage="Email"/>} dataIndex="email" key="email"/>
        <Column title={<FormattedMessage defaultMessage="Department"/>} dataIndex="department"
                key="department" render={renderDept}/>
        {
          isOwner &&
          <Column
            align="right"
            render={(text, record) => (record.accountPrivilege !== 'OWNER' ? (
              <Space size="middle" key={record.id}>
                <ConfirmModal
                  title={<FormattedMessage defaultMessage="Remove User from Organization"/>}
                  onOK={() => handleRemoveUserFromOrg(record)}
                  successMessage={<FormattedMessage
                    defaultMessage="{username} has been Removed from Organization."
                    values={{ username: record.name }}/>}
                  openButtonType="link"
                  openButtonTitle={<FormattedMessage defaultMessage="Remove"/>}
                  submitButtonTitle={<FormattedMessage defaultMessage="Remove"/>}
                  danger
                >
                  <p>
                    <FormattedMessage
                      defaultMessage="Are you sure to remove {removedUser} from {orgName}" values={{
                      removedUser: record.name,
                      orgName: record.orgId
                    }}/>
                    <b>
                      {record.name}
                    </b>
                    ?
                  </p>
                </ConfirmModal>
              </Space>
            ) : (<></>))}
          />
        }
      </Table>
    </>
  );
};

export default UserList;

UserList.propTypes = {
  users: PropTypes.array
};

UserList.defaultProps = {
  users: []
};
