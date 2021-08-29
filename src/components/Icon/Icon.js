import PropTypes from 'prop-types';
import styled from 'styled-components';
import AntdIcon from '@ant-design/icons';
import { ReactComponent as SvgLike } from '../../images/svg-icons/like.svg';
import { ReactComponent as SvgUnlike } from '../../images/svg-icons/unlike.svg';
import { ReactComponent as SvgAssessmentTesting } from '../../images/svg-icons/assessment-testing.svg';
import { ReactComponent as SvgAssessmentTested } from '../../images/svg-icons/assessment-tested.svg';
import { ReactComponent as SvgAssessmentCompleted } from '../../images/svg-icons/assessment-completed.svg';
import React from 'react';


const StyledIcon = styled(AntdIcon)`
  font-size: 25px;
  padding-right: 5px;
`;

const svgMap = {
  like: SvgLike,
  unlike: SvgUnlike,
  assessmentTesting: SvgAssessmentTesting,
  assessmentTested: SvgAssessmentTested,
  assessmentCompleted: SvgAssessmentCompleted
};
const Icon = ({ type }) => {
  return <StyledIcon component={svgMap[type]}/>;
};

export default Icon;

Icon.propTypes = {
  type: PropTypes.oneOf(['like', 'unlike', 'assessmentTesting', 'assessmentTested', 'assessmentCompleted'])
};

Icon.defaultProps = {
  type: 'like'
};
