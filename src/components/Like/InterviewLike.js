import React, { useState } from 'react';
import Like from './Like';
import { likeInterview, unlikeInterview } from '../../utils/api';


const InterviewLike = ({ id, liked: likedProp, likeCount: likeCountProp }) => {
  const [liked, setLiked] = useState(likedProp);
  const [likeCount, setLikeCount] = useState(likeCountProp);
  const handleLikeInterview = () => {
    const likeInteractiveFn = liked ? unlikeInterview : likeInterview;
    likeInteractiveFn({ id })
      .then((interview) => {
        setLiked(!liked);
        setLikeCount(interview.likeCount);
      });
  };
  return (
    <Like active={liked} count={likeCount} onClick={handleLikeInterview} />
  );
};

InterviewLike.propTypes = {};

export default InterviewLike;
