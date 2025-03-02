import { useModal } from '../ModalContext';

// function OpenModal({
// 	modalComponent, // component to render inside the modal
// 	itemText, // text of the button that opens the modal
// 	onItemClick, // optional: callback function that will be called once the button that opens the modal is clicked
// 	onModalClose, // optional: callback function that will be called once the modal is closed
// }) {
// 	const { setModalContent, setOnModalClose } = useModal();

// 	const onClick = () => {
// 		if (onModalClose) setOnModalClose(onModalClose);
// 		setModalContent(modalComponent);
// 		if (typeof onItemClick === 'function') onItemClick();
// 	};

// 	return <li onClick={onClick}>{itemText}</li>;
// }



function OpenModal({
	modalComponent, // Component to render inside the modal
	itemText, // Text of the button that opens the modal
	onItemClick, // Callback function when opening the modal
	onModalClose, // Callback function when closing the modal
	parentModal, // 🆕 Pass the first modal component to reopen after closing the second
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
		if (typeof onItemClick === 'function') onItemClick();
	};

	return <li onClick={onClick}>{itemText}</li>;
}

export default OpenModal;