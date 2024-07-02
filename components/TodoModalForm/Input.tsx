import { TodoFormData } from '@/types/ModalFormData';
import { ChangeEvent, Dispatch, SetStateAction } from 'react';

const Input = ({
  label,
  title,
  placeholder,
  essential,
  setFormData,
}: {
  label: string;
  title?: string;
  placeholder: string;
  essential?: string;
  setFormData?: Dispatch<SetStateAction<TodoFormData>>;
}) => {
  const handleTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData?.((prev: TodoFormData) => {
      return { ...prev, title: e.target.value };
    });
  };

  return (
    <div className="flex flex-col gap-10">
      <div className="flex gap-4">
        <div className="text-16 font-medium leading-[19px] md:text-18 md:leading-[21px]">
          {label}
        </div>
        <div className="text-violet-20">{essential}</div>
      </div>

      <input
        defaultValue={title}
        onChange={handleTitleChange}
        className="placeholder:gray-40 h-42 w-287 rounded-6 px-16 py-13 text-14 leading-[17px] border-1px-solid-gray-30 md:h-48 md:w-450 md:placeholder:text-16 md:placeholder:leading-[19px]"
        placeholder={placeholder}
      />
    </div>
  );
};

export default Input;
