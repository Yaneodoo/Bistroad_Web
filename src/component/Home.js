import React, {Component} from 'react';
import Api from '../Api';
import {RecipeReviewCard} from './Card';

import classNames from 'classnames/bind';
import styles from './Home.scss';
import InHeader from './InHeader';
import Typography from '@material-ui/core/Typography';

const cx = classNames.bind(styles);

class Home extends Component {
	state = {};
	
	componentDidMount () {
		this.geoLocation();
	}

	callApi = (position) => {
		console.log(position)
		return Api.get('/stores/nearby?originLat='+position.latitude+'&originLng='+position.longitude+'&radius=1000')
			.then((resp)=>resp.data)
			.catch((err) => console.log(err));
	}

	getNearStores = async(position) => {
		console.log("Latitude is :", position.coords.latitude);
		console.log("Longitude is :", position.coords.longitude);
		const stores = await this.callApi(position.coords);
		this.setState({
			stores
		});
	};

	renderStores = () => {
		const stores = this.state.stores.map((store, index) => {
			console.log(store);
			if(store) {
				return (
					<RecipeReviewCard info={store} key={index}	/> //key prop으로 index 작성
				);
			}
			else {
				return <div>가까운 매장이 없습니다.</div>;
			}
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
				<Typography component="div" align="center" style={{ minHeight: '650px' }}>
					<div className={cx('home')}>
						Bistroad는<br />작은 가게라는 뜻의 'Bistro'와<br />길이라는 뜻의'Road'의 합성어입니다.
					</div>
					<div>
						<div style={{marginBottom: '20px'}}>현재 가까운 매장</div>
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
