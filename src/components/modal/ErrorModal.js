// src/components/ErrorModal.js
import React from 'react';
import Modal from 'react-modal';

Modal.setAppElement('#root'); // 접근성 설정

function ErrorModal({ isOpen, message, onClose }) {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Error Modal"
      style={{
        overlay: {
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
        },
        content: {
          width: '300px',
          margin: 'auto',
          padding: '20px',
          borderRadius: '8px',
          textAlign: 'center',
        },
      }}
    >
      <h2>오류 발생</h2>
      <p>{message}</p>
      <button onClick={onClose}>닫기</button>
    </Modal>
  );
}

export default ErrorModal;
