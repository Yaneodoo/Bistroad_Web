import React, { Component } from 'react';
import PropTypes from 'prop-types';
import '../styles/Store.css';
import LinesEllipsis from 'react-lines-ellipsis';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { red, yellow } from '@material-ui/core/colors';
import { Link, useHistory } from 'react-router-dom';
import StarIcon from '@material-ui/icons/Star';

const useStyles = makeStyles((theme) => ({
	root: {
		// maxWidth: '25%',
		minHeight: '200px',
		margin: '1rem 0.5rem',
		display: 'inline-block',
		width: '40%',
		cursor: 'pointer'
	},
	name: {
		fontSize: '1rem',
		fontWeight: '800'
	},
	media: {
		height: 0,
		paddingTop: '75%' // 4:3
	},
	expand: {
		transform: 'rotate(0deg)',
		marginLeft: 'auto',
		transition: theme.transitions.create('transform', {
			duration: theme.transitions.duration.shortest
		})
	},
	expandOpen: {
		transform: 'rotate(180deg)'
	},
	avatar: {
		backgroundColor: red[500]
	}
}));

export function StoreList({ info }) {
	return (
		<div className="store">
			<div className="menu_column">
				<MenuImage />
			</div>

			<div className="menu_column">
				<h1>{info.name}</h1>
				<div className="menu_description">
					{/* <LinesEllipsis text={description} maxLine="3" ellipsis="..." trimRight basedOn="letters" /> */}
					{info.description}
				</div>
				<div className="menu_price">{info.phone}</div>
				<div className="menu_star">
					{info.location.lat} {info.location.lng}
				</div>
			</div>
		</div>
	);
}

export function MenuList({ id, storeId, name, description, price, photo, stars }) {
	const history = useHistory();
	const classes = useStyles();
	const [ expanded ] = React.useState(false);
	const review = (storeId, id) => {
		console.log(id);
		let path = '/item/' + storeId + '/' + id;
		history.push(path);
	};
	if (!photo) {
		photo = {
			thumbnailUrl:
				'https://github.com/Yaneodoo/Bistroad_Web/blob/master/src/image/no-camera.png?raw=true',
			sourceUrl:
				'https://github.com/Yaneodoo/Bistroad_Web/blob/master/src/image/no-camera.png?raw=true'		};
	}
	return (
		<Card className={classes.root} onClick={() => review(storeId, id)}>
			{/* <CardHeader classes={{ title: classes.name }} title={name} subheader={price} /> */}
			<CardContent classes={{ title: classes.name }}>
				<LinesEllipsis text={name} maxLine="1" ellipsis="..." trimRight basedOn="letters" className={classes.name}/>
				<div>{price}</div>
			</CardContent>
			<CardMedia className={classes.media} image={photo.thumbnailUrl} title={name} />
			<CardContent>
				<Typography variant="body2" color="textSecondary" component="div">
					<LinesEllipsis text={description} maxLine="1" ellipsis="..." trimRight basedOn="letters" />
				</Typography>
				<div>
					<StarIcon style={{ color: yellow[500], fontSize: '1rem' }} />
					<div style={{ display: 'inline', fontSize: '1rem' }}>{stars}</div>
				</div>
			</CardContent>
		</Card>
		// <div className="menu" onClick={() => review(storeId, id)}>
		// 	<div className="menu_column">
		// 		<MenuImage />
		// 		<h1>{name}</h1>
		// 	</div>

		// 	<div className="menu_column">
		// 		<div className="menu_description">
		// 			{/* <LinesEllipsis text={description} maxLine="3" ellipsis="..." trimRight basedOn="letters" /> */}
		// 			{description}
		// 		</div>
		// 		<div className="menu_price">{price}</div>
		// 		<div className="menu_star">{stars}</div>
		// 	</div>
		// </div>
	);
}

function MenuImage({ photoUri }) {
	// return <img src={photoUri} alt="음식 이미지" className="foodImage" />;
	return (
		<img
			src="https://search.pstatic.net/common/?autoRotate=true&quality=95&type=w750&src=http%3A%2F%2Fldb.phinf.naver.net%2F20200416_191%2F1587005465013afNYI_JPEG%2F%25BE%25F7%25C3%25BC%25C0%25DA%25C3%25BC_20200416_327581_%25B7%25B9%25B5%25E5175-%25B4%25EB%25C4%25A1%25BF%25AA%25C1%25A1_175%25B6%25B1%25BA%25BA%25C0%25CC_1080x640.jpg"
			alt="음식 이미지"
			className="menuImage"
		/>
	);
}

StoreList.propTypes = {
	info: PropTypes.object.isRequired
};

export default StoreList;
