import React, { useState, useEffect } from 'react';
import { Link, Route, Switch, BrowserRouter as Router } from 'react-router-dom';

import { signIn } from './actions/auth';
import AuthRoute from './actions/AuthRoute';

import Home from './component/Home';
import Profile from './component/Profile';
import LoginForm from './component/LoginForm';
import LogoutButton from './component/LogoutButton';
import SignUp from './component/SignUp';
import Store from './component/Store';
import Review from './component/Review';

import classNames from 'classnames/bind';
import styles from './component/Header.scss';
import Avatar from '@material-ui/core/Avatar';
import { makeStyles } from '@material-ui/core/styles';

const cx = classNames.bind(styles);

const useStyles = makeStyles((theme) => ({
	root: {
	  display: 'flex',
	  '& > *': {
		margin: theme.spacing(1),
	  },
	},
	small: {
	  width: theme.spacing(4),
	  height: theme.spacing(4),
	},
  }));

function App() {
	const [ user, setUser ] = useState(null);
	const authenticated = user != null;

	// const login = ({ username, password }) => setUser(signIn({ username, password })); // async 함수 사용
	function login({ username, password }) {
		signIn({ username, password }).then((user) => {
			setUser(user);
		});
	}

	const logout = () => setUser(null);
	const classes = useStyles();

	useEffect(() => {
		window.scrollTo(0, 0)
	  }, [])

	return (
		<Router basename={process.env.PUBLIC_URL}>
			<header className={cx('header')}>
				<ul className={cx('ul')}>
					{authenticated ? (
						<LogoutButton logout={logout} />
					) : (
						<Link to="/login" style={{ textDecoration: 'none', color: 'white' }}>
							<li className={cx('li')}>로그인</li>
						</Link>
					)}

					{authenticated ? null : (
						<Link to="/signUp" style={{ textDecoration: 'none', color: 'white' }}>
							<li className={cx('li')}>회원가입</li>
						</Link>
					)}

					{authenticated ? (
						<Link to="/profile" style={{ textDecoration: 'none', color: 'white' }}>
							<li className={cx('avatar')}>
								{user.photo ? (
									<Avatar alt={user.username} src={user.photo.thumbnailUrl} className={classes.small}/>
								) : (
									<Avatar src="/broken-image.jpg" className={classes.small}/>
								)}
							</li>
							
						</Link>
					) : null}
				</ul>
			</header>
			<div>
				<Switch>
					<Route exact path="/" component={Home} />
					<Route
						path="/login"
						render={(props) => <LoginForm authenticated={authenticated} login={login} {...props} />}
					/>
					<Route path="/signUp" component={SignUp} />
					<Route path="/store/:storeId/:ownerId" component={Store} />
					<Route path="/store/:storeId" component={Store} />
					<Route path="/item/:storeId/:itemId" component={Review} />
					<AuthRoute
						authenticated={authenticated}
						path="/profile"
						render={(props) => <Profile user={user} {...props} />}
					/>
				</Switch>
			</div>
			<footer
				style={{
					minHeight: '1%',
					bottom: '0',
					padding: '5px',
					borderTop: '1px solid #d9d9d9',
					fontSize: '12px',
					backgroundColor: '#f1f1f1',
					textAlign: 'center',
					color: '#888',
					verticalAlign: 'center'
				}}
			>
				©Yaneodoo
			</footer>
		</Router>
	);
}

export default App;
