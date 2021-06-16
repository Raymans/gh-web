import PropTypes from 'prop-types';
import React, { useState } from 'react';
import styled from 'styled-components';
import { Badge, Descriptions, List, Spin, Tag, Tooltip } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import { FormattedMessage, Link, useIntl } from 'gatsby-plugin-intl';
import { useAuth0 } from '@auth0/auth0-react';
import InterviewLike from '../Like/InterviewLike';
import AuthorBy from '../AuthorBy';
import InterviewActionsRow from './InterviewActionsRow';
import Moment from 'react-moment';
import ShareInterview from './ShareInterview';

const StyledListItem = styled(List.Item)`
  .ant-list-item-extra {
    position: absolute;
    right: 25px;
    top: 16px;
  }
`;

const StyledVisibilityTag = styled(Tag)`
  position: absolute;
  top: -9px;
  background-color: ${(props) => (props.theme.isDark ? 'darkslategray !important' : undefined)};
`;

const StyledDescription = styled.div`
  font-size: 16px;
  margin: 10px 0;
`;

const StyledStatusBar = styled.div`
  position: absolute;
  right: 30px;
  bottom: 19px;

  .ant-badge {
    margin: 0 10px 0 0;
  }
`;
const InterviewGrid = (props) => {
  const {
    id,
    title,
    description = '',
    // specialization: { name: specializationName },
    jobTitle,
    clientUser = {},
    visibility,
    likeCount,
    liked,
    lastModifiedDate,
    interviewSessions
  } = props;
  const intl = useIntl();
  const { user } = useAuth0();
  const [saving, setSaving] = useState(false);
  const [deleted, setDeleted] = useState(false);
  const isOwner = clientUser.id === user?.sub;
  let updateActions = [];
  updateActions = [
    <>
      <ShareInterview id={id}/>
      {
        isOwner
        && (
          <InterviewActionsRow
            id={id}
            interviewTitle={title}
            onDeleting={() => setSaving(true)}
            onDeleted={() => setDeleted(true)}
          />
        )
      }
    </>];

  let totalGeeks = 0;
  for (const key in interviewSessions) {
    totalGeeks += interviewSessions[key]?.length;
  }

  return (
    <>
      {
        !deleted
        && (
          <>
            <Spin spinning={saving} indicator={<LoadingOutlined spin/>}>
              <StyledListItem
                key={id}
                extra={updateActions}
              >
                {
                  visibility === 'PRIVATE'
                  &&
                  <Tooltip
                    title={<FormattedMessage defaultMessage="Only you can see this interview"/>}>
                    <StyledVisibilityTag color="default"><FormattedMessage
                      defaultMessage="private"/></StyledVisibilityTag>
                  </Tooltip>
                }
                <h1><Link to={`/interviews/${id}`}>{title}</Link></h1>
                <Descriptions column={2}>
                  {/*<Descriptions.Item*/}
                  {/*  label={intl.formatMessage({ defaultMessage: 'Specialization' })}>{specializationName}</Descriptions.Item>*/}
                  <Descriptions.Item
                    label={intl.formatMessage({ defaultMessage: 'Job Title' })}>{jobTitle}</Descriptions.Item>
                  <Descriptions.Item
                    label={<FormattedMessage defaultMessage="Updated on"/>}>
                    <Moment date={lastModifiedDate} format="lll"/>
                  </Descriptions.Item>
                  <Descriptions.Item
                    span={2}><StyledDescription>{description}</StyledDescription></Descriptions.Item>
                  <Descriptions.Item span={2}>
                    <AuthorBy clientUser={clientUser}/>
                  </Descriptions.Item>
                  <Descriptions.Item span={2}>
                    <InterviewLike
                      id={id}
                      liked={liked}
                      likeCount={likeCount}
                    />
                    <StyledStatusBar>
                      {/*<Badge*/}
                      {/*  status="processing"*/}
                      {/*  text={<FormattedMessage defaultMessage="10 In testing"/>}*/}
                      {/*/>*/}
                      <Badge
                        status="success"
                        text={
                          clientUser.id === user?.sub ?
                            (<Link to={`/manageInterviews/${id}`}
                                   state={{ interviewName: title }}>
                              <FormattedMessage defaultMessage="{totalCount} people Assessed"
                                                values={{ totalCount: totalGeeks }}/>
                            </Link>) :
                            <FormattedMessage defaultMessage="{totalCount} people Assessed"
                                              values={{ totalCount: totalGeeks }}/>
                        }
                      />
                    </StyledStatusBar>
                  </Descriptions.Item>
                </Descriptions>
              </StyledListItem>
            </Spin>
          </>
        )
      }
    </>
  );
};

InterviewGrid.propTypes = {
  clientUser: PropTypes.object,
  description: PropTypes.string,
  id: PropTypes.any,
  interviewSessions: PropTypes.array,
  jobTitle: PropTypes.any,
  lastModifiedDate: PropTypes.any,
  likeCount: PropTypes.any,
  liked: PropTypes.any,
  title: PropTypes.any,
  visibility: PropTypes.any
};

export default InterviewGrid;

InterviewGrid.defaultProps = {
  clientUser: {},
  description: '',
  interviewSessions: []
};
