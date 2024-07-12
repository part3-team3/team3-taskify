import { ReactNode } from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  width?: string;
  height?: string;
  children: ReactNode;
}

const Modal = ({ isOpen, onClose, width, height, children }: ModalProps) => {
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
        className={'whitespace-nowrap rounded-lg bg-white px-20 py-28 md:px-28'}
        onClick={handleContentClick}
      >
        {children}
      </div>
    </div>
  );
};

export default Modal;
