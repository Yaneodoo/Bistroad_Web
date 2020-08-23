import React from 'react';
import classNames from 'classnames/bind';
import createMuiTheme from '@material-ui/styles/createStyles';
import Api from '../Api.js';
import styles from './Home.scss';

const cx = classNames.bind(styles);

const Home = () => (
	<div className={cx('home')}>
		Bistroad는<br />작은 가게라는 뜻의 'Bistro'와<br />길이라는 뜻의'Road'의 합성어입니다.
	</div>
);

export default Home;
