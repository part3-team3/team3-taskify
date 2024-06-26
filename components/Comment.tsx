import { Comment as CommentType } from '@/types/comments';
import formatDate from '@/utils/formatDate';
import Image from 'next/image';

const Comment = ({
  comment,
  handleDeleteComment,
}: {
  comment: CommentType;
  handleDeleteComment: (id: number) => void;
}) => {
  const { id, content, createdAt } = comment;

  const handleEditButton = () => {};

  const handleDeleteButton = () => {
    handleDeleteComment(id);
  };

  return (
    <>
      <div className="flex flex-col">
        <div className="flex gap-8 mt-20 md:gap-10">
          <div className="relative flex justify-start h-26 w-26 md:h-34 md:w-34">
            <Image
              fill
              src={'/images/icon/younghoon.svg'}
              alt="담당자 프로필 이미지"
            />
          </div>
          <div className="flex items-center gap-6 md:gap-8">
            <div className="text-12 font-semibold leading-[14px] text-black-20 md:text-14 md:leading-[17px]">
              {comment.author.nickname}
            </div>
            <div className="text-10 font-normal leading-[12px] text-gray-40 md:text-12 md:leading-[14px]">
              {formatDate(createdAt)}
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-8 ml-36 md:ml-44 md:gap-12">
          <div className="text-12 font-normal leading-[14px] text-black-20 md:text-14 md:leading-[17px]">
            {content}
          </div>
          <div className="flex gap-12 text-10 leading-[12px] text-gray-40 underline md:text-12 md:leading-[14px]">
            <div onClick={handleEditButton} className="cursor-pointer">
              수정
            </div>
            <div onClick={handleDeleteButton} className="cursor-pointer">
              삭제
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Comment;
