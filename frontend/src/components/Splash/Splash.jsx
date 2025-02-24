import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import './Splash.css';

const Splash = () => {
	const navigate = useNavigate();
	const [loaded, setLoaded] = useState(false);

	// Fun effect: Slight delay before mascot appears
	useEffect(() => {
		setTimeout(() => setLoaded(true), 300);
	}, []);

	return (
		<div className='splash-container'>
			<h1 className='splash-title'>Cook. Feed. Grow.</h1>
			<p className='splash-subtitle'>
				Level up your pet’s meals with nutritious recipes and smart
				shopping.
			</p>

			{/* Mascot with fun zoom effect */}
			<div className={`mascot-wrapper ${loaded ? 'zoom-in' : 'hidden'}`}>
				<img
					src='/images/mascot.png'
					alt='SousChef Mascot'
					className='mascot'
				/>
			</div>

			{/* CTA Buttons */}
			<div className='button-group'>
				<button className='cta-button' onClick={() => navigate('/recipes')}>
					Explore Recipes
				</button>
				<button
					className='cta-button primary'
					onClick={() => navigate('/embark')}>
					Begin Your Journey
				</button>
			</div>
		</div>
	);
};

export default Splash;
