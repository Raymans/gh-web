import PropTypes from 'prop-types';
import { CalendarOutlined } from '@ant-design/icons';
import Moment from 'react-moment';
import React from 'react';
import styled from 'styled-components';

const StyledCalendarOutlined = styled(CalendarOutlined)`
  margin-right: 5px;
`;
const DateTime = ({
  date,
  className
}) => (
  <>
    {
      date &&
      <span className={className}><StyledCalendarOutlined/> <Moment date={date}/></span>
    }
  </>
);

export default DateTime;

DateTime.propTypes = {
  date: PropTypes.string.isRequired,
  style: PropTypes.string
};

DateTime.defaultProps = {
  date: '',
  className: ''
};
