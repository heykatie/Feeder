import { useNavigate } from 'react-router-dom';
import { useCallback, useEffect } from 'react';
import './ConfirmExit.css';

export default function ConfirmExit({ showExitModal, setShowExitModal }) {
	const navigate = useNavigate();

	const confirmExit = useCallback(() => {
		navigate('/'); 
	}, [navigate]);


	useEffect(() => {
		const handleKeyDown = (e) => {
			if (e.key === 'Escape') {
				setShowExitModal(false);
			} else if (e.key === 'Enter') {
				confirmExit();
			}
		};

		if (showExitModal) {
			window.addEventListener('keydown', handleKeyDown);
		}

		return () => window.removeEventListener('keydown', handleKeyDown);
	}, [showExitModal, confirmExit, setShowExitModal]);

	return (
		<div className={`exit-modal ${showExitModal ? 'visible' : ''}`}>
			<div className='exit-modal-content'>
				<p>Are you sure? Exiting will lose your progress.</p>
				<div className='exit-modal-buttons'>
					<button
						className='exit-cancel-btn'
						onClick={() => setShowExitModal(false)}>
						Cancel
					</button>
					<button className='confirm-exit-btn' onClick={confirmExit}>
						Exit
					</button>
				</div>
			</div>
		</div>
	);
}
