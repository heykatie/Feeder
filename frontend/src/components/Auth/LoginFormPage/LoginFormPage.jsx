import { useState } from 'react';
import { login } from '../../../redux/session';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, useNavigate } from 'react-router-dom';
// import './LoginForm.css';

function LoginFormPage() {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const sessionUser = useSelector((state) => state.session.user);
	const [credential, setCredential] = useState('');
	const [password, setPassword] = useState('');
	const [errors, setErrors] = useState({});

	if (sessionUser) return <Navigate to='/' replace={true} />;

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
			navigate('/');
		}
	};

	return (
		<>
			<h1>Log In</h1>
			{errors.length > 0 &&
				errors.map((message) => <p key={message}>{message}</p>)}
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
				{errors.credential && <p>{errors.credential}</p>}
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

export default LoginFormPage;
