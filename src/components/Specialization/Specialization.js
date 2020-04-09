import { Select } from 'antd';
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { getSpecializations } from '../../utils/api';

const Specialization = ({ onSelect }) => {
  const [specializations, setSpecializations] = useState([]);
  useEffect(() => {
    getSpecializations().then(((data = []) => {
      setSpecializations(data);
    }));
  }, []);

  return (
    <Select
      placeholder="Specialization"
      optionFilterProp="children"
      style={{ width: 200 }}
      onSelect={onSelect}
    >
      {specializations.map((spec) => (
        <Select.Option key={spec.id} value={spec.id}>{spec.name}</Select.Option>
      ))}
    </Select>
  );
};

Specialization.propTypes = {
  onSelect: PropTypes.func,
};

export default Specialization;

Specialization.defaultProps = {
};
