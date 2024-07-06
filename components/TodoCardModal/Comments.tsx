import deleteComment from '@/pages/api/comments/deleteComments';
import { getComments } from '@/pages/api/comments/getComments';
import putComment from '@/pages/api/comments/putComments';
import { Card } from '@/types/card';
import Column from '@/types/column';
import { CommentList, Comment as CommentType } from '@/types/comments';
import { useEffect, useState } from 'react';

import Comment from './Comment';
import CommentForm from './CommentForm';

const Comments = ({ card, columns }: { card: Card; columns: Column[] }) => {
  const [comments, setComments] = useState<CommentType[]>([]);
  const [cursorId, setCursorId] = useState<number | null>(null); // API에서 받아온 커서 id
  const [cursor, setCursor] = useState<number | null | undefined>(); // 무한스크롤에 사용되는 커서
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const getCommentsData = async (cursor?: number | null) => {
      if (null === cursor) return;
      setIsLoading(true);
      try {
        const commentsData: CommentList = await getComments(card.id, cursor);
        setComments((prevComments) => [
          ...prevComments,
          ...commentsData.comments.filter(
            (comment) =>
              !prevComments.some(
                (prevComment) => prevComment.id === comment.id,
              ),
          ),
        ]);
        setCursorId(commentsData.cursorId);
      } finally {
        setIsLoading(false);
      }
    };
    getCommentsData(cursor);
  }, [cursor]); // 마지막 댓글의 커서 id가 바뀌면 데이터 리패칭

  useEffect(() => {
    const handleObserver = (entries: IntersectionObserverEntry[]) => {
      const target = entries[0];
      // isIntersecting 기본 프로퍼티 알아보기
      if (
        target.isIntersecting &&
        !isLoading &&
        cursorId !== null &&
        cursor !== cursorId
      ) {
        setCursor(cursorId); // 스크롤하다가 마지막 댓글의 커서 Id를 cursor에 저장함.
      }
    };

    const observer = new IntersectionObserver(handleObserver, {
      threshold: 0, //  Intersection Observer의 옵션, 0일 때는 교차점이 한 번만 발생해도 실행, 1은 모든 영역이 교차해야 콜백 함수가 실행.
    });

    const observerTarget = document.getElementById('observer'); // 최하단 요소를 관찰 대상으로 지정함
    if (observerTarget) {
      // 관찰 시작
      observer.observe(observerTarget);
    }

    return () => {
      if (observerTarget) {
        observer.unobserve(observerTarget);
      }
    };
  }, [cursorId, isLoading]);

  const addComment = (newComment: CommentType) => {
    setComments((prevComments) => [newComment, ...prevComments]);
  };

  const handlePutComment = async ({
    id,
    newContent,
  }: {
    id: number;
    newContent: string;
  }) => {
    const newCommentData = await putComment({ id, content: newContent });

    setComments((prevComments) =>
      prevComments.map((comment) => {
        if (comment.id === id) {
          return newCommentData;
        }
        return comment;
      }),
    );
  };

  const handleDeleteComment = async (targetId: number) => {
    await deleteComment(targetId);
    setComments((prevComments) =>
      prevComments.filter((comment) => comment.id !== targetId),
    );
  };

  return (
    <>
      <CommentForm card={card} columns={columns} addComment={addComment} />
      {comments.length > 0 && (
        <div className="overflow-scroll h-125 w-287 md:h-170 md:w-420 xl:h-110 xl:w-450">
          {comments.map((comment) => (
            <Comment
              comment={comment}
              key={comment.id}
              handleDeleteComment={handleDeleteComment}
              handlePutComment={handlePutComment}
            />
          ))}
          <div id="observer" className="h-10"></div>
        </div>
      )}
    </>
  );
};

export default Comments;
