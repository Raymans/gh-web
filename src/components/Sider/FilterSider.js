import PropTypes from 'prop-types';
import { Radio } from 'antd';
import React from 'react';
import styled from 'styled-components';

const StyledRadioGroup = styled(Radio.Group)`
  text-align: center;
  padding-bottom: 10px;
`;
const FilterSider = (props) => {
  const { onChange, defaultOpenKeys } = props;
  return (
    <StyledRadioGroup defaultValue={defaultOpenKeys} buttonStyle="solid" onChange={onChange}>
      <Radio.Button value="explore">Explore</Radio.Button>
      <Radio.Button value="mine">Mine</Radio.Button>
    </StyledRadioGroup>
  );
};
export default FilterSider;

FilterSider.propTypes = {
  onChange: PropTypes.func,
  defaultOpenKeys: PropTypes.string,
};

FilterSider.defaultProps = {
  defaultOpenKeys: 'explore',
};
