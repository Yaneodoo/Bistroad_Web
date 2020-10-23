import React, {Component} from 'react';
import Api from '../Api';
import { MenuList } from './StoreList';
import Card from './Card';

import classNames from 'classnames/bind';
import styles from './Home.scss';
import InHeader from './InHeader';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';

const cx = classNames.bind(styles);

class Home extends Component {
	state = {};
	
	componentDidMount () {
		this.geoLocation();
	}

	callApi = (position) => {
		console.log(position)
		return Api.get('/stores/nearby?originLat=37.6199425&originLng=127.0608163&radius=1000')
			.then((resp)=>resp.data)
			.catch((err) => console.log(err));
	}

	getNearStores = async(position) => {
		console.log("Latitude is :", position.coords.latitude);
		console.log("Longitude is :", position.coords.longitude);
		// this.setState({location: position})
		// const {stores} = await Api.get('/stores/nearby?originLat='+position.coords.latitude+'&originLng='+position.coords.longitude+'&radius=1');
		const stores = await this.callApi(position.coords);
		console.log('stores '+stores);
		this.setState({
			stores
		});
	};

	renderStores = () => {
		const stores = this.state.stores.map((store, index) => {
			console.log(store);
			return (
				<Card info={store} key={index}	/> //key prop으로 index 작성
			);
		});
		return stores;
	}

	geoLocation = async() => {
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(this.getNearStores);
		}
		else {
			alert("Can't find you.");
		}
	}

	render() {
		const {stores} = this.state;
		console.log(stores)
		return (
			<div>
				<InHeader />
				<Typography component="div" align="center" style={{ minHeight: '600px' }}>
					<div className={cx('home')}>
						Bistroad는<br />작은 가게라는 뜻의 'Bistro'와<br />길이라는 뜻의'Road'의 합성어입니다.
					</div>
					<div>
						<div style={{marginBottom: '20px'}}>가까운 매장</div>
						<div>
							{stores ? this.renderStores() : 'Loading'}
						</div>
					</div>
		
				</Typography>
			</div>
		);
	}
}
// const Home = () => (
// 	<div>
// 		<InHeader />
// 		<Typography component="div" align="center" style={{ minHeight: '600px' }}>
// 			<div className={cx('home')}>
// 				Bistroad는<br />작은 가게라는 뜻의 'Bistro'와<br />길이라는 뜻의'Road'의 합성어입니다.
// 			</div>
// 		</Typography>
// 	</div>
// );

export default Home;
