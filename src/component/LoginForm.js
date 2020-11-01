import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';

import InHeader from './InHeader';

import createMuiTheme from '@material-ui/styles/createStyles';
import { Button } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';

function LoginForm({ authenticated, login, location }) {
	const [ username, setUsername ] = useState('');
	const [ password, setPassword ] = useState('');

	const btnTheme = createMuiTheme({
		// maxWidth: '10px',
		// maxHeight: '10px',
		// minWidth: '10px',
		// minHeight: '10px',
		palette: { primary: '#FCBFB7' }
	});

	const handleClick = () => {
		try {
			login({ username, password });
		} catch (e) {
			alert('Failed to login');
			setUsername('');
			setPassword('');
		}
	};

	const appKeyPress = (e) => {
		if (e.key === 'Enter') {
		  handleClick();
		}
	}

	const { from } = location.state || { from: { pathname: '/' } };
	if (authenticated) return <Redirect to={from} />;

	return (
		<div style={{ minHeight: '750px' }}>
			<InHeader />
			<div
				style={{
					display: 'flex',
					justifyContent: 'center',
					alignItems: 'center'
				}}
			>
				<form style={{ display: 'flex', flexDirection: 'column' }}>
					<h3 style={{ textAlign: 'center' }}>로그인</h3>
					<TextField
						id="outlined-basic"
						label="아이디"
						variant="outlined"
						size="small"
						type="text"
						style={{ marginBottom: '1.5rem' }}
						minHeight="1.5rem"
						name="username"
						onChange={({ target: { value } }) => setUsername(value)}
					/>
					<TextField
						id="outlined-basic"
						label="비밀번호"
						variant="outlined"
						size="small"
						style={{ marginBottom: '1.5rem' }}
						minHeight="1.5rem"
						style={{ marginBottom: '1.5rem' }}
						type="password"
						name="password"
						onChange={({ target: { value } }) => setPassword(value)}
						onKeyPress={appKeyPress}
					/>
					<Button onClick={handleClick} theme={btnTheme} fontSize="1rem" color="primary" variant="outlined">
						로그인
					</Button>
				</form>
			</div>
		</div>

		// <div>
		// 	<h1>Login</h1>
		// 	<input
		// 		value={username}
		// 		onChange={({ target: { value } }) => setUsername(value)}
		// 		type="username"
		// 		placeholder="아이디"
		// 	/>
		// 	<input
		// 		value={password}
		// 		onChange={({ target: { value } }) => setPassword(value)}
		// 		type="password"
		// 		placeholder="비밀번호"
		// 	/>
		// 	<button onClick={handleClick}>Login</button>
		// </div>
	);
}

export default LoginForm;
