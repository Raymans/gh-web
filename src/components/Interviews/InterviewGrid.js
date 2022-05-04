import PropTypes from 'prop-types';
import React, { useState } from 'react';
import styled from 'styled-components';
import { List, Spin, Tag, Tooltip } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import { FormattedMessage, Link, useIntl } from 'gatsby-plugin-intl';
import { useAuth0 } from '@auth0/auth0-react';
import InterviewLike from '../Like/InterviewLike';
import AuthorBy from '../AuthorBy';
import InterviewActionsRow from './InterviewActionsRow';
import ShareInterview from './ShareInterview';
import Icon from '../Icon/Icon';
import DateTime from '../General/DateTime';

const H1 = styled.h1`
  font-size: 26px;
  letter-spacing: 1px;
  font-weight: 400;
`;

const StyledInfoRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 40px 0 0;

  .updated-time {
    font-size: 14px;
  }
`;

const StyledFooterRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
`;

const StyledListItem = styled(List.Item)`
  box-shadow: 4px 7px 8px 0px hsl(0deg 0% 53% / 6%), 0 11px 15px 1px hsl(0deg 0% 53% / 4%), 0 4px 20px 3px hsl(0deg 0% 53% / 4%);
  background-color: white;

  .ant-list-item-extra {
    position: absolute;
    right: 17px;
    top: 16px;

    button {
      margin-right: 5px;
    }
  }
`;

const StyledVisibilityTag = styled(Tag)`
  position: absolute;
  top: -9px;
  background-color: ${(props) => (props.theme.isDark ? 'darkslategray !important' : undefined)};
  color: gray;
`;

const StyledDescription = styled.div`
  margin: 10px 0 30px;
  font-size: 20px;
  letter-spacing: 1px;
  white-space: pre-line;
  min-height: 100px;
  height: 157px;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 5;
  -webkit-box-orient: vertical;

`;

const StyledStatusBar = styled.span`
  margin-right: 20px;

  .ant-badge {
    margin: 0 10px 0 0;
  }
`;
const InterviewGrid = (props) => {
  const {
    interview,
    interview: {
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
      groupedInterviewSessions = []
    }
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
            interview={interview}
            onDeleting={() => setSaving(true)}
            onDeleted={() => setDeleted(true)}
          />
        )
      }
    </>];

  let totalGeeks = 0;
  for (const key in groupedInterviewSessions) {
    totalGeeks += groupedInterviewSessions[key]?.length;
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
                    <StyledVisibilityTag color="#ffc93c">
                      <FormattedMessage id="assessment.tag.private"
                                        defaultMessage="private"/>
                    </StyledVisibilityTag>
                  </Tooltip>
                }
                <H1><Link to={`/interviews/${id}`}>{title}</Link></H1>
                <StyledInfoRow>
                  <div>{intl.formatMessage({ defaultMessage: 'Job Title: {jobTitle}' }, { jobTitle })}</div>
                  <div className={'updated-time'}><DateTime date={interview.lastModifiedDate}/>
                  </div>
                </StyledInfoRow>
                <StyledDescription dangerouslySetInnerHTML={{ __html: description }}/>
                {/*<Descriptions.Item*/}
                {/*  label={intl.formatMessage({ defaultMessage: 'Specialization' })}>{specializationName}</Descriptions.Item>*/}
                <StyledFooterRow>
                  <AuthorBy clientUser={clientUser}/>
                  <div>
                    <StyledStatusBar>
                      {/*<Badge*/}
                      {/*  status="processing"*/}
                      {/*  text={<FormattedMessage defaultMessage="10 In testing"/>}*/}
                      {/*/>*/}
                      {/*<SvgAssessmentCompleted />*/}
                      <Icon type="assessmentCompleted"/>
                      {
                        clientUser.id === user?.sub ?
                          (<Link to={`/manageInterviews/${id}`}
                                 state={{ interviewName: title }}>
                            <FormattedMessage defaultMessage="{totalCount} people Assessed"
                                              values={{ totalCount: totalGeeks }}/>
                          </Link>) :
                          <FormattedMessage defaultMessage="{totalCount} people Assessed"
                                            values={{ totalCount: totalGeeks }}/>
                      }
                    </StyledStatusBar>
                    <InterviewLike
                      id={id}
                      liked={liked}
                      likeCount={likeCount}
                    />
                  </div>
                </StyledFooterRow>
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
