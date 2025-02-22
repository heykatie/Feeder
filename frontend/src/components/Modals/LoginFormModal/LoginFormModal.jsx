import { useState } from 'react';
import { login } from '../../../redux/session';
import { useDispatch } from 'react-redux';
import { useModal } from '../../../context/ModalContext';
// import './LoginForm.css';

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

	return (
		<>
			<h1>Log In</h1>
			<form onSubmit={handleSubmit}>
				<label>
					Credential
					<input
						type='text'
						value={credential}
						onChange={(e) => setCredential(e.target.value)}
						required
					/>
				</label>
				{errors.email && <p>{errors.email}</p>}
				<label>
					Password
					<input
						type='password'
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						required
					/>
				</label>
				{errors.password && <p>{errors.password}</p>}
				<button type='submit'>Log In</button>
			</form>
		</>
	);
}

export default LoginFormModal;
