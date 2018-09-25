import React from 'react';

class InfoMenu extends React.Component {
	state = {
		venue : [],
		photos : [],
		item : this.props.item,
		tab1Open : true,
		tab2Open : false,
		tab3Open : false
	}

	closeMenu = () => {
		this.props.closeMenu()
	}

	foursquare = () => {
		if(this.state.tab2Open){
			fetch(`https://api.foursquare.com/v2/venues/explore?client_id=E0NLFW2WJVS4YWLKUM0Q5OKOK4SURQ3NLQ45GO1KUUFJZSPE&client_secret=UF0RQFBSCHWZVXFCRETXNSR3J1QA5Y45WKAOV14OWIOYPISS&v=20180323&limit=1&ll=${this.props.item[0].lat},${this.props.item[0].lng}&query=restaurant`)
	    .then(res => {
			return res.json()
	    })
	    .then(data => {
	    	let result = data.response.groups[0].items[0].venue

	    	this.setState({ venue : result })
	    })
	    .catch(err => {
	       	this.setState({ venue : ['Information not available', err]})
	    	})
		  }
	}

	flickr = () => {
		if(this.state.tab3Open){

			let photoUrls = []

			let query = this.props.item[0].name.split(' ').join('+') + '+Seattle'

			console.log(`https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=8a74466d6bf0048cd3fe7d87b9e49dc0&text=${query}&format=json&nojsoncallback=1`)

			fetch(`https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=8a74466d6bf0048cd3fe7d87b9e49dc0&text=${query}&format=json&nojsoncallback=1`)
			.then( res => { return res.json() })
			.then( data => {

				let photoData= [];

				if(data.photos.photo.length >= 3){
					let randomPhotos =[];

					for(let i = 0; i < 3; i++ ){
						let random = Math.floor(Math.random()*data.photos.photo.length)

						randomPhotos.push(random)
					}
					for(let i = 0; i < randomPhotos.length; i++){
						photoData.push(data.photos.photo[randomPhotos[i]])
					}
				}
				else {
					photoData = data.photos.photo

				}
					console.log(photoData)


				for(let j = 0; j < photoData.length; j++){

					let url = `https://farm${photoData[j].farm}.staticflickr.com/${photoData[j].server}/${photoData[j].id}_${photoData[j].secret}_q.jpg`

					photoUrls.push(url)
					console.log(url)

				}

				this.setState({ photos : photoUrls })
				console.log(photoUrls)
			})
		}
	}


	componentWillReceiveProps(){
		console.log('props rec')
		this.setState({ venue : [] }, ()=> {
			this.foursquare()
		})

		this.setState({ photos : [] }, () => {
			this.flickr()
		})


	}

	tabClick = (e) => {

	  if(e.target.classList.contains('tabs')){

	  	this.setState({
	  		tab1Open : false,
	  		tab2Open : false,
	  		tab3Open : false,
	  	})

	    document.querySelectorAll('.selected').forEach( item => item.classList.remove('selected'));
	    e.target.classList.add('selected');

	    const clickedTab =e.target.classList[1];
	    document.querySelectorAll('.tab-content').forEach( tab => {
	      if(tab.classList.contains(clickedTab)){
	        tab.classList.add('selected');
	      }
	  	})

	    if(clickedTab === 'tab1'){
	  		this.setState({ tab1Open : true })
	    }
	    else if(clickedTab === 'tab2'){
	  		this.setState({ tab2Open : true }, () => {
	  			this.foursquare()
			})
	    }
	    else{
	  		this.setState({ tab3Open : true }, () => {
	  			this.flickr()
			})
	    }
	  }

	}

	render(){
		return(
			<div>
				<div id="info-menu-close"
					onClick={this.closeMenu}
				>X</div>

				<div id="info-menu">
				  <div id="tab-contain"
				  	onClick={this.tabClick}>
				    <div className="tabs tab1 selected">
				    	<span role="img" aria-label="information about location">🛈</span>
				    </div>
				    <div className="tabs tab2">
				    	<span role="img" aria-label="recommended food near location">🍽</span>
				    </div>
				    <div className="tabs tab3">
				    	<span role="img" aria-label="photos from location">📷</span>
				    	</div>
				  </div>


				  <div className="tab-content tab1 selected">
  				    	<h1>{this.props.item.map(item => { return item.name })[0]}</h1>
  				    	<p>Latitude: {this.props.item.map(item => { return item.lat })[0]}, Longitude: {this.props.item.map(item => { return item.lng })[0]}</p>
				  </div>

				  <div className="tab-content tab2">
				  	<p>Recommended food/drink in this area from FourSquare: </p><br />
				  	<p>{this.state.venue.name}</p>
				  	{this.state.venue.location && this.state.venue.location.formattedAddress.map( (line, index) =>
				  		<p key={index}>{line}</p>
				  		)}
				  </div>
				  <div className="tab-content tab3">
				  	<div id={'infomenu-photo-contain'}>
					  	{this.state.photos.length > 0 && this.state.photos.map( (photo, index) =>
					  		<img key={index} src={photo} alt={this.props.item.name} />
					  	)}
				  	</div>
				  </div>
				</div>

			</div>
		)
	}
}

export default InfoMenu