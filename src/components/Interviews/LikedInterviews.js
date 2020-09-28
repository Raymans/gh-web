import React, { useEffect, useState } from 'react';
import { Descriptions, List, Spin } from 'antd';
import { Link } from 'gatsby-plugin-intl';
import { LoadingOutlined } from '@ant-design/icons';
import InterviewLike from '../Like/InterviewLike';
import useApi from '../../hooks/useApi';

const LikedInterviews = () => {
  const getInterviews = useApi().getInterviews({ owner: true });
  const [likedInterviews, setLikeInterviews] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    getInterviews()
      .then(({ results: myIvs }) => {
        setLikeInterviews(myIvs);
        setLoading(false);
      });
  }, []);

  return (
    <>
      <h2>Liked interviews</h2>
      <Spin spinning={loading} indicator={<LoadingOutlined spin />}>
        <List
          itemLayout="horizontal"
          dataSource={likedInterviews}
          renderItem={(interview) => (
            <List.Item
              actions={[
                <InterviewLike id={interview.id} liked={interview.liked} likeCount={interview.likeCount} />]}
            >
              <List.Item.Meta
                title={<h1><Link to={`/interviews/${interview.id}`}>{interview.title}</Link></h1>}
                description={(
                  <>
                    <Descriptions column={2}>
                      <Descriptions.Item
                        label="Specialization"
                      >
                        {interview.specialization.name}
                      </Descriptions.Item>
                      <Descriptions.Item label="Job Title">{interview.jobTitle}</Descriptions.Item>
                      <Descriptions.Item span={2}>{interview.description}</Descriptions.Item>
                    </Descriptions>
                  </>
                )}
              />
            </List.Item>
          )}
        />
      </Spin>
    </>
  );
};
LikedInterviews.propTypes = {};

export default LikedInterviews;
