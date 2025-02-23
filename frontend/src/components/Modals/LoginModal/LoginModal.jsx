import { useState } from 'react';
import { login } from '../../../redux/session';
import { useDispatch } from 'react-redux';
import { useModal } from '../../../context/ModalContext';
import './LoginModal.css';

function LoginFormModal() {
	const dispatch = useDispatch();
	const [credential, setCredential] = useState('');
	const [password, setPassword] = useState('');
	const [errors, setErrors] = useState({});
	const { closeModal } = useModal();

	const handleSubmit = async (e) => {
		e.preventDefault();

		const serverResponse = await dispatch(
			login({
				credential,
				password,
			})
		);

		if (serverResponse) {
			setErrors(serverResponse);
		} else {
			closeModal();
		}
	};

	// 🔹 OAuth Login Handlers
	const handleGoogleLogin = () => {
		window.location.href = `${
			import.meta.env.VITE_APP_API_URL
		}/api/oauth/google`;
	};

	const handleDiscordLogin = () => {
		window.location.href = `${
			import.meta.env.VITE_APP_API_URL
		}/api/oauth/discord`;
	};

	return (
		<div className='login-modal'>
			<img src='/images/logo.png' alt='SousChef Logo' className='logo' />
			<h2>Log in to SousChef</h2>

			<form onSubmit={handleSubmit}>
				<div className='input-container'>
					<input
						type='text'
						placeholder='Email or username'
						value={credential}
						onChange={(e) => setCredential(e.target.value)}
						required
					/>
				</div>
				<div className='input-container password-container'>
					<input
						type='password'
						placeholder='Password'
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						required
					/>
					<span className='forgot-password'>FORGOT?</span>
				</div>

				<button type='submit' className='login-button'>
					Log In
				</button>

				<div className='or-divider'>
					<span>OR</span>
				</div>

				<div className='social-login'>
					<button className='google-login' onClick={handleGoogleLogin}>
						<i className='fa-brands fa-google'></i> Google
					</button>
					<button className='discord-login' onClick={handleDiscordLogin}>
						<i className='fa-brands fa-discord'></i> Discord
					</button>
				</div>

				<p className='signup-text'>
					Don’t have an account?{' '}
					<span className='signup-link'>Sign up</span>
				</p>
			</form>
		</div>
	);
}

export default LoginFormModal;
