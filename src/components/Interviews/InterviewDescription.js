import PropTypes from 'prop-types';
import { Collapse, Descriptions, Tag } from 'antd';
import { FormattedMessage, useIntl } from 'gatsby-plugin-intl';
import AuthorBy from '../AuthorBy';
import React from 'react';
import useStore from '../../hooks/useStore';
import styled from 'styled-components';
import DateTime from '../General/DateTime';

const StyledDescription = styled.div`
  font-size: 20px;
  margin: 10px 0;
  white-space: pre-line;
`;

const InterviewDescription = ({
  interview,
  collapse
}) => {
  const { userId } = useStore();
  const isOwner = userId === interview.clientUser.id;
  const intl = useIntl();

  const withCollapse = (children) => {
    if (collapse) {
      return <Collapse defaultActiveKey={['1']}>
        <Collapse.Panel header={intl.formatMessage({
          id: 'assessment.details',
          defaultMessage: 'Assessment Details'
        })} key="1">
          {children}
        </Collapse.Panel>
      </Collapse>;
    }
    return children;
  };

  return withCollapse(
    <Descriptions column={1}>
      {/*<Descriptions.Item*/}
      {/*  label={intl.formatMessage({ defaultMessage: 'Specialization' })}*/}
      {/*>*/}
      {/*  {interview.specialization.name}*/}
      {/*</Descriptions.Item>*/}

      <Descriptions.Item
      >
        {isOwner && interview.visibility === 'PRIVATE' &&
          <Tag color="#ffc93c"><FormattedMessage id="assessment.tag.private"
                                                 defaultMessage="private"/></Tag>
        }
      </Descriptions.Item>

      <Descriptions.Item
        style={{
          marginTop: '-14px'
        }}
        labelStyle={{ fontSize: '14px' }}
        contentStyle={{ fontSize: '14px' }}
      >
        <DateTime date={interview.lastModifiedDate}/>
      </Descriptions.Item>
      <Descriptions.Item
        label={intl.formatMessage({ defaultMessage: 'Job Title' })}
      >
        {interview.jobTitle}
      </Descriptions.Item>
      <Descriptions.Item
      >
        <StyledDescription dangerouslySetInnerHTML={{ __html: interview.description }}/>
      </Descriptions.Item>
      <Descriptions.Item
      >
        <AuthorBy
          clientUser={interview.clientUser}
        />
      </Descriptions.Item>
    </Descriptions>);
};

export default InterviewDescription;

InterviewDescription.propTypes = {
  collapse: PropTypes.bool,
  interview: PropTypes.object.isRequired
};

InterviewDescription.defaultProps = {
  collapse: false,
  interview: {}
};
