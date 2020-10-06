import React, { Component } from 'react';

import QRCode from 'qrcode';
import StoreList from './StoreList';
import Card from './Card';

class Owner extends Component {
	state = {};

	// _getStoreList = async () => {
	// 	const stores = await this._callApi(); // _callApi 함수가 끝날 때까지 기다림
	// 	this.setState({
	// 		stores
	// 	});
	// };

	// _callApi = () => {
	// 	const { id } = this.props.id;

	// 	return Api.get('stores?ownerId=' + id).then((resp) => resp.data).catch((err) => console.log(err));
	// };

	// _renderStore = () => {
	//     const store = this.state.stores;
	// 	return (
	// 		<StoreInfo
	// 			id={info.id}
	// 			name={info.name}
	// 			description={info.description}
	// 			phone={info.phone}
	// 			location={info.location}
	// 		/> //key prop으로 index 작성
	// 	);
	// };

	render() {
		const { store } = this.props;
		console.log(store);

		const stores = store.map((info) => <Card info={info} key={info.id} />);
		return <div>{stores}</div>;
	}
}

export default Owner;
