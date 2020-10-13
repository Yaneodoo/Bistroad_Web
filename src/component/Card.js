import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import { Link, useHistory } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
	root: {
		maxWidth: '300px',
		minHeight: '200px',
		marginBottom: '2rem',
		marginRight: '20px',
		display: 'inline-block',
		margin: '5px',
		width: '40%',
		cursor: 'pointer'
	},
	name: {
		fontSize: '1rem'
	},
	media: {
		height: 0,
		paddingTop: '56.25%' // 16:9
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

export default function RecipeReviewCard({ info }) {
	const history = useHistory();
	const classes = useStyles();
	const [ expanded ] = React.useState(false);
	const storeId = info.id;
	const store = () => {
		let path = '/store/' + storeId + '/' + info.ownerId;
		history.push(path);
	};

	if (!info.photo) {
		info.photo = {
			thumbnailUrl:
				'https://lh3.googleusercontent.com/proxy/Qb_s8zih0WTwmIOxPXdNErE5dA0r5rZ8ILFCWTOf0eSQQL4rNZZJsnsT6wJdiZ1o8Kf2lMO6O5KSTNiLxcp-Gwz9M5iY8_XNNf3x5KU',
			sourceUrl:
				'https://lh3.googleusercontent.com/proxy/Qb_s8zih0WTwmIOxPXdNErE5dA0r5rZ8ILFCWTOf0eSQQL4rNZZJsnsT6wJdiZ1o8Kf2lMO6O5KSTNiLxcp-Gwz9M5iY8_XNNf3x5KU'
		};
	}

	return (
		<Card
			className={classes.root}
			onClick={() => {
				store();
			}}
		>
			<CardHeader classes={{ title: classes.name }} title={info.name} subheader={info.phone} />
			<CardMedia className={classes.media} image={info.photo.thumbnailUrl} title={info.name} />
			<CardContent>
				<Typography variant="body2" color="textSecondary" component="p">
					{info.description}
				</Typography>
			</CardContent>
		</Card>
	);
}