import { TodoFormData } from '@/types/ModalFormData';
import { ChangeEvent, Dispatch, SetStateAction } from 'react';

const Textarea = ({
  label,
  description,
  essential,
  placeholder,
  setFormData,
}: {
  label: string;
  description?: string;
  essential: string;
  placeholder: string;
  setFormData?: Dispatch<SetStateAction<TodoFormData>>;
}) => {
  const handleDescriptionChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setFormData?.((prev: TodoFormData) => {
      return { ...prev, description: e.target.value };
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

      <textarea
        defaultValue={description}
        onChange={handleDescriptionChange}
        className="placeholder:gray-40 h-84 w-287 resize-none rounded-6 px-16 py-13 text-14 leading-[17px] border-1px-solid-gray-30 md:h-96 md:w-450 md:placeholder:text-16 md:placeholder:leading-[19px]"
        placeholder={placeholder}
      />
    </div>
  );
};

export default Textarea;
