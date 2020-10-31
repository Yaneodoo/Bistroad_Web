import React, { Component } from 'react';

import {ProfileStoreCard} from './Card';

class Owner extends Component {
	state = {};

	render() {
		const { store } = this.props;
		console.log(store);

		const stores = store.map((info) => <ProfileStoreCard style={{margin: 'auto'}} info={info} key={info.id} />);
		return <div style={{margin: 'auto', textAlign: 'center'}}>{stores}</div>;
	}
}

export default Owner;
