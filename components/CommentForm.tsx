import postComments from '@/pages/api/postComments';
import { Comment as CommentType } from '@/types/comments';
import { ChangeEvent, SyntheticEvent, useState } from 'react';

const CommentForm = ({
  addComment,
}: {
  addComment: (newComment: CommentType) => void;
}) => {
  const [content, setContent] = useState<string>('');

  const handleInputChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
  };

  const onSubmit = async (e: SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    const commentData = await postComments({
      content: content,
      cardId: 8667,
      columnId: 32815,
      dashboardId: 9728,
    });

    if (commentData) {
      addComment(commentData.data); // 새로운 댓글을 comments 상태에 추가
    }
    setContent('');
  };

  return (
    <form onSubmit={onSubmit} className="relative flex flex-col gap-10">
      <div className="text-14 font-medium leading-[17px] text-black-20 md:text-16 md:leading-[19px]">
        댓글
      </div>
      <div>
        <textarea
          value={content}
          onChange={handleInputChange}
          placeholder="댓글 작성하기"
          className="h-70 w-287 resize-none rounded-6 border border-solid border-gray-30 p-12 text-12 leading-[14px] placeholder:text-12 md:h-110 md:w-420 md:p-16 md:leading-[17px] md:placeholder:text-14 xl:w-450"
        />
      </div>
      <button className="absolute bottom-16 right-8 btn_desktop_white md:bottom-16 md:left-[323px] xl:left-[353px]">
        입력
      </button>
    </form>
  );
};

export default CommentForm;
