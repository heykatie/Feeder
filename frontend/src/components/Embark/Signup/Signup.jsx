import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { signup } from '../../../redux/users';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import './Signup.css';

const Signup = ({ onNext, onUpdate, initialData, handleSubmit }) => {
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const [username, setUsername] = useState(initialData.username || '');
	const [email, setEmail] = useState(initialData.email || '');
	const [password, setPassword] = useState('');
	const [showPassword, setShowPassword] = useState(false);
	const [errors, setErrors] = useState({});

	const handleChange = (field, value) => {
		if (field === 'username') setUsername(value);
		if (field === 'email') setEmail(value);
		if (field === 'password') setPassword(value);

		onUpdate({
			username: field === 'username' ? value : username,
			email: field === 'email' ? value : email,
			password: field === 'password' ? value : password,
		});
	};

	// const handleSignup = async (e) => {
	// 	e.preventDefault();
	// 	const serverResponse = await dispatch(
	// 		signup({ username, email, password })
	// 	);

	// 	if (serverResponse) {
	// 		setErrors(serverResponse);
	// 	} else {
	// 		onNext();
	// 	}
	// };

	const togglePasswordVisibility = () => {
		setShowPassword((prev) => !prev);
	};

	return (
		<div className='signup-form'>
			<img
				src='/images/assets/logo.png'
				alt='SousChef Logo'
				className='page-logo'
			/>
			<h2>Begin Your Adventure</h2>
			<form onSubmit={handleSubmit}>
				<div className='input-container'>
					<input
						type='text'
						placeholder='Username*'
						value={username}
						onChange={(e) => handleChange('username', e.target.value)}
						required
					/>
				</div>

				<div className='input-container'>
					<input
						type='email'
						placeholder='Email*'
						value={email}
						onChange={(e) => handleChange('email', e.target.value)}
						required
					/>
				</div>

				<div className='password-container'>
					<input
						type={showPassword ? 'text' : 'password'}
						placeholder='Password*'
						value={password}
						onChange={(e) => handleChange('password', e.target.value)}
						required
					/>
					<span
						className='password-toggle'
						onClick={togglePasswordVisibility}>
						{showPassword ? <FaEyeSlash /> : <FaEye />}
					</span>
				</div>

				{/* <button type='submit' className='signup-button'>
					Sign Up
				</button> */}

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
