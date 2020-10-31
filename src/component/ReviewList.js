import React, { useState, Component } from 'react';
import PropTypes from 'prop-types';
import '../styles/Store.css';
import LinesEllipsis from 'react-lines-ellipsis';
import { useHistory } from 'react-router-dom';
import Moment from 'react-moment';

import { makeStyles  } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { yellow } from '@material-ui/core/colors';
import StarIcon from '@material-ui/icons/Star';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';

function ReviewList({ writer, timestamp, contents, stars, photo, item }) {
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
			display: 'inline-block',
		},
		name: {
			width: '55%',
			fontSize: '1rem',
			display: 'inline-block',
			float: 'left',
		},
		info: {
			display: 'inline-block',
			width: '40%',
			float: 'left',
			fontSize: '0.8rem',
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
	const dateToFormat = new Date(timestamp);

	return (
		<div>
			<Card className={classes.root}>
				<CardMedia
					className={classes.cover}
					image={photo.thumbnailUrl}
					// title={item.name}
					onClick={handleClickOpen}
				/>
				<CardContent className={classes.content}>
					<div style={{display: 'flex'}}>
						<Typography component="div" className={classes.name}>
							{writer.username}
						</Typography>
						<Moment format="YYYY/MM/DD" className={classes.info}>
                			{dateToFormat}
           	 			</Moment>
						<div style={{ width: '15%', float: 'right', textAlign: 'right'}}>
							<StarIcon style={{ color: yellow[500], fontSize: '1rem' }} />
							<div style={{ display: 'inline', fontSize: '1rem' }}>{stars}</div>
						</div>
					</div>
					
					<Typography variant="subtitle2" color="textSecondary" className={classes.details}>
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

ReviewList.propTypes = {
	writer: PropTypes.object.isRequired,
	timestamp: PropTypes.string.isRequired,
	contents: PropTypes.string.isRequired,
	photo: PropTypes.object.isRequired,
	stars: PropTypes.number.isRequired,
	item: PropTypes.object.isRequired
};

export default ReviewList;
