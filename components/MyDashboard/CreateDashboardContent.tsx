import { postDashboard } from '@/pages/api/mydashboard/postDashboard';
import Image from 'next/image';
import { useState } from 'react';


interface CreateDashboardModalContentProps {
  closeModal: () => void;
  onDashboardCreated: () => void;
}

const CreateDashboardModalContent: React.FC<
  CreateDashboardModalContentProps
> = ({ closeModal, onDashboardCreated }) => {
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
      const response = await postDashboard({
        title: inputTitle,
        color: clickedColor,
      });
      onDashboardCreated();
      closeModal();
      window.location.reload();
    } catch (error) {
      alert('대시보드 생성에 실패했습니다. 다시 시도해주세요.');
    }
  };

  return (
    <>
      <p className="text-2xl font-bold">새로운 대시보드</p>
      <p className="mt-4">대시보드 이름</p>
      <input
        type="text"
        placeholder="대시보드 제목 입력"
        value={inputTitle}
        onChange={handleTitleInput}
        className="mb-4 w-full p-2 border-1px-solid-gray-30"
      />
      <div className="mb-4 flex space-x-2">
        {[
          { color: '#7AC555', bgColor: 'bg-green' },
          { color: '#760DDE', bgColor: 'bg-purple' },
          { color: '#FFA500', bgColor: 'bg-orange' },
          { color: '#76A5EA', bgColor: 'bg-blue' },
          { color: '#E876EA', bgColor: 'bg-pink' },
        ].map(({ color, bgColor }) => (
          <div
            key={color}
            className={`h-30 w-30 cursor-pointer rounded-full ${bgColor} flex items-center justify-center`}
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
      <div className="flex justify-end space-x-2">
        <button className="btn_modal_large_white" onClick={closeModal}>
          취소
        </button>
        <button className="btn_modal_large_purple" onClick={handleSubmit}>
          생성
        </button>
      </div>
    </>
  );
};

export default CreateDashboardModalContent;