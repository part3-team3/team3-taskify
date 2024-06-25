import { Comment as CommentType } from '@/types/comments';
import formatDate from '@/utils/formatDate';
import Image from 'next/image';

const Comment = ({ comment }: { comment: CommentType }) => {
  const handleEditButton = () => {};

  const handleDeleteButton = () => {};

  //   return (
  //     <>
  //       <div className="flex flex-col" key={comment.id}>
  //         <div className="flex gap-10 mt-20">
  //           <div className="flex justify-start">
  //             <Image
  //               width={34}
  //               height={34}
  //               src={'/images/icon/younghoon.svg'}
  //               alt="담당자 프로필 이미지"
  //             />
  //           </div>
  //           <div className="flex items-center gap-8">
  //             <div className="text-14 font-semibold leading-[17px] text-black-20">
  //               {comment.author.nickname}
  //             </div>
  //             <div className="text-12 font-normal leading-[14px] text-gray-40">
  //               {formatDate(comment.createdAt)}
  //             </div>
  //           </div>
  //         </div>
  //         <div className="flex flex-col gap-12 ml-44">
  //           <div className="text-14 font-normal leading-[17px] text-black-20">
  //             {comment.content}
  //           </div>
  //           <div className="flex gap-12 text-12 leading-[14px] text-gray-40 underline">
  //             <div onClick={handleEditButton}>수정</div>
  //             <div onClick={handleDeleteButton}>삭제</div>
  //           </div>
  //         </div>
  //       </div>
  //     </>
  //   );
  // };

  return (
    <>
      <div className="flex flex-col" key={comment.id}>
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
              {formatDate(comment.createdAt)}
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-8 ml-36 md:ml-44 md:gap-12">
          <div className="text-12 font-normal leading-[14px] text-black-20 md:text-14 md:leading-[17px]">
            {comment.content}
          </div>
          <div className="flex gap-12 text-10 leading-[12px] text-gray-40 underline md:text-12 md:leading-[14px]">
            <div onClick={handleEditButton}>수정</div>
            <div onClick={handleDeleteButton}>삭제</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Comment;
