import React, { useState, Component } from 'react';
import PropTypes from 'prop-types';
import '../styles/Store.css';
import LinesEllipsis from 'react-lines-ellipsis';
import { Link, useHistory } from 'react-router-dom';
import Api from '../Api';

import { makeStyles,useTheme  } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';

function ReviewList({ writer, orderId, contents, stars, photoUri, photo, item }) {
	const history = useHistory();

	const [ user, setUser ] = useState(null);

	const review = (id) => {
		console.log(id);
		let path = '/item/' + id;
		history.push(path);
	};

	const useStyles = makeStyles((theme) => ({
		root: {
		  display: 'flex',
		  width: 250
		},
		details: {
		  display: 'flex',
		  flexDirection: 'column',
		},
		name: {
			fontSize: '1rem'
		},
		content: {
		  flex: '1 0 auto',
		},
		cover: {
		  width: 151,
		},
		controls: {
		  display: 'flex',
		  alignItems: 'center',
		  paddingLeft: theme.spacing(1),
		  paddingBottom: theme.spacing(1),
		},
		playIcon: {
		  height: 38,
		  width: 38,
		},
	  }));

	const classes = useStyles();
	const theme = useTheme();

	if (!photo) {
		photo = {
			thumbnailUrl:
				'https://lh3.googleusercontent.com/proxy/Qb_s8zih0WTwmIOxPXdNErE5dA0r5rZ8ILFCWTOf0eSQQL4rNZZJsnsT6wJdiZ1o8Kf2lMO6O5KSTNiLxcp-Gwz9M5iY8_XNNf3x5KU',
			sourceUrl:
				'https://lh3.googleusercontent.com/proxy/Qb_s8zih0WTwmIOxPXdNErE5dA0r5rZ8ILFCWTOf0eSQQL4rNZZJsnsT6wJdiZ1o8Kf2lMO6O5KSTNiLxcp-Gwz9M5iY8_XNNf3x5KU'
		};
	}
	return (
		<Card className={classes.root}>
					<CardMedia
		  className={classes.cover}
		  image={photo.thumbnailUrl}
		  title={item.name}
		/>
		  <CardContent className={classes.content}>
			<Typography component="div" variant="h6">
				{writer.username}
			</Typography>
			<Typography variant="subtitle2" color="textSecondary">
			  {contents}
			</Typography>
		  </CardContent>

	  </Card>
		// <div className="menu">
		// 	<div className="menu_column">
		// 		<ReviewImage image={photoUri} />
		// 	</div>

		// 	<div style={{ padding: '0px 20px' }}>
		// 		<h1>
		// 			{/* {// 데이터가 없다면 'Loading'을 띄우고, 있으면 menu list가 보이도록 한다.
		// 			user === null ? renderUser() : user} */}
		// 			{writer.username}
		// 		</h1>
		// 		<div className="menu_description">
		// 			<LinesEllipsis text={contents} maxLine="3" ellipsis="..." trimRight basedOn="letters" />
		// 		</div>
		// 		<div className="menu_star">평점: {stars}</div>
		// 	</div>
		// </div>
	);
}

function ReviewImage({ photoUri }) {
	// return <img src={photoUri} alt="음식 이미지" className="foodImage" />;
	return (
		<img
			src="https://search.pstatic.net/common/?autoRotate=true&quality=95&type=w750&src=http%3A%2F%2Fldb.phinf.naver.net%2F20200416_191%2F1587005465013afNYI_JPEG%2F%25BE%25F7%25C3%25BC%25C0%25DA%25C3%25BC_20200416_327581_%25B7%25B9%25B5%25E5175-%25B4%25EB%25C4%25A1%25BF%25AA%25C1%25A1_175%25B6%25B1%25BA%25BA%25C0%25CC_1080x640.jpg"
			alt="음식 이미지"
			className="menuImage"
			style={{ maxWidth: '100%' }}
		/>
	);
}

ReviewList.propTypes = {
	writerId: PropTypes.string.isRequired,
	orderId: PropTypes.string.isRequired,
	contents: PropTypes.string.isRequired,
	photo: PropTypes.object.isRequired,
	stars: PropTypes.number.isRequired,
	item: PropTypes.object.isRequired
};

export default ReviewList;
