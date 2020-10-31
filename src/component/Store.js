import React, { Component } from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { hexToRgb } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import { MenuList } from './StoreList';
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
		window.scrollTo(0, 0)
	}

	_renderMenu = () => {
		const menu = this.state.menu.map((item, index) => {
			return (
				<MenuList
					name={item.name}
					storeId={item.storeId}
					id={item.id}
					description={item.description}
					price={item.price}
					photo={item.photo}
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
				address={info.address}
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
		console.log(params.storeId);
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

	// 캔버스에 이미지 추가하기
	addToCanvas(ctx, image, x, y) {
		var img = new Image();
		const width = 150;
		const height = 150;
		img.src = image;
		img.onload = function() {
			var scale = Math.max(width / img.width, height / img.height);
			// get the top left position of the image
			var x = width / 2 - img.width / 2 * scale;
			var y = height / 2 - img.height / 2 * scale;
			ctx.drawImage(img, x, y, img.width * scale, img.height * scale);
		};
		return image;
	}

	generateQR = () => {
		const { params } = this.props.match;

		if (params.ownerId) { // params 인자로 ownerId가 있을 경우 qr코드
			let str = 'https://yaneodoo.github.io/Bistroad_Web/store/' + params.storeId; // qr url 변경 필요
			console.log(str);
			QRCode.toCanvas(document.getElementById('canvas'), str, function(error) {
				if (error) console.error(error);
				else console.log('success!');
			});
		} else { // 없을 경우 매장 썸네일 출력
			const ctx = document.getElementById('canvas').getContext('2d');
			var imgClo = new Image();
			Api.get('/stores/' + params.storeId)
				.then((resp) => resp.data)
				.then((resp) => this.addToCanvas(ctx, resp.photo.thumbnailUrl, 0, 0))
				.then((resp) => console.log(resp))
				.catch((err) => console.log(err));
		}
	};

	render() {
		// const { id, storeId, name, storeName, description, price, photoUri, stars } = this.props.info;
		// const { params } = this.props.match;
		// Api.get('/stores/' + params.storeId + '/items').then(this.setState({ information: [ Response.data ] }));
		const { menu, storeInfo } = this.state;
		const { params } = this.props.match;

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
				<div style={{ minHeight: '900px', maxWidth: '1000px', minWidth: '80%', margin: '0px 25px' }}>
					<Paper style={{ margin: '5px 5px' }}>
						<Grid container spacing={2}>
							<Grid item xs={15} sm container>
								<Grid item xs container direction="column" spacing={2}>
									<div>{storeInfo ? this._renderStore() : 'Loading Store'}</div>
								</Grid>
								<Grid item>
									<canvas id="canvas" width={150} height={150} />
								</Grid>
							</Grid>
						</Grid>
					</Paper>
					<br />
					<h2
						style={{
							textAlign: 'left',
							display: 'block',
							width: '80%',
							marginRight: '24px',
							marginLeft: '24px'
						}}
					>
						메뉴 리스트
					</h2>
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
