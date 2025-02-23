import { useState } from 'react';
import { login } from '../../../redux/session';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useModal } from '../../../context/ModalContext';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import './LoginModal.css';

function LoginFormModal() {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const [credential, setCredential] = useState('');
	const [password, setPassword] = useState('');
	const [errors, setErrors] = useState({});
	const [showPassword, setShowPassword] = useState(false);
	const { closeModal } = useModal();

	const handleLogin = async (e) => {
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
			navigate('/dashboard');
		}
	};

		const demoLogin = async (e) => {
		e.preventDefault();
		const demoCredential = 'demo@user.io';
		const demoPassword = 'Password123@';
		try {
			await dispatch(
				login({ credential: demoCredential, password: demoPassword })
			);
			navigate('/dashboard');
			closeModal();
		} catch (res) {
			const data = await res.json();
			if (data && data.message) setErrors(data);
		}
	};

	const togglePasswordVisibility = () => {
		setShowPassword((prev) => !prev);
	};

	return (
		<div className='login-modal'>
			<img src='/images/logo.png' alt='SousChef Logo' className='logo' />
			<h2>Log in to SousChef</h2>

			<form onSubmit={handleLogin}>
				<div className='input-container'>
					<input
						type='text'
						placeholder='Email or username'
						value={credential}
						onChange={(e) => setCredential(e.target.value)}
						required
					/>
				</div>
				<div className='password-container'>
					<input
						type={showPassword ? 'text' : 'password'}
						placeholder='Password'
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

				<div className='login'>
					<button type='submit' className='login-button'>
						Log In
					</button>
				</div>

				<div className='demologin'>
					<button
						className='btn-secondary w-full mt-4'
						onClick={demoLogin}>
						Demo Account
					</button>
				</div>

				<div className='or-divider'>
					<span>OR</span>
				</div>

				<div className='social-login'>
					<a href='/api/oauth/google' className='google-login'>
						<i className='fa-brands fa-google'></i> Google
					</a>
					<a href='/api/oauth/discord' className='discord-login'>
						<i className='fa-brands fa-discord'></i> Discord
					</a>
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
