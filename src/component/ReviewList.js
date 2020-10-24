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
import { yellow } from '@material-ui/core/colors';
import StarIcon from '@material-ui/icons/Star';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import useMediaQuery from '@material-ui/core/useMediaQuery';

function ReviewList({ writer, orderId, contents, stars, photo, item }) {
	const history = useHistory();
	const [open, setOpen] = React.useState(false);

	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	const review = (id) => {
		console.log(id);
		let path = '/item/' + id;
		history.push(path);
	};

	const useStyles = makeStyles((theme) => ({
		root: {
			width: '90%',
			maxWidth: '300px',
			minHeight: '200px',
			marginBottom: '2rem',
			marginRight: '20px',
			display: 'inline-block',
			margin: '5px',
		},
		details: {
			display: 'inline',
		},
		name: {
			fontSize: '1rem'
		},
		content: {
			flex: '1 0 auto',
		},
		cover: {
			height: 0,	
			paddingTop: '75%', // 4:3
			cursor: 'pointer',
		},
		source: {
			width: '100%',
		},
		controls: {
		display: 'flex',
		alignItems: 'center',
		paddingLeft: theme.spacing(1),
		paddingBottom: theme.spacing(1),
		},
	}));

	const classes = useStyles();

	if (!photo) {
		photo = {
			thumbnailUrl:
				'https://github.com/Yaneodoo/Bistroad_Web/blob/master/src/image/no-camera.png?raw=true',
			sourceUrl:
				'https://github.com/Yaneodoo/Bistroad_Web/blob/master/src/image/no-camera.png?raw=true'
		};
	}
	return (
		<div>
			<Card className={classes.root}>
				<CardMedia
					className={classes.cover}
					image={photo.thumbnailUrl}
					title={item.name}
					onClick={handleClickOpen}
				/>
				<CardContent className={classes.content}>
					<div style={{display: 'inline-block', float: 'right'}}>
						<StarIcon style={{ color: yellow[500], fontSize: '1rem' }} />
						<div style={{ display: 'inline', fontSize: '1rem' }}>{stars}</div>
					</div>
					<Typography component="div" className={classes.name}>
						{writer.username}
					</Typography>
					<Typography variant="subtitle2" color="textSecondary">
					{contents}
					</Typography>
				</CardContent>
			</Card>

			<Dialog
				open={open}
				onClose={handleClose}
				aria-labelledby="max-width-dialog-title"
			>
			<img src={photo.sourceUrl} className={classes.source}/>
			{/* <CardMedia
				className={classes.cover}
				image={photo.sourceUrl}
				title={item.name}
			/> */}
			<DialogActions>
			<Button onClick={handleClose} color="primary">
				Close
			</Button>
			</DialogActions>
			</Dialog>
		</div>
		);
	}

	function ReviewImage({photo}) {
	// return <img src={photoUri} alt="음식 이미지" className="foodImage" />;
	return (
		<img
			src={photo}
			alt="음식 이미지"
			className="menuImage"
			style={{ maxWidth: '100%' }}
		/>
	);
}


ReviewList.propTypes = {
	writer: PropTypes.object.isRequired,
	orderId: PropTypes.string.isRequired,
	contents: PropTypes.string.isRequired,
	photo: PropTypes.object.isRequired,
	stars: PropTypes.number.isRequired,
	item: PropTypes.object.isRequired
};

export default ReviewList;
