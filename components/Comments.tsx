import { getComments } from '@/pages/api/getComments';
import { CommentList, Comment as CommentType } from '@/types/comments';
import { SyntheticEvent, useEffect, useState } from 'react';

import Comment from './Comment';
import CommentForm from './CommentForm';

const Comments = () => {
  const [comments, setComments] = useState<CommentType[]>([]);
  const [cursorId, setCursorId] = useState<number | null>(null); // API에서 받아온 커서 id
  const [cursor, setCursor] = useState<number | null>(null); // 무한스크롤에 사용되는 커서
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const getCommentsData = async (cursor?: number | null) => {
    setIsLoading(true);
    try {
      const commentsData: CommentList = await getComments(cursor);
      setComments((prevComments) => [
        ...prevComments,
        ...commentsData.comments.filter(
          (comment) =>
            !prevComments.some((prevComment) => prevComment.id === comment.id),
        ),
      ]);
      setCursorId(commentsData.cursorId);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getCommentsData(cursor);
  }, [cursor]); // 마지막 댓글의 커서 id가 바뀌면 데이터 리패칭

  const handleSubmit = (e: SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

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
        console.log(cursorId);
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

  return (
    <>
      <CommentForm handleSubmit={handleSubmit} />
      {comments.length > 0 && (
        <div className="overflow-scroll h-150">
          {comments.map((comment) => (
            <Comment comment={comment} key={comment.id} />
          ))}
          <div id="observer" className="h-10"></div>
        </div>
      )}
    </>
  );
};

export default Comments;
