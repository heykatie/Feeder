import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import './Splash.css';

const Splash = () => {
	const user = useSelector(state => state.session.user)
	const navigate = useNavigate();
	const [loaded, setLoaded] = useState(false);

	useEffect(() => {
		setTimeout(() => setLoaded(true), 300);
	}, []);

	if (user) {
		navigate('/dash')
	}

	return (
		<div className='splash-container'>
			<h1 className='splash-title'>Cook. Feed. Grow.</h1>
			<p className='splash-subtitle'>
				Level up your pet’s meals with nutritious recipes and smart
				shopping.
			</p>

			<div className={`mascot-wrapper ${loaded ? 'zoom-in' : 'hidden'}`}>
				<img
					src='/images/assets/mascot.png'
					alt='SousChef Mascot'
					className='mascot'
				/>
			</div>

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
