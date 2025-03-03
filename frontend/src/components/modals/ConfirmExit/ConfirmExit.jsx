import { useNavigate } from 'react-router-dom';
import { useCallback, useEffect, useRef } from 'react';
import './ConfirmExit.css';

export default function ConfirmExit({ showExitModal, setShowExitModal }) {
	const navigate = useNavigate();
	const cancelButtonRef = useRef(null);
	const exitButtonRef = useRef(null);

	// const confirmExit = useCallback(() => {
	// 	navigate('/');
	// 	// window.location.reload();
	// }, [navigate]);

	const confirmExit = useCallback(() => {
		setShowExitModal(false);
		setTimeout(() => {
			navigate('/', { replace: true });
		}, 0);
	}, [navigate, setShowExitModal]);


	useEffect(() => {
				if (cancelButtonRef.current) {
					cancelButtonRef.current.focus();
				}
		const handleKeyDown = (e) => {
			if (e.key === 'Escape') {
				setShowExitModal(false);
			} else if (e.key === 'Enter') {
				confirmExit();
			} else if (e.key === 'Tab') {
				// Ensure Tab only cycles between the two buttons
				if (document.activeElement === cancelButtonRef.current) {
					e.preventDefault();
					exitButtonRef.current.focus();
				} else if (document.activeElement === exitButtonRef.current) {
					e.preventDefault();
					cancelButtonRef.current.focus();
				}
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
						ref={cancelButtonRef}
						className='exit-cancel-btn'
						onClick={() => setShowExitModal(false)}
						tabIndex={0}>
						{' '}
						Cancel
					</button>
					<button
						ref={exitButtonRef}
						className='confirm-exit-btn'
						onClick={confirmExit}
						tabIndex={1}>
						Exit
					</button>
				</div>
			</div>
		</div>
	);
}
