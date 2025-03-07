import { useRef, useState, useContext, useEffect, useCallback } from 'react';
import ReactDOM from 'react-dom';
import { ModalContext } from './ModalContext';
import './Modal.css';

export function ModalProvider({ children }) {
	const modalRef = useRef();
	const [modalContent, setModalContent] = useState(null);
	const [onModalClose, setOnModalClose] = useState(null);

	const closeModal = useCallback(() => {
		setModalContent(null);
		if (typeof onModalClose === 'function') {
			setOnModalClose(null);
			onModalClose();
		}
	}, [onModalClose]);

	useEffect(() => {
		const handleKeyDown = (e) => {
			if (e.key === 'Escape') {
				closeModal();
			}
		};

		document.addEventListener('keydown', handleKeyDown);
		return () => document.removeEventListener('keydown', handleKeyDown);
	}, [closeModal]);

	const contextValue = {
		modalRef,
		modalContent,
		setModalContent,
		setOnModalClose,
		closeModal,
	};

	return (
		<>
			<ModalContext.Provider value={contextValue}>
				{children}
			</ModalContext.Provider>
			<div ref={modalRef} />
		</>
	);
}

export function Modal() {
	const { modalRef, modalContent, closeModal } = useContext(ModalContext);
	if (!modalRef || !modalRef.current || !modalContent) return null;

	return ReactDOM.createPortal(
		<div id='modal'>
			<div id='modal-background' onClick={closeModal} />
			<div id='modal-content'>
				<button
					aria-label='close-btn'
					id='modal-close'
					onClick={closeModal}>
					{/* <i className='fa-solid fa-xmark'></i> */}✖
				</button>
				{modalContent}
			</div>
		</div>,
		modalRef.current
	);
}
