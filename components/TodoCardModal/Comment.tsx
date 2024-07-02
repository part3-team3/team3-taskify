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
        <div className="mt-20 flex gap-8 md:gap-10">
          <div className="relative flex h-26 w-26 justify-start md:h-34 md:w-34">
            <Image
              className="rounded-[70%]"
              fill
              src={profileImageUrl}
              alt="댓글 작성자 프로필 이미지"
            />
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
        <div className="ml-36 flex flex-col gap-8 md:ml-44 md:gap-12">
          <div className="text-12 font-normal leading-[14px] text-black-20 md:text-14 md:leading-[17px]">
            {editMode ? (
              <div className="relative">
                <textarea
                  value={newContent}
                  onChange={handleChangeNewContent}
                  placeholder="댓글 수정하기"
                  className="h-64 w-246 resize-none rounded-6 border border-solid border-gray-30 p-12 md:w-376 xl:w-406"
                />
                <button
                  onClick={handleEditSubmit}
                  className="absolute bottom-10 right-12 btn_small_white md:right-8"
                >
                  입력
                </button>
              </div>
            ) : (
              <pre className="whitespace-normal break-words">{content}</pre>
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
