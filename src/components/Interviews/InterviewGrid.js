import PropTypes from 'prop-types';
import React, { useState } from 'react';
import styled from 'styled-components';
import {
  Badge,
  Button,
  Descriptions,
  Divider,
  Form,
  Input,
  List,
  message,
  Modal,
  Spin,
  Tag,
  Tooltip
} from 'antd';
import { LoadingOutlined, ShareAltOutlined } from '@ant-design/icons';
import { FormattedMessage, Link, useIntl } from 'gatsby-plugin-intl';
import Search from 'antd/es/input/Search';
import { CopyToClipboard } from 'react-copy-to-clipboard/lib/Component';
import { useAuth0 } from '@auth0/auth0-react';
import InterviewLike from '../Like/InterviewLike';
import AuthorBy from '../AuthorBy';
import useApi from '../../hooks/useApi';
import InverviewActionsRow from './InterviewActionsRow';
import { useForm } from 'antd/lib/form/Form';
import Moment from 'react-moment';

const StyleReSendRow = styled.div`
  display: flex;
  align-items: center;
  border-bottom: #e0e5e6 1px solid;
  margin-bottom: 11px;

  button {
    margin-left: auto;
  }
`;
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
  const {
    createInterviewSession,
    getInterviewSessions,
    sendInterviewSessionToCandidate
  } = useApi();
  const intl = useIntl();
  const shareLink = `https://geekhub.tw/interviews/${id}`;
  const [sharedForm] = useForm();
  const { user } = useAuth0();
  const [sendings, setSendings] = useState({ sending: false });
  const [sharedEmails, setSharedEmails] = useState([]);
  const [loadingSharedEmails, setLoadingSharedEmails] = useState(true);
  const [isShareModalVisible, setIsShareModalVisible] = useState(false);
  const [saving, setSaving] = useState(false);
  const [deleted, setDeleted] = useState(false);
  let updateActions = [];
  updateActions = [
    <>
      <Button
        icon={<ShareAltOutlined/>}
        style={{ marginRight: '3px' }}
        onClick={() => {
          setIsShareModalVisible(true);
          getInterviewSessions({ interviewId: id })
            .then(({ results = [] }) => {
              setSharedEmails(results.map((interviewSession) => interviewSession.userEmail));
              setLoadingSharedEmails(false);
            });
        }}
      />
      {
        clientUser.id === user?.sub
        && (
          <InverviewActionsRow
            id={id}
            title={title}
            onDeleting={() => setSaving(true)}
            onDeleted={() => setDeleted(true)}
          />
        )
      }
    </>];

  const handleResendEmail = (value) => {
    sendings[value] = true;
    setSendings({ ...sendings });
    sendInterviewSessionToCandidate({ id })
      .then(() => {
        if (!sharedEmails.includes(value)) {
          setSharedEmails([...sharedEmails, value]);
        }
        sendings[value] = false;
        setSendings({ ...sendings });
        message.success(intl.formatMessage({ defaultMessage: 'Sent Assessment to {interviewee}' }, { interviewee: value }));
      });
  };

  const handleShareEmail = (value) => {
    sharedForm.validateFields()
      .then(() => {
        setSendings({
          ...sendings,
          sending: true
        });
        createInterviewSession({
          id,
          email: value,
          name: value.split('@')[0]
        })
          .then(({ id: interviewSessionId }) => {
            sendInterviewSessionToCandidate({ id: interviewSessionId })
              .then(() => {
                if (!sharedEmails.includes(value)) {
                  setSharedEmails([...sharedEmails, value]);
                }
                setSendings({
                  ...sendings,
                  sending: false
                });
                message.success(intl.formatMessage({ defaultMessage: 'Sent Assessment to {interviewee}' }, { interviewee: value }));
              });
          });
      });
  };

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
            <Modal
              title={intl.formatMessage({ defaultMessage: 'Share Assessment' })}
              visible={isShareModalVisible}
              onCancel={() => setIsShareModalVisible(false)}
              footer={[
                <Button key="back" onClick={() => setIsShareModalVisible(false)}>
                  <FormattedMessage defaultMessage="Close"/>
                </Button>
              ]}
            >
              <div style={{ display: 'flex' }}>
                <Input placeholder={intl.formatMessage({ defaultMessage: 'Email' })} size="small"
                       value={shareLink}/>
                <CopyToClipboard
                  text={shareLink}
                  onCopy={() => message.info(intl.formatMessage({ defaultMessage: 'Copied.' }))}
                >
                  <Button><FormattedMessage defaultMessage="Copy"/></Button>
                </CopyToClipboard>
              </div>
              <Divider orientation="left"><FormattedMessage defaultMessage="Or"/></Divider>
              <Form form={sharedForm}>
                <Form.Item
                  name="email"
                  rules={[{
                    required: true,
                    message: <FormattedMessage defaultMessage="Please input email format."/>,
                    type: 'email'
                  }]}>
                  <Search
                    name="email"
                    placeholder={intl.formatMessage({ defaultMessage: 'Email' })}
                    enterButton={intl.formatMessage({ defaultMessage: 'Send' })}
                    loading={sendings.sending}
                    onSearch={handleShareEmail}
                  />
                </Form.Item>
              </Form>

              {!loadingSharedEmails && sharedEmails.map((sharedEmail) => (
                <StyleReSendRow key={sharedEmail}>
                  <span>{sharedEmail}</span>
                  <Button
                    onClick={handleResendEmail.bind(this, sharedEmail)}
                    loading={sendings[sharedEmail]}
                  >
                    <FormattedMessage defaultMessage="ReSend"/>
                  </Button>
                </StyleReSendRow>
              ))}
            </Modal>

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
