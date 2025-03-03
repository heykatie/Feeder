import { useModal } from '../ModalContext';

// function OpenModalButton({
// 	modalComponent, // component to render inside the modal
// 	buttonText, // text of the button that opens the modal
// 	onButtonClick, // optional: callback function that will be called once the button that opens the modal is clicked
// 	onModalClose, // optional: callback function that will be called once the modal is closed
// }) {
// 	const { setModalContent, setOnModalClose } = useModal();

// 	const onClick = () => {
// 		if (onModalClose) setOnModalClose(onModalClose);
// 		setModalContent(modalComponent);
// 		if (typeof onButtonClick === 'function') onButtonClick();
// 	};

// 	return <button onClick={onClick}>{buttonText}</button>;
// }


function OpenModalButton({
	modalComponent, 
	buttonText, 
	onButtonClick, 
	parentModal, 
	onModalClose,
}) {
	const { setModalContent, setOnModalClose } = useModal();

	const onClick = () => {
		if (onModalClose) {
			setOnModalClose(() => () => {
				onModalClose();
				if (parentModal) {
					setModalContent(parentModal); // Reopen first modal when second closes
				}
			});
		} else if (parentModal) {
			setOnModalClose(() => () => setModalContent(parentModal));
		}

		setModalContent(modalComponent);
		if (typeof onButtonClick === 'function') onButtonClick();
	};

	return <button onClick={onClick}>{buttonText}</button>;
}

export default OpenModalButton;