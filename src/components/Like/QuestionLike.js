import React, { useState } from 'react';
import Like from './Like';
import useApi from '../../hooks/useApi';

const QuestionLike = ({ id, liked: likedProp, likeCount: likeCountProp }) => {
  const { likeQuestion, unlikeQuestion } = useApi();
  const [liked, setLiked] = useState(likedProp);
  const [likeCount, setLikeCount] = useState(likeCountProp);
  const handleLikeQuestion = () => {
    const likeInteractiveFn = liked ? unlikeQuestion : likeQuestion;
    likeInteractiveFn({ id })
      .then((q) => {
        setLiked(!liked);
        setLikeCount(q.likeCount);
      });
  };
  return (
    <Like active={liked} count={likeCount} onClick={handleLikeQuestion} />
  );
};

QuestionLike.propTypes = {};

export default QuestionLike;
