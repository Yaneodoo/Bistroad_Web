import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';

const useStyles = makeStyles((theme) => ({
	root: {
		maxWidth: 345,
		marginBottom: '2rem',
		display: 'inline-block',
		margin: '2rem',
		width: '40%'
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
	const classes = useStyles();
	const [ expanded ] = React.useState(false);

	return (
		<Card className={classes.root}>
			<CardHeader title={info.name} subheader={info.phone} />
			<CardMedia
				className={classes.media}
				image="https://search.pstatic.net/common/?autoRotate=true&quality=95&type=w750&src=http%3A%2F%2Fldb.phinf.naver.net%2F20200416_191%2F1587005465013afNYI_JPEG%2F%25BE%25F7%25C3%25BC%25C0%25DA%25C3%25BC_20200416_327581_%25B7%25B9%25B5%25E5175-%25B4%25EB%25C4%25A1%25BF%25AA%25C1%25A1_175%25B6%25B1%25BA%25BA%25C0%25CC_1080x640.jpg"
				title="Paella dish"
			/>
			<CardContent>
				<Typography variant="body2" color="textSecondary" component="p">
					{info.description}
				</Typography>
			</CardContent>
		</Card>
	);
}
