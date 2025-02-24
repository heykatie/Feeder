import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { signup } from '../../../redux/users';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import './Signup.css';

const Signup = ({ onNext }) => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const [username, setUsername] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [showPassword, setShowPassword] = useState(false);
	const [errors, setErrors] = useState({});

	const handleSignup = async (e) => {
		e.preventDefault();
		const serverResponse = await dispatch(
			signup({ username, email, password })
		);

		if (serverResponse) {
			setErrors(serverResponse);
		} else {
			onNext(); // Move to the next step after signing up
		}
	};

	const togglePasswordVisibility = () => {
		setShowPassword((prev) => !prev);
	};

	return (
		<div className='signup-form'>
			<img
				src='/images/logo.png'
				alt='SousChef Logo'
				className='page-logo'
			/>
			<h2>Begin Your Adventure</h2>
			<form onSubmit={handleSignup}>
				<div className='input-container'>
					<input
						type='text'
						placeholder='Username*'
						value={username}
						onChange={(e) => setUsername(e.target.value)}
						required
					/>
				</div>

				<div className='input-container'>
					<input
						type='email'
						placeholder='Email*'
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						required
					/>
				</div>

				<div className='password-container'>
					<input
						type={showPassword ? 'text' : 'password'}
						placeholder='Password*'
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						required
					/>
					<span
						className='password-toggle'
						onClick={togglePasswordVisibility}>
						{showPassword ? <FaEyeSlash /> : <FaEye />}
					</span>
				</div>

				<button type='submit' className='signup-button'>
					Sign Up
				</button>

				<div className='or-divider'>
					<span>or Signup with</span>
				</div>

				<div className='social-login'>
					<a href='/api/oauth/google' className='google-login'>
						<i className='fa-brands fa-google'></i> Google
					</a>
					<a href='/api/oauth/discord' className='discord-login'>
						<i className='fa-brands fa-discord'></i> Discord
					</a>
				</div>
			</form>
		</div>
	);
};

export default Signup;
