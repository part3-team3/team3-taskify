import { Comment as CommentType } from '@/types/comments';
import formatDate from '@/utils/formatDate';
import Image from 'next/image';

const Comment = ({ comment }: { comment: CommentType }) => {
  const handleEditButton = () => {};

  const handleDeleteButton = () => {};

  return (
    <>
      <div className="flex flex-col" key={comment.id}>
        <div className="mt-20 flex gap-10">
          <div className="flex justify-start">
            <Image
              width={34}
              height={34}
              src={'/images/icon/younghoon.svg'}
              alt="담당자 프로필 이미지"
            />
          </div>
          <div className="flex items-center gap-8">
            <div className="text-14 font-semibold leading-[17px] text-black-20">
              {comment.author.nickname}
            </div>
            <div className="text-12 font-normal leading-[14px] text-gray-40">
              {formatDate(comment.createdAt)}
            </div>
          </div>
        </div>
        <div className="ml-44 flex flex-col gap-12">
          <div className="text-14 font-normal leading-[17px] text-black-20">
            {comment.content}
          </div>
          <div className="flex gap-12 text-12 leading-[14px] text-gray-40 underline">
            <div onClick={handleEditButton}>수정</div>
            <div onClick={handleDeleteButton}>삭제</div>
          </div>
        </div>
      </div>
      <div id="observer" className="h-10"></div>
    </>
  );
};

export default Comment;
