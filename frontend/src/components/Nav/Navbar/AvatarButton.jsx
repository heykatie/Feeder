// import {useSelector } from 'react-redux';


function AvatarButton({toggleSidebar}) {
	// const user = useSelector((store) => store.session.user);
	// const ulRef = useRef();
	// const closeMenu = () => setShowSidebar(false);

	// useEffect(() => {
	// 	if (!showSidebar) return;

	// 	const closeMenu = (e) => {
	// 		if (ulRef.current && !ulRef.current.contains(e.target)) {
	// 			setShowSidebar(false);
	// 		}
	// 	};

	// 	document.addEventListener('click', closeMenu);

	// 	return () => document.removeEventListener('click', closeMenu);
	// }, [showSidebar]);

	return (
		<>
			<button onClick={toggleSidebar} aria-label='profile menu'>
				<i className='fas fa-user-circle' />
			</button>
		</>
	);
}

export default AvatarButton;
