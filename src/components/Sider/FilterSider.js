import PropTypes from 'prop-types';
import { Radio } from 'antd';
import React from 'react';
import styled from 'styled-components';

const StyledRadioGroup = styled(Radio.Group)`
  text-align: center;
  padding-bottom: 10px;
`;
const FilterSider = (props) => {
  const {
    onChange,
    defaultOpenKeys,
    options,
    disabled
  } = props;
  return (
    <StyledRadioGroup value={defaultOpenKeys} buttonStyle="solid"
                      onChange={onChange} disabled={disabled}>
      {
        options.map((option) => (
          <Radio.Button value={option.value}>{option.message}</Radio.Button>
        ))
      }
    </StyledRadioGroup>
  );
};
export default FilterSider;

FilterSider.propTypes = {
  onChange: PropTypes.func,
  defaultOpenKeys: PropTypes.string,
  options: PropTypes.array,
  disabled: PropTypes.bool
};

FilterSider.defaultProps = {
  defaultOpenKeys: 'explore',
  options: [],
  disabled: false
};
