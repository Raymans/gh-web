import PropTypes from 'prop-types';
import React, { useState } from 'react';
import styled from 'styled-components';
import {
  AutoComplete, Avatar, Button, Input, Modal,
} from 'antd';

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
            justifyContent: 'space-between',
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
      ),
    };
  });

const AuthorBy = ({ avatarSrc, author, isOwnerChangeable }) => {
  const [options, setOptions] = useState([]);

  const handleSearch = (value) => {
    setOptions(value ? searchResult(value) : []);
  };

  const onSelect = (value) => {
    console.log('onSelect', value);
  };

  const [changeOwnerVisible, setChangeOwnerVisible] = useState(false);
  const handleCancel = () => setChangeOwnerVisible(false);
  const handelChangeOwner = () => {
    alert('changed');
    setChangeOwnerVisible(false);
  };
  return (
    <>
      by
      {' '}
      <StyledAvatar
        src={avatarSrc}
      >
        {author}
      </StyledAvatar>
      <span>
        {author}
        {' '}
        {isOwnerChangeable && (
          <Button onClick={() => {
            setChangeOwnerVisible(true);
          }}
          >
            Change Owner
          </Button>
        )}
      </span>
      <Modal
        visible={changeOwnerVisible}
        title="Change Owner"
        footer={[
          <Button key="back" onClick={handleCancel}>
            Cancel
          </Button>,
          <Button key="submit" type="primary" onClick={handelChangeOwner}>
            Change Owner
          </Button>,
        ]}
      >
        <AutoComplete
          dropdownMatchSelectWidth={252}
          style={{
            width: 300,
          }}
          options={options}
          onSelect={onSelect}
          onSearch={handleSearch}
        >
          <Input.Search size="large" placeholder="input here" enterButton />
        </AutoComplete>
      </Modal>

    </>
  );
};
AuthorBy.propTypes = {
  author: PropTypes.string.isRequired,
  avatarSrc: PropTypes.string.isRequired,
  isOwnerChangeable: PropTypes.bool,
};

export default AuthorBy;

AuthorBy.defaultProps = {
  isOwnerChangeable: false,
};
