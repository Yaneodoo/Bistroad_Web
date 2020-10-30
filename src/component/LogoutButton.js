import React from 'react';
import { withRouter, Link } from 'react-router-dom';
import styles from './Header.scss';

import classNames from 'classnames/bind';

const cx = classNames.bind(styles);
function LogoutButton({ logout, history }) {
	const handleClick = () => {
		logout();
		history.push('/');
	};
	return (
		<Link onClick={handleClick} style={{ textDecoration: 'none', color: 'white' }}>
			<li className={cx('li')}>로그아웃</li>
		</Link>
	);
}

export default withRouter(LogoutButton);
