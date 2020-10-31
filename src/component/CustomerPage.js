import React, { Component } from 'react';
import {ProfileStoreCard} from './Card';
import Order from './Order';
import Api from '../Api';

class Customer extends Component {
	state = {};

	componentDidMount() {
		this._getStoreInfo();
		window.scrollTo(0, 0)
	}

	_renderOrder = () => {
		const info = this.state.orderInfo.map((item, index) => {
			return (
				<Order
				info={item}
				key={item.id}
				// id={info.id}
				// store={info.store}
				// userId={info.userId}
				// item={info.item}
				// timestamp={info.timestamp}
				// hasReview={info.hasReview}
				// orderLines={info.orderLines}
			/> //key prop으로 index 작성
			);
		});
		return info;
	};

	_getStoreInfo = async () => {
		const orderInfo = await this._callOrderApi();
		this.setState({
			orderInfo
		});
	};

	_callOrderApi = () => {
		const { id } = this.props;
		console.log(id);
		return Api.get('/orders?sort=timestamp,asc&userId=' + id).then((resp) => resp.data).catch((err) => console.log(err));
	};

	render() {
        const { orderInfo } = this.state;
		return (
			<div style={{margin: 'auto', alignContent: 'center', alignItems: 'center'}}>
				{// 데이터가 없다면 'Loading'을 띄우고, 있으면 menu list가 보이도록 한다.
					orderInfo ? this._renderOrder() : 'Loading'
				}
			</div>
		);
	}
}

export default Customer;

// class Owner extends Component {
// 	state = {};

// 	render() {
// 		const { store } = this.props;
// 		console.log(store);

// 		const stores = store.map((info) => <ProfileStoreCard style={{margin: 'auto'}} info={info} key={info.id} />);
// 		return <div style={{margin: 'auto', textAlign: 'center'}}>{stores}</div>;
// 	}
// }

// export default Owner;
