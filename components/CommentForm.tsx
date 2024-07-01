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

  return (
    <form onSubmit={handleSubmit} className="relative flex flex-col gap-10">
      <div className="text-16 font-medium leading-[19px] text-black-20">
        댓글
      </div>
      <div>
        <textarea
          value={inputValue}
          onChange={handleInputChange}
          placeholder="댓글 작성하기"
          className="w-450 h-110 resize-none rounded-6 border border-solid border-gray-30 p-16 placeholder:text-14"
        />
      </div>
      <button className="btn_desktop_white absolute bottom-16 left-[353px]">
        입력
      </button>
    </form>
  );
};

export default CommentForm;
