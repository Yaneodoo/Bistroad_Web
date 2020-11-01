import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { useHistory } from 'react-router-dom';
import LinesEllipsis from 'react-lines-ellipsis';

const useStyles = makeStyles((theme) => ({
	root: {
		maxWidth: '300px',
		minHeight: '200px',
		marginBottom: '2rem',
		marginRight: '10px',
		marginLeft: '10px',
		display: 'inline-block',
		margin: '5px',
		width: '40%',
		cursor: 'pointer',
		margin: 'auto',
		textAlign: 'left',
		padding: '0',
	},
	name: {
		fontSize: '1.3rem',
		textOverflow: 'ellipsis',
		padding: '3px 3px 3px 5px',
		fontWeight: '600',
	},
	phone: {
		fontSize: '1rem',
		padding: '3px 5px',
	},
	media: {
		height: 0,
		paddingTop: '75%' // 16:9 -> 4:3
	},
}));

export function ProfileStoreCard({ info }) {
	const history = useHistory();
	const classes = useStyles();
	const storeId = info.id;
	const store = () => {
		let path = '/store/' + storeId + '/' + info.ownerId;
		history.push(path);
	};

	if (!info.photo) {
		info.photo = {
			thumbnailUrl:
				'https://github.com/Yaneodoo/Bistroad_Web/blob/master/src/image/no-camera.png?raw=true',
			sourceUrl:
				'https://github.com/Yaneodoo/Bistroad_Web/blob/master/src/image/no-camera.png?raw=true'
		};
	}

	return (
		<Card
			className={classes.root}
			onClick={() => {
				store();
			}}
		>
			<CardContent className={classes.name}>
				<LinesEllipsis text={info.name} maxLine="1" ellipsis="..." trimRight basedOn="letters" className={classes.name}/>
			</CardContent>
			<CardContent className={classes.phone}>
				<LinesEllipsis text={info.phone} maxLine="1" ellipsis="..." trimRight basedOn="letters" className={classes.phone}/>
			</CardContent>
			<CardMedia className={classes.media} image={info.photo.thumbnailUrl} title={info.name} />
			<CardContent>
				<Typography variant="body2" color="textSecondary" component="div">
					<LinesEllipsis text={info.description} maxLine="1" ellipsis="..." trimRight basedOn="letters" />
				</Typography>
			</CardContent>
		</Card>
	);
}

export function RecipeReviewCard({ info }) {
	const history = useHistory();
	const classes = useStyles();
	const storeId = info.id;
	const store = () => { // home에서 누를 경우 storeId만 params로 넣어 push
		let path = '/store/' + storeId;
		history.push(path);
	};

	if (!info.photo) {
		info.photo = {
			thumbnailUrl:
				'https://github.com/Yaneodoo/Bistroad_Web/blob/master/src/image/no-camera.png?raw=true',
			sourceUrl:
				'https://github.com/Yaneodoo/Bistroad_Web/blob/master/src/image/no-camera.png?raw=true'		};
	}

	return (
		<Card
			className={classes.root}
			onClick={() => {
				store();
			}}
		>
			<CardHeader classes={{ title: classes.name, subheader: classes.phone }} title={info.name} subheader={info.phone} />
			<CardMedia className={classes.media} image={info.photo.thumbnailUrl} title={info.name} />
			<CardContent>
				<Typography variant="body2" color="textSecondary" component="div">
					{info.description}
				</Typography>
			</CardContent>
		</Card>
	);
}
