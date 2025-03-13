import { useEffect, useRef } from 'react';
import { useModal } from '../../../context/Modal/ModalContext';
import './ConfirmDelete.css';

export default function ConfirmDelete({ onConfirm, itemType = 'recipe' }) {
	const { closeModal } = useModal();
	const cancelButtonRef = useRef(null);
	const deleteButtonRef = useRef(null);

	useEffect(() => {
		if (cancelButtonRef.current) {
			cancelButtonRef.current.focus();
		}

		const handleKeyDown = (e) => {
			if (e.key === 'Escape') {
				closeModal();
			} else if (e.key === 'Enter') {
				onConfirm();
			} else if (e.key === 'Tab') {
				if (document.activeElement === cancelButtonRef.current) {
					e.preventDefault();
					deleteButtonRef.current.focus();
				} else if (document.activeElement === deleteButtonRef.current) {
					e.preventDefault();
					cancelButtonRef.current.focus();
				}
			}
		};

		window.addEventListener('keydown', handleKeyDown);
		return () => window.removeEventListener('keydown', handleKeyDown);
	}, [closeModal, onConfirm]);

	return (
		<div className='delete-modal-overlay'>
			<div className='delete-modal'>
				<p>Are you sure you want to delete this {itemType}?</p>
				<div className='delete-modal-buttons'>
					<button
						ref={cancelButtonRef}
						className='delete-cancel-btn'
						onClick={closeModal}
						tabIndex={0}>
						Cancel
					</button>
					<button
						ref={deleteButtonRef}
						className='delete-confirm-btn'
						onClick={onConfirm}
						tabIndex={1}>
						Delete
					</button>
				</div>
			</div>
		</div>
	);
}
