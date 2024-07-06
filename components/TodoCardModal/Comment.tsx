import { Comment as CommentType } from '@/types/comments';
import formatDate from '@/utils/formatDate';
import Image from 'next/image';
import { ChangeEvent, useState } from 'react';

const Comment = ({
  comment,
  handleDeleteComment,
  handlePutComment,
}: {
  comment: CommentType;
  handleDeleteComment: (id: number) => void;
  handlePutComment: ({
    id,
    newContent,
  }: {
    id: number;
    newContent: string;
  }) => Promise<void>;
}) => {
  const { id, content, createdAt, author } = comment;
  const { nickname, profileImageUrl } = author;

  const [editMode, setEditMode] = useState<boolean>(false);
  const [newContent, setNewContent] = useState<string>(content);

  const handleEditClick = () => {
    setEditMode(!editMode);
  };

  const handleChangeNewContent = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setNewContent(e.target.value);
  };

  const handleEditSubmit = () => {
    handlePutComment({ id, newContent });
    setEditMode(false);
  };

  const handleDeleteButton = () => {
    handleDeleteComment(id);
  };

  return (
    <>
      <div className="flex flex-col">
        <div className="flex gap-8 mt-20 md:gap-10">
          <div className="relative flex justify-start h-26 w-26 md:h-34 md:w-34">
            {profileImageUrl ? (
              <Image
                className="rounded-[70%]"
                fill
                src={profileImageUrl}
                alt="댓글 작성자 프로필 이미지"
              />
            ) : (
              <div className="h-26 w-26 rounded-full bg-violet-20 text-12 font-semibold leading-[15px] text-white flex-center md:h-34 md:w-34">
                {nickname.charAt(0).toUpperCase()}
              </div>
            )}
          </div>
          <div className="flex items-center gap-6 md:gap-8">
            <div className="text-12 font-semibold leading-[14px] text-black-20 md:text-14 md:leading-[17px]">
              {nickname}
            </div>
            <div className="text-10 font-normal leading-[12px] text-gray-40 md:text-12 md:leading-[14px]">
              {formatDate(createdAt)}
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-8 ml-36 md:ml-44 md:gap-12">
          <div className="text-12 font-normal leading-[14px] text-black-20 md:text-14 md:leading-[17px]">
            {editMode ? (
              <div className="relative">
                <textarea
                  value={newContent}
                  onChange={handleChangeNewContent}
                  placeholder="댓글 수정하기"
                  className="h-64 p-12 border border-solid resize-none w-246 rounded-6 border-gray-30 md:w-376 xl:w-406"
                />
                <button
                  onClick={handleEditSubmit}
                  className="absolute bottom-10 right-12 btn_small_white md:right-8"
                >
                  입력
                </button>
              </div>
            ) : (
              <pre className="break-words whitespace-normal">{content}</pre>
            )}
          </div>

          <div className="flex gap-12 text-10 leading-[12px] text-gray-40 underline md:text-12 md:leading-[14px]">
            <div onClick={handleEditClick} className="cursor-pointer">
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
