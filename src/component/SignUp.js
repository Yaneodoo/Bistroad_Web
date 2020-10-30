import React, { Component } from 'react';
import { Button } from '@material-ui/core';
import classNames from 'classnames/bind';
import createMuiTheme from '@material-ui/styles/createStyles';
import Api from '../Api.js';
import s from './SignUp.scss';
import InHeader from './InHeader';
import TextField from '@material-ui/core/TextField';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
const cx = classNames.bind(s);

const btnTheme = createMuiTheme({
	maxWidth: '30px',
	maxHeight: '30px',
	minWidth: '30px',
	minHeight: '30px',
	palette: { primary: '#FCBFB7' }
});

class SignUp extends Component {
	constructor(props) {
		super(props);
		this.state = {
			check: null,
			username: '',
			password: '',
			pwCheck: '',
			fullName: '',
			phone: '',
			role: '',
			usableId: false
		};
	}

	handleSubmit = (e) => {
		e.preventDefault();
		const { username, password, fullName, phone, role, usableId } = this.state;
		if (usableId === false) {
			alert('id 중복검사를 해주세요!');
		} else if (!username || !password || !fullName || !phone || !role) {
			alert('필수항목을 작성해주세요');
		} else {
			Api.post('/users', {
				username,
				password,
				fullName,
				phone,
				role
			}).then((res) => {
				if (res.status === 400) {
					alert('다시 한 번 확인해주세요!');
				} else {
					this.props.history.push('/login');
				}
			});
		}
	};

	handleCheck = (e) => {
		e.preventDefault();

		Api.get('/users?username=' + this.state.username).then((response) => {
			if (response.data.length > 0) {
				alert('사용 불가한 아이디입니다.');
			} else {
				alert('사용 가능한 아이디 입니다.');
				this.setState({
					usableId: true
				});
			}
		});
	};

	render() {
		const { classes } = this.props;
		return (
			<div style={{ minHeight: '750px', textAlign: 'center' }}>
				<InHeader />
				<h3 style={{ display: 'block', textAlign: 'center' }}>회원가입</h3>

				<div
					style={{
						display: 'flex',
						justifyContent: 'center',
						alignItems: 'center'
					}}
				>
					<form
						type="submit"
						style={{
							display: 'inline-block',
							width: '30ch'
						}}
					>
						<table className={cx('table')}>
							<tbody>
								<tr>
									<td className={cx('td')}>
										<TextField
											id="outlined-basic"
											label="이름"
											variant="outlined"
											size="small"
											type="text"
											name="fullName"
											onChange={({ target: { value } }) =>
												this.setState({
													fullName: value
												})}
											style={{ width: '250px' }}
										/>
									</td>
								</tr>
								<tr className={cx('td')}>
									<td>
										<TextField
											id="outlined-basic"
											label="아이디"
											variant="outlined"
											size="small"
											type="text"
											name="username"
											onChange={({ target: { value } }) =>
												this.setState({
													username: value
												})}
										/>
									</td>
									<td>
										<Button
											theme={btnTheme}
											color="primary"
											variant="outlined"
											size="small"
											onClick={this.handleCheck}
											classname={cx('root')}
											style={{ height: '2.5rem', fontSize: '0.65rem', padding: '1px' }}
										>
											중복확인
										</Button>
									</td>
								</tr>
								<tr>
									<td className={cx('td')}>
										<TextField
											id="outlined-basic"
											label="비밀번호"
											variant="outlined"
											size="small"
											type="password"
											name="password"
											onChange={({ target: { value } }) =>
												this.setState({
													password: value
												})}
											style={{ width: '250px' }}
										/>
									</td>
								</tr>
								<tr>
									<td className={cx('td')}>
										<TextField
											id="outlined-basic"
											label="핸드폰"
											variant="outlined"
											size="small"
											type="text"
											name="phone"
											onChange={({ target: { value } }) =>
												this.setState({
													phone: value
												})}
											style={{ width: '250px' }}
										/>
									</td>
								</tr>
								<tr className={cx('type')}>
									<FormControl component="fieldset">
										<FormLabel style={{ display: 'inline-block', textAlign: 'left' }}>유형</FormLabel>
										<RadioGroup row aria-label="position" name="role" defaultValue="top">
											<FormControlLabel
												name="role"
												value="ROLE_USER"
												onChange={({ target: { value } }) =>
													this.setState({
														role: value
													})}
												control={<Radio color="primary" />}
												label="손님"
												style={{ fontSize: '0.8rem' }}
											/>
											<FormControlLabel
												name="role"
												value="ROLE_STORE_OWNER"
												onChange={({ target: { value } }) =>
													this.setState({
														role: value
													})}
												control={<Radio color="primary" />}
												label="점주"
											/>
										</RadioGroup>
									</FormControl>
								</tr>
								<tr>
									<td colSpan="2">
										<Button
											theme={btnTheme}
											fontSize="1rem"
											color="primary"
											variant="outlined"
											onClick={this.handleSubmit}
										>
											가입하기
										</Button>
									</td>
								</tr>
							</tbody>
						</table>
					</form>
				</div>
			</div>
		);
	}
}

// class SignUp extends React.Component {
// 	state = {
// 		username: '',
// 		password: '',
// 		fullName: '',
// 		phone: '',
// 		role: ''
// 	};

// 	handleChange = (e) => {
// 		this.setState({
// 			[e.target.name]: e.target.value
// 		});
// 	};

// 	handleSubmit = (e) => {
// 		e.preventDefault();

// 		if (checkName(this.state.username)) {
// 			Api.post('/users', {
// 				username: this.state.username,
// 				password: this.state.password,
// 				fullName: this.state.fullName,
// 				phone: this.state.phone,
// 				role: this.state.role
// 			}).catch((error) => {
// 				console.log('error : ', error);
// 			});
// 		} else {
// 			alert('존재하는 id입니다!');
// 		}
// 		// const response = Api.post('/users', {
// 		// 	username: this.state.username,
// 		// 	password: this.state.password,
// 		// 	fullName: this.state.fullName,
// 		// 	phone: this.state.phone,
// 		// 	role: this.state.role
// 		// }).catch((error) => {
// 		// 	console.log('error : ', error);
// 		// });
// 	};

// 	render() {
// 		return (
// 			<div>
// 				<InHeader />
// 				<div>
// 					<h3>회원가입</h3>
// 					<form type="submit" style={{ display: 'inline-block' }}>
// 						<table className={cx('table')}>
// 							<tbody>
// 								<tr>
// 									<td colSpan="2" className={cx('th')}>
// 										이름
// 									</td>
// 								</tr>
// 								<tr>
// 									<td colSpan="2" className={cx('td')}>
// 										<input type="text" name="fullName" onChange={this.handleChange} />
// 									</td>
// 								</tr>
// 								<tr>
// 									<td colSpan="2" className={cx('th')}>
// 										아이디
// 									</td>
// 								</tr>
// 								<tr className={cx('td')}>
// 									<td>
// 										<input type="text" name="username" onChange={this.handleChange} />
// 									</td>
// 									<td>
// 										<button className={cx('button')}>중복확인</button>
// 									</td>
// 								</tr>
// 								<tr>
// 									<td colSpan="2" className={cx('th')}>
// 										비밀번호
// 									</td>
// 								</tr>
// 								<tr>
// 									<td colSpan="2" className={cx('td')}>
// 										<input type="password" name="password" onChange={this.handleChange} />
// 									</td>
// 								</tr>
// 								<tr>
// 									<td colSpan="2" className={cx('th')}>
// 										핸드폰
// 									</td>
// 								</tr>
// 								<tr>
// 									<td colSpan="2" className={cx('td')}>
// 										<input type="text" name="phone" onChange={this.handleChange} />
// 									</td>
// 								</tr>
// 								<tr>
// 									<td colSpan="2" className={cx('th')}>
// 										유형
// 									</td>
// 								</tr>
// 								<tr className={cx('type')}>
// 									<td>
// 										<input
// 											type="radio"
// 											name="role"
// 											value="ROLE_USER"
// 											onChange={this.handleChange}
// 										/>손님
// 									</td>
// 									<td>
// 										<input
// 											type="radio"
// 											name="role"
// 											value="ROLE_STORE_OWNER"
// 											onChange={this.handleChange}
// 										/>점주
// 									</td>
// 								</tr>
// 								<tr>
// 									<td colSpan="2">
// 										<Button
// 											theme={btnTheme}
// 											fontSize="1rem"
// 											color="primary"
// 											variant="outlined"
// 											onClick={this.handleSubmit}
// 										>
// 											가입하기
// 										</Button>
// 									</td>
// 								</tr>
// 							</tbody>
// 						</table>
// 					</form>
// 				</div>
// 			</div>
// 		);
// 	}
// }

export default SignUp;
