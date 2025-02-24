import { FaEnvelope, FaGithub, FaLinkedin, FaInfoCircle } from 'react-icons/fa';
import './Footer.css';

const contactLinks = {
	about: 'https://heykatie.github.io/',
	email: 'mailto:katieleonght@gmail.com',
	github: 'https://github.com/heykatie',
	linkedin: 'https://www.linkedin.com/in/katieleonght/',
};


const Footer = () => {
	return (
		<footer className='footer'>
			<div className='footer-links'>
				<a
					href={contactLinks.about}
					target='_blank'
					rel='noopener noreferrer'
					className='footer-link'>
					<FaInfoCircle className='icon' /> About
				</a>
				<a href={contactLinks.email} className='footer-link'>
					<FaEnvelope className='icon' /> Email
				</a>
				<a
					href={contactLinks.github}
					target='_blank'
					rel='noopener noreferrer'
					className='footer-link'>
					<FaGithub className='icon' /> GitHub
				</a>
				<a
					href={contactLinks.linkedin}
					target='_blank'
					rel='noopener noreferrer'
					className='footer-link'>
					<FaLinkedin className='icon' /> LinkedIn
				</a>
			</div>
		</footer>
	);
};

export default Footer;