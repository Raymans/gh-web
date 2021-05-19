import React, { useEffect, useState } from 'react';
import { Avatar, Col, Descriptions, Row, Spin } from 'antd';
import { GithubOutlined, LinkedinOutlined, LoadingOutlined, MailOutlined } from '@ant-design/icons';
import styled from 'styled-components';
import Headline from '../Article/Headline';
import CustomBreadcrumb from '../CustomBreadcrumb';
import useApi from '../../hooks/useApi';
import Seo from '../Seo';
import { FormattedMessage } from 'gatsby-plugin-intl';

const StyledBasicProfileRow = styled(Row)`
  padding-bottom: 50px;
`;
const Profile = ({ userId }) => {
  const { getUserProfile } = useApi();
  const [profile, setProfile] = useState({ nickname: '' });
  const [loading, setLoading] = useState(true);
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
      <Spin spinning={loading} indicator={<LoadingOutlined spin/>}>
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
                    <Descriptions.Item>
                      {`${profile.name} (${profile.nickname})`}
                    </Descriptions.Item>
                    <Descriptions.Item
                      label={<MailOutlined/>}
                    >
                      {profile.email}
                    </Descriptions.Item>
                    <Descriptions.Item
                      label="Company">{profile.metadata?.companyName}</Descriptions.Item>
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
      </Spin>
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
