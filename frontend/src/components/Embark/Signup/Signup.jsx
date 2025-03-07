import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { signup } from '../../../redux/users';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import OpenModal from '../../../context/OpenModal';
import { useModal } from '../../../context/Modal/ModalContext';
import './Signup.css';
import LoginModal from '../../modals/LoginModal';

const Signup = ({ mode, errors = {}, onUpdate, initialData, handleSubmit }) => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const { closeModal } = useModal();

	const [username, setUsername] = useState(initialData?.username || '');
	const [email, setEmail] = useState(initialData?.email || '');
	const [password, setPassword] = useState('');
	const [showPassword, setShowPassword] = useState(false);
	const [errs, setErrs] = useState({});

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

	const handleSignup = async (e) => {
		e.preventDefault();

		if (mode === 'fast') {
			const serverResponse = await dispatch(
				signup({ username, email, password })
			);

			if (serverResponse.error) {
				setErrs(
					serverResponse.payload.errors || serverResponse.payload.message
				);
				// } else if (location.state?.from) {
				// 	navigate(location.state.from);
				// 	closeModal();
			} else {
				navigate('/dash');
				closeModal();
			}
			return;
		}

		handleSubmit(e);
	};

	const togglePasswordVisibility = () => {
		setShowPassword((prev) => !prev);
	};

	return (
		<div
			className={`signup-form ${
				mode === 'fast' ? 'signup-modal show' : ''
			}`}>
			<img
				src='/gif/cat-gifs/new-cat.gif'
				alt='SousChef Logo'
				className='page-logo'
			/>
			<h2>Begin Your Adventure</h2>

			{errors && Array.isArray(errors) ? (
				errors?.map((err, index) => (
					<p key={index} className='error-message'>
						{err}
					</p>
				))
			) : typeof errors === 'object' ? (
				Object.values(errors).map((err, index) => (
					<p key={index} className='error-message'>
						{err}
					</p>
				))
			) : (
				<p className='error-message'>{errors}</p>
			)}
			{errs && Array.isArray(errs) ? (
				errs?.map((err, index) => (
					<p key={index} className='error-message'>
						{err}
					</p>
				))
			) : typeof errs === 'object' ? (
				Object.values(errs).map((err, index) => (
					<p key={index} className='error-message'>
						{err}
					</p>
				))
			) : (
				<p className='error-message'>{errs}</p>
			)}

			<form onSubmit={handleSignup}>
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

				{mode === 'fast' && (
					<button type='submit' className='signup-button'>
						Sign Up
					</button>
				)}

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

				{mode === 'fast' && (
					<OpenModal
						itemText={
							<p className='signup-text'>
								Have an account?{' '}
								<span
									className='signup-link'
									onClick={() => {
										closeModal();
									}}>
									Log in
								</span>
							</p>
						}
						modalComponent={<LoginModal />}
					/>
				)}
			</form>
		</div>
	);
};

export default Signup;
