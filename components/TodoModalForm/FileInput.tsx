import postCardImage from '@/pages/api/common/postCardImage';
import { TodoFormData } from '@/types/ModalFormData';
import Image from 'next/image';
import { ChangeEvent, Dispatch, SetStateAction, useState } from 'react';

const FileInput = ({
  setFormData,
  columnId,
}: {
  setFormData?: Dispatch<SetStateAction<TodoFormData>>;
  columnId: number;
}) => {
  const [fileValue, setFileValue] = useState<string>('');
  const [preview, setPreview] = useState<string | ArrayBuffer | null>('');

  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) {
      return;
    }
    setFileValue(e.target.value);
    const selectedFile = e.target.files?.[0];
    const previewImage = URL.createObjectURL(selectedFile);
    setPreview(previewImage);

    const formData = new FormData();
    formData.append('image', selectedFile);

    const image = await postCardImage(formData, columnId);

    setFormData?.((prevForm: TodoFormData) => {
      return {
        ...prevForm,
        imageUrl: image.imageUrl,
      };
    });
  };

  return (
    <div className="flex flex-col gap-10">
      <div className="md:text-18 md:leading-[21px]">이미지</div>
      <div className="h-58 w-58 rounded-6 bg-gray-20 md:h-76 md:w-76">
        <label
          className="h-58 w-58 flex-center md:h-76 md:w-76"
          htmlFor="fileInput"
        >
          {preview ? (
            <div className="relative h-58 w-58 md:h-76 md:w-76">
              <Image
                src={preview as string}
                className="object-cover rounded-6"
                alt="미리보기"
                fill
              />
            </div>
          ) : (
            <div className="relative h-21 w-21 flex-center md:h-28 md:w-28">
              <Image
                src="/images/icon/ic-plus-purple.svg"
                fill
                alt="이미지업로드플러스아이콘"
              />
            </div>
          )}
        </label>
        <input
          onChange={handleFileChange}
          className="hidden"
          value={fileValue}
          id="fileInput"
          accept="image/*"
          type="file"
        />
      </div>
    </div>
  );
};

export default FileInput;
