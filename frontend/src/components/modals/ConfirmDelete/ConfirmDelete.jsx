import { useEffect } from 'react';
import { useModal } from '../../../context/ModalContext';
import './ConfirmDelete.css';

export default function ConfirmDelete({ onConfirm, itemType = 'recipe' }) {
	const { closeModal } = useModal();

	useEffect(() => {
		const handleKeyDown = (e) => {
			if (e.key === 'Escape') {
				closeModal();
			}
		};

		window.addEventListener('keydown', handleKeyDown);
		return () => window.removeEventListener('keydown', handleKeyDown);
	}, [closeModal]);

	return (
		<div className='delete-modal-overlay'>
			<div className='delete-modal'>
				<p>Are you sure you want to delete this {itemType}?</p>
				<div className='delete-modal-buttons'>
					<button className='delete-cancel-btn' onClick={closeModal}>
						Cancel
					</button>
					<button className='delete-confirm-btn' onClick={onConfirm}>
						Delete
					</button>
				</div>
			</div>
		</div>
	);
}
