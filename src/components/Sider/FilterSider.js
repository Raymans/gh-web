import PropTypes from 'prop-types';
import { Radio } from 'antd';
import React from 'react';
import styled from 'styled-components';
import { FormattedMessage } from 'gatsby-plugin-intl';

const StyledRadioGroup = styled(Radio.Group)`
  text-align: center;
  padding-bottom: 10px;
`;
const FilterSider = (props) => {
  const {
    onChange,
    defaultOpenKeys
  } = props;
  return (
    <StyledRadioGroup defaultValue={defaultOpenKeys || 'explore'} buttonStyle="solid"
                      onChange={onChange}>
      <Radio.Button value="explore"><FormattedMessage defaultMessage="Explore"/> </Radio.Button>
      <Radio.Button value="mine"><FormattedMessage defaultMessage="Mine"/> </Radio.Button>
    </StyledRadioGroup>
  );
};
export default FilterSider;

FilterSider.propTypes = {
  onChange: PropTypes.func,
  defaultOpenKeys: PropTypes.string
};

FilterSider.defaultProps = {
  defaultOpenKeys: 'explore'
};
