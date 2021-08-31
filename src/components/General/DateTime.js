import PropTypes from 'prop-types';
import { CalendarOutlined } from '@ant-design/icons';
import Moment from 'react-moment';
import React from 'react';
import styled from 'styled-components';

const StyledCalendarOutlined = styled(CalendarOutlined)`
  margin-right: 5px;
`;
const DateTime = ({ date }) => (
  <div><StyledCalendarOutlined/> <Moment date={date}/></div>
);

export default DateTime;

DateTime.propTypes = {
  date: PropTypes.string.isRequired
};

DateTime.defaultProps = {
  date: ''
};
