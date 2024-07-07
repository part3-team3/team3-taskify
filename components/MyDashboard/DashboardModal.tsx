import { ReactNode } from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

const DashboardModal = ({ isOpen, onClose, children }: ModalProps) => {
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
        className={
          'relative h-293 w-327 flex-col whitespace-nowrap rounded-lg bg-white px-20 py-28 md:h-334 md:w-540 md:px-28 md:py-32'
        }
        onClick={handleContentClick}
      >
        {children}
      </div>
    </div>
  );
};

export default DashboardModal;
