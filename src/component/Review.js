import React, { Component } from 'react';
import Api from '../Api';
import StoreInfo from './StoreInfo';
import ReviewList from './ReviewList';

class Review extends Component {
	state = {};

	componentDidMount() {
		this._getReviewList();
		this._getStoreInfo();
		this._getItem();
		window.scrollTo(0, 0)
	}

	_renderItem = () => {
		const info = this.state.itemInfo;
		console.log(info);
		return (
			<div style={{display: 'inline-block', fontFamily: '맑은 고딕 sans-serif', lineHeight: '1.6'}}>
				<div style={{fontSize: '1.5rem', fontWeight: 'bold', color: '#33261D'}}>{info.name}</div>
				<div style={{fontsize: '0.6rem', color: '#33261D'}}>{info.description}</div>
			</div>)
	}

	_getItem = async () => {
		 // https://api.bistroad.kr/v1/stores/f23b8952-172d-4454-b332-4bd37b6c80de/items/7082132a-f0e6-4e66-8c1d-7c03f3d8c881
		 const itemInfo = await this._callItemApi(); // _callApi 함수가 끝날 때까지 기다림
		 this.setState({
			itemInfo
		 });
	}

	_callItemApi() {
		const { params } = this.props.match;

		return Api.get('/stores/' + params.storeId + '/items/' + params.itemId).then((resp) => resp.data).catch((err) => console.log(err));
	}

	_renderReview = () => {
		const reviews = this.state.reviews.map((review, index) => {
			console.log(review);
			return (
				<ReviewList
					timestamp={review.timestamp}
					writer={review.writer}
					contents={review.contents}
					stars={review.stars}
					key={review.orderId}
					photo={review.photo}
					item={review.item}
				/> //key prop으로 index 작성
			);
		});
		return reviews;
	};

	_getReviewList = async () => {
		const reviews = await this._callApi(); // _callApi 함수가 끝날 때까지 기다림
		this.setState({
			reviews
		});
	};

	_callApi = () => {
		const { params } = this.props.match;

		return Api.get('/reviews?itemId=' + params.itemId).then((resp) => resp.data).catch((err) => console.log(err));
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
		console.log('params: ' + { params });
		console.log('storeInfo: ' + params.storeId);

		return Api.get('/stores/' + params.storeId).then((resp) => resp.data).catch((err) => console.log(err));
	};

	render() {
		const { reviews, storeInfo, itemInfo } = this.state;
		const { params } = this.props.match;
		const {history} = this.props;

		const store = () => {
			let path = '/store/' + params.storeId;
			history.push(path);
		};
		return (
			<div style={{ minHeight: '800px', margin: '0 20px' }}>
				<div onClick={() =>{ store();}} style={{cursor:'pointer'}}>{storeInfo ? this._renderStore() : 'Loading Store'}</div>
				<hr width="100%" margin="0 1rem" />
				<div style={{margin: '0.5rem 1rem'}}>
					<div style={{ marginBottom: '5px' }}>{itemInfo ? this._renderItem() : 'Loading Item'}</div>
					<div>
						{// 데이터가 없다면 'Loading'을 띄우고, 있으면 menu list가 보이도록 한다.
						reviews ? this._renderReview() : 'Loading'}
					</div>
				</div>
			</div>
		);
	}
}

export default Review;
