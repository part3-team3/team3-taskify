import Image from 'next/image';
import { ChangeEvent, useState } from 'react';

const FileInput = () => {
  const [preview, setPreview] = useState<string | ArrayBuffer | null>('');

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
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
            <div className="relative">
              <img
                src={preview as string}
                className="h-58 w-58 rounded-6 object-cover md:h-76 md:w-76"
                alt="미리보기"
              ></img>
              <Image
                src="/images/icon/ic-pencil.svg"
                className="absolute"
                width={30}
                height={30}
                alt="펜슬아이콘"
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
          id="fileInput"
          accept="image/*"
          type="file"
        />
      </div>
    </div>
  );
};

export default FileInput;
