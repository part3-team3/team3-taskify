import { getComments } from '@/pages/api/getComments';
import { CommentList } from '@/types/comments';
import { SyntheticEvent, useEffect, useState } from 'react';

import Comment from './Comment';
import CommentForm from './CommentForm';

const Comments = () => {
  const [commentList, setCommentList] = useState<CommentList>();

  useEffect(() => {
    const getCommentsData = async () => {
      const commentsData: CommentList = await getComments();
      setCommentList(commentsData);
    };

    getCommentsData();
  }, []);

  const handleSubmit = (e: SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <>
      <CommentForm handleSubmit={handleSubmit} />
      {commentList &&
        commentList.comments.map((comment) => (
          <Comment comment={comment} key={comment.id} />
        ))}
    </>
  );
};

export default Comments;
