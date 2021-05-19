import React from 'react';
import { Avatar, Select } from 'antd';
import PropTypes from 'prop-types';
import { useIntl } from 'gatsby-plugin-intl';
import styled from 'styled-components';

const StyledAvatar = styled(Avatar)`
  margin: 0 5px;
`;

const UserSelect = ({
  users,
  onSelect,
  selected,
  filteredIds
}) => {
  const intl = useIntl();
  const selectedValueProp = selected ? { value: selected } : '';
  const handleSelect = (value) => {
    onSelect(value);
  };

  return (
    users.length > 0
    && (
      <Select
        placeholder={intl.formatMessage({ defaultMessage: 'Switch Owner to' })}
        optionFilterProp="children"
        {...selectedValueProp}
        onSelect={handleSelect}
      >
        {users && users.map((user) => (
          !filteredIds.includes(user.id) &&
          <Select.Option key={user.id} value={user.id}>
            <StyledAvatar
              src={user.avatar}
            >
              {user.name}
            </StyledAvatar>
            {`${user.name} (${user.email})`}
          </Select.Option>
        ))}
      </Select>
    )
  );
};

UserSelect.propTypes = {
  filteredIds: PropTypes.array,
  onSelect: PropTypes.func,
  selected: PropTypes.string,
  users: PropTypes.array.isRequired
};

export default UserSelect;

UserSelect.defaultProps = {
  filteredIds: [],
  onSelect: () => {
  },
  users: []
};
