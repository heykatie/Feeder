import { useEffect, useRef } from 'react';

const HorizontalScrollContainer = ({ children, className = '' }) => {
	const containerRef = useRef(null);

	useEffect(() => {
		const container = containerRef.current;
		if (!container) return;

		const handleScroll = (event) => {
			event.preventDefault();
			container.scrollBy({
				left: event.deltaY * 2,
				behavior: 'smooth',
			});
		};

		const handleKeyDown = (event) => {
			const scrollAmount = 200;
			const maxScrollLeft = container.scrollWidth - container.clientWidth;
			const currentScroll = container.scrollLeft;
			if (event.key === 'ArrowLeft' && currentScroll > 0) {
				container.scrollBy({
					left: -scrollAmount,
					behavior: 'smooth',
				});
			} else if (
				event.key === 'ArrowRight' &&
				currentScroll < maxScrollLeft
			) {
				container.scrollBy({
					left: scrollAmount,
					behavior: 'smooth',
				});
			}
		};

		container.addEventListener('wheel', handleScroll);
		window.addEventListener('keydown', handleKeyDown);

		return () => {
			container.removeEventListener('wheel', handleScroll);
			window.removeEventListener('keydown', handleKeyDown);
		};
	}, []);

	return (
		<div className={className} ref={containerRef}>
			{children}
		</div>
	);
};

export default HorizontalScrollContainer;
