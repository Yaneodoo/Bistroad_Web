import React, { Component } from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import ButtonBase from '@material-ui/core/ButtonBase';
import { hexToRgb } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import { StoreList, MenuList } from './StoreList';
import StoreInfo from './StoreInfo';
import Api from '../Api';
import InHeader from './InHeader';
import QRCode from 'qrcode';

class Store extends Component {
	static defaultProps = {
		user: null
	};
	state = {};

	componentDidMount() {
		this._getMenuList();
		this._getStoreInfo();
		this.generateQR();
	}

	_renderMenu = () => {
		const menu = this.state.menu.map((item, index) => {
			console.log(item);
			return (
				<MenuList
					name={item.name}
					storeId={item.storeId}
					id={item.id}
					description={item.description}
					price={item.price}
					photoUri={item.photoUri}
					stars={item.stars}
					key={item.id}
				/> //key prop으로 index 작성
			);
		});
		return menu;
	};

	_getMenuList = async () => {
		const menu = await this._callApi(); // _callApi 함수가 끝날 때까지 기다림
		this.setState({
			menu
		});
	};

	_callApi = () => {
		const { params } = this.props.match;

		return Api.get('/stores/' + params.storeId + '/items')
			.then((resp) => resp.data)
			.catch((err) => console.log(err));
	};

	_renderStore = () => {
		const info = this.state.storeInfo;

		return (
			<StoreInfo
				id={info.id}
				name={info.name}
				description={info.description}
				phone={info.phone}
				location={info.location}
			/> //key prop으로 index 작성
		);
	};

	_getStoreInfo = async () => {
		const storeInfo = await this._callStoreApi();
		this.setState({
			storeInfo
		});
	};

	_callStoreApi = () => {
		const { params } = this.props.match;
		console.log(params);
		return Api.get('/stores/' + params.storeId).then((resp) => resp.data).catch((err) => console.log(err));
	};

	useStyles = makeStyles((theme) => ({
		root: {
			flexGrow: 1
		},
		paper: {
			padding: theme.spacing(2),
			margin: 'auto',
			maxWidth: 500
		},
		image: {
			width: 128,
			height: 128
		},
		img: {
			margin: 'auto',
			display: 'block',
			maxWidth: '100%',
			maxHeight: '100%'
		}
	}));

	generateQR = () => {
		const { params } = this.props.match;
		console.log(params);

		if (params.ownerId) {
			let str = 'https://api.bistroad.kr/v1/stores/368056a5-bffb-4db7-bbb5-7bae9254b826';
			console.log(str);
			QRCode.toCanvas(document.getElementById('canvas'), str, function(error) {
				if (error) console.error(error);
				else console.log('success!');
			});
		}
	};

	render() {
		// const { id, storeId, name, storeName, description, price, photoUri, stars } = this.props.info;
		// const { params } = this.props.match;
		// Api.get('/stores/' + params.storeId + '/items').then(this.setState({ information: [ Response.data ] }));
		const { menu, storeInfo } = this.state;
		const { params } = this.props.match;

		if (!params.ownerId) {
			console.log('if' + params.ownerId);
		} else {
			console.log(params.ownerId);
		}
		return (
			<Typography
				component="div"
				// align="center"
				style={{
					display: 'flex',
					justifyContent: 'space-around',
					flexWrap: 'wrap',
					fontSize: '14px'
				}}
			>
				<InHeader />
				<div style={{ minHeight: '700px', margin: '0px 50px' }}>
					<div>
						<Paper>
							<Grid container spacing={2}>
								<Grid item xs={15} sm container>
									<Grid item xs container direction="column" spacing={2}>
										<Grid item xs>
											{storeInfo ? this._renderStore() : 'Loading Store'}
										</Grid>
									</Grid>
									<Grid item>
										<Typography variant="subtitle1">
											<canvas id="canvas" />
										</Typography>
									</Grid>
								</Grid>
							</Grid>
						</Paper>
					</div>
					<div style={{ textAlign: 'left', display: 'block', width: '100%' }}>메뉴 리스트</div>
					<div>
						{// 데이터가 없다면 'Loading'을 띄우고, 있으면 menu list가 보이도록 한다.
						menu ? this._renderMenu() : 'Loading'}
					</div>
				</div>
			</Typography>
		);
	}
}
export default Store;
