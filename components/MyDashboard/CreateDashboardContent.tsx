import { postDashboard } from '@/pages/api/mydashboard/postDashboard';
import Image from 'next/image';
import { useState } from 'react';

interface CreateDashboardModalContentProps {
  closeModal: () => void;
  onDashboardCreated: () => void;
}

const CreateDashboardModalContent: React.FC<
  CreateDashboardModalContentProps
> = ({ closeModal, onDashboardCreated }:CreateDashboardModalContentProps) => {
  const [inputTitle, setInputTitle] = useState('');
  const [clickedColor, setClickedColor] = useState<string | null>(null);

  const handleColorClick = (color: string) => {
    setClickedColor((prevColor) => (prevColor === color ? null : color));
  };

  const handleTitleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputTitle(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputTitle.trim()) {
      alert('대시보드 이름을 입력해주세요');
      return;
    }
    if (!clickedColor) {
      alert('색상을 선택해주세요');
      return;
    }

    try {
      await postDashboard({
        title: inputTitle,
        color: clickedColor,
      });
      onDashboardCreated();
      closeModal();
    } catch (error) {
      alert('대시보드 생성에 실패했습니다. 다시 시도해주세요.');
    }
  };

  return (
    <>
      <p className="text-xl font-bold md:text-2xl">새로운 대시보드</p>
      <p className="mb-10 mt-24 text-base font-medium md:mt-32 md:text-lg">
        대시보드 이름
      </p>
      <input
        type="text"
        placeholder="대시보드 제목 입력"
        value={inputTitle}
        onChange={handleTitleInput}
        className="mb-24 w-full p-2 border-1px-solid-gray-30 md:mb-28"
      />
      <div className="mb-24 flex gap-10 space-x-2">
        {[
          { color: '#7AC555', bgColor: 'bg-green' },
          { color: '#760DDE', bgColor: 'bg-purple' },
          { color: '#FFA500', bgColor: 'bg-orange' },
          { color: '#76A5EA', bgColor: 'bg-blue' },
          { color: '#E876EA', bgColor: 'bg-pink' },
        ].map(({ color, bgColor }) => (
          <div
            key={color}
            className={`h-28 w-28 cursor-pointer rounded-full ${bgColor} flex items-center justify-center md:h-30 md:w-30`}
            onClick={() => handleColorClick(color)}
          >
            {clickedColor === color && (
              <Image
                src="/images/icon/ic-check-color.svg"
                alt="선택"
                width={20}
                height={20}
              />
            )}
          </div>
        ))}
      </div>
      <div className="flex justify-between md:justify-end md:gap-12">
        <button className="btn_modal_small_white md:btn_modal_large_white" onClick={closeModal}>
          취소
        </button>
        <button className="btn_modal_small_purple md:btn_modal_large_purple" onClick={handleSubmit}>
          생성
        </button>
      </div>
    </>
  );
};

export default CreateDashboardModalContent;
