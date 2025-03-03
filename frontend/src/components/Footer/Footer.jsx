import { useState } from 'react';
import { FaEnvelope, FaGithub, FaLinkedin, FaInfoCircle } from 'react-icons/fa';
import './Footer.css';

const contactLinks = {
	about: 'https://heykatie.github.io/',
	email: 'mailto:katieleonght@gmail.com',
	GitHub: 'https://github.com/heykatie',
	LinkedIn: 'https://www.linkedin.com/in/katieleonght/',
};

const tooltips = {
	about: 'heykatie.github.io',
	email: 'katieleonght@gmail',
	GitHub: '@heykatie',
	LinkedIn: 'katieleonght',
};

const Footer = () => {
	const [hovered, setHovered] = useState(null);

	return (
		<footer className='footer'>
			<div className='footer-links'>
				{Object.entries(contactLinks).map(([key, link]) => (
					<a
						key={key}
						href={link}
						target={key !== 'email' ? '_blank' : undefined}
						rel='noopener noreferrer'
						className='footer-link'
						onMouseEnter={() => setHovered(key)}
						onMouseLeave={() => setHovered(null)}>
						{key === 'about' && <FaInfoCircle className='icon' />}
						{key === 'email' && <FaEnvelope className='icon' />}
						{key === 'GitHub' && <FaGithub className='icon' />}
						{key === 'LinkedIn' && <FaLinkedin className='icon' />}
						<span className='link-text'>
							{hovered === key
								? tooltips[key]
								: key.charAt(0).toUpperCase() + key.slice(1)}
						</span>
					</a>
				))}
			</div>
		</footer>
	);
};

export default Footer;