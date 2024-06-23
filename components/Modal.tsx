// 공용 모달 이상한 점 수정 부탁드려요~^^
import { ReactNode } from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  width?: string;
  height?: string;
  children: ReactNode;
}

const Modal = ({
  isOpen,
  onClose,
  width = '540px',
  height = '276px',
  children,
}: ModalProps) => {
  if (!isOpen) return null;

  const handleOverlayClick = () => {
    onClose();
  };

  const handleContentClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70"
      onClick={handleOverlayClick}
    >
      <div
        style={{ width, height }}
        className={
          'whitespace-nowrap rounded-lg bg-white pb-28 pl-28 pr-28 pt-32'
        }
        onClick={handleContentClick}
      >
        {children}
      </div>
    </div>
  );
};

export default Modal;
