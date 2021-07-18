import PropTypes from 'prop-types';
import React, { useState } from 'react';
import styled from 'styled-components';
import { AutoComplete, Avatar, Button, Input, Modal } from 'antd';
import { FormattedMessage, Link } from 'gatsby-plugin-intl';

const StyledAvatar = styled(Avatar)`
  margin: 0 5px;
`;

function getRandomInt(max, min = 0) {
  return Math.floor(Math.random() * (max - min + 1)) + min; // eslint-disable-line no-mixed-operators
}

const searchResult = (query) => new Array(getRandomInt(5))
  .join('.')
  .split('.')
  .map((_, idx) => {
    const category = `${query}${idx}`;
    return {
      value: category,
      label: (
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between'
          }}
        >
          <span>
            {query}
          </span>
          <span>
            {query}
            @gmail.com
          </span>
        </div>
      )
    };
  });

const AuthorBy = ({
  clientUser,
  isOwnerChangeable
}) => {
  const [options, setOptions] = useState([]);

  const handleSearch = (value) => {
    setOptions(value ? searchResult(value) : []);
  };

  const onSelect = (value) => {
    console.log('onSelect', value);
  };

  const [changeOwnerVisible, setChangeOwnerVisible] = useState(false);
  const handleCancel = () => setChangeOwnerVisible(false);
  const handleChangeOwner = () => {
    alert('changed');
    setChangeOwnerVisible(false);
  };
  return (
    <>
      <div>
        <FormattedMessage defaultMessage="by {avatar} {author} " values={{
          avatar: <StyledAvatar
            src={clientUser.avatar}
          >
            {clientUser.name}
          </StyledAvatar>,
          author: <Link to={`/profile/${clientUser.id}`}>{clientUser.name} </Link>
        }}/>
      </div>
      {isOwnerChangeable && (
        <Button onClick={() => {
          setChangeOwnerVisible(true);
        }}
        >
          <FormattedMessage defaultMessage="Change Owner"/>
        </Button>
      )}
      <Modal
        visible={changeOwnerVisible}
        title="Change Owner"
        footer={[
          <Button key="back" onClick={handleCancel}>
            <FormattedMessage defaultMessage="Cancel"/>
          </Button>,
          <Button key="submit" type="primary" onClick={handleChangeOwner}>
            <FormattedMessage defaultMessage="Change Owner"/>
          </Button>
        ]}
      >
        <AutoComplete
          dropdownMatchSelectWidth={252}
          style={{
            width: 300
          }}
          options={options}
          onSelect={onSelect}
          onSearch={handleSearch}
        >
          <Input.Search size="large" placeholder="input here" enterButton/>
        </AutoComplete>
      </Modal>

    </>
  );
};
AuthorBy.propTypes = {
  clientUser: PropTypes.object,
  isOwnerChangeable: PropTypes.bool
};

export default AuthorBy;

AuthorBy.defaultProps = {
  clientUser: {},
  isOwnerChangeable: false
};
