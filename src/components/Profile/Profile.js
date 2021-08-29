import React, { useEffect, useState } from 'react';
import { Avatar, Col, Descriptions, Row } from 'antd';
import { GithubOutlined, LinkedinOutlined, MailOutlined } from '@ant-design/icons';
import styled from 'styled-components';
import Headline from '../Article/Headline';
import CustomBreadcrumb from '../CustomBreadcrumb';
import useApi from '../../hooks/useApi';
import Seo from '../Seo';
import { FormattedMessage, useIntl } from 'gatsby-plugin-intl';
import ContentLayout from '../Layout/ContentLayout';

const StyledBasicProfileRow = styled(Row)`
  padding: 50px;

  @media (max-width: 700px) {
    flex-direction: column;
    align-items: baseline;
  }

`;
const Profile = ({ userId }) => {
  const { getUserProfile } = useApi();
  const [profile, setProfile] = useState({ nickname: '' });
  const [loading, setLoading] = useState(true);
  const intl = useIntl();
  useEffect(() => {
    getUserProfile(userId)
      .then((res) => {
        setProfile(res);
        setLoading(false);
      });
  }, []);
  return (
    <>
      <CustomBreadcrumb crumbs={[{
        label: profile.name ?? '',
        path: location.pathname
      }]}/>
      <Headline title={<FormattedMessage defaultMessage="Profile - {name}"
                                         values={{ name: profile.name }}/>}/>
      <ContentLayout loading={loading}>
        {
          <StyledBasicProfileRow align="middle">
            {
              !loading &&
              <>
                <Col span={8}>
                  <Avatar size={200} src={profile.avatar}/>
                </Col>
                <Col span={16}>
                  <Descriptions column={1}>
                    <Descriptions.Item contentStyle={{ fontSize: '30px' }}>
                      {`${profile.name} (${profile.nickname})`}
                    </Descriptions.Item>
                    <Descriptions.Item
                      label={<MailOutlined/>}
                    >
                      {profile.email}
                    </Descriptions.Item>
                    <Descriptions.Item
                      label={intl.formatMessage({ defaultMessage: 'Company' })}>{profile.metadata?.companyName}</Descriptions.Item>
                    <Descriptions.Item
                      label={<GithubOutlined/>}>
                      {
                        profile.metadata?.github &&
                        <a
                          href={`https://github.com/${profile.metadata?.github}`}
                          target="_blank">{`https://github.com/${profile.metadata?.github}`}
                        </a>
                      }
                    </Descriptions.Item>
                    <Descriptions.Item
                      label={<LinkedinOutlined/>}>
                      {
                        profile.metadata?.linkedIn &&
                        <a
                          href={`https://www.linkedin.com/in/${profile.metadata?.linkedIn}`}
                          target="_blank">{`https://www.linkedin.com/in/${profile.metadata?.linkedIn}`}
                        </a>
                      }
                    </Descriptions.Item>
                    <Descriptions.Item>{profile.metadata?.note}</Descriptions.Item>
                  </Descriptions>
                </Col>
              </>
            }
          </StyledBasicProfileRow>
        }
      </ContentLayout>
      {/* <MyInterview /> */}
      {/*<h2><FormattedMessage defaultMessage="{name}'s interviews"*/}
      {/*                      values={{ name: profile.name }}/></h2>*/}
      {/*<InterviewsSummary userId={userId}/>*/}
      {/*<LikedInterviews userId={userId}/>*/}
      {/*<PassInterview/>*/}
      <Seo subTitle={profile.name}/>
    </>
  );
};
Profile.propTypes = {};

export default Profile;
