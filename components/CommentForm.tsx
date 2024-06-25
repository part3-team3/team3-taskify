import { ChangeEvent, SyntheticEvent, useState } from 'react';

const CommentForm = ({
  handleSubmit,
}: {
  handleSubmit: (e: SyntheticEvent<HTMLFormElement>) => void;
}) => {
  const [inputValue, setInputValue] = useState('');

  const handleInputChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setInputValue(e.target.value);
  };

  //   return (
  //     <form onSubmit={handleSubmit} className="relative flex flex-col gap-10">
  //       <div className="text-16 font-medium leading-[19px] text-black-20">
  //         댓글
  //       </div>
  //       <div>
  //         <textarea
  //           value={inputValue}
  //           onChange={handleInputChange}
  //           placeholder="댓글 작성하기"
  //           className="p-16 border border-solid resize-none w-450 h-110 rounded-6 border-gray-30 placeholder:text-14"
  //         />
  //       </div>
  //       <button className="btn_desktop_white absolute bottom-16 left-[353px]">
  //         입력
  //       </button>
  //     </form>
  //   );
  // };

  return (
    <form onSubmit={handleSubmit} className="relative flex flex-col gap-10">
      <div className="text-14 font-medium leading-[17px] text-black-20 md:text-16 md:leading-[19px]">
        댓글
      </div>
      <div>
        <textarea
          value={inputValue}
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
