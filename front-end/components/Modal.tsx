import React from 'react';

interface ModalProps {
  isOpen: boolean;           
  onClose: () => void;       
  contentLabel: string;      
  children: React.ReactNode; 
}

const Modal: React.FC<ModalProps> = ({ onClose, children }) => {
  return (
    <div className="modal-overlay fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="modal-content bg-white rounded-lg p-6 relative max-w-md w-full">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-600 text-2xl"
        >
          &times;
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
