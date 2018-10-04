import React from 'react';

const flickrIcon = require("./foursquare.png");
const foursquareIcon = require("./flickr.png");


class InfoMenu extends React.Component {
	state = {
		venue : [],
		photos : [],
		bigImage : '',
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

			if(document.querySelector('.fs-recommended').classList.contains('hidden')){
	       		document.querySelector('.fs-recommended').classList.remove('hidden')
			}

			if(document.querySelector('.foursquare-error').classList.contains('hidden') === false ){
	       		document.querySelector('.fs-recommended').classList.add('hidden')
			}

			fetch(`https://api.foursquare.com/v2/venues/explore?client_id=E0NLFW2WJVS4YWLKUM0Q5OKOK4SURQ3NLQ45GO1KUUFJZSPE&client_secret=UF0RQFBSCHWZVXFCRETXNSR3J1QA5Y45WKAOV14OWIOYPISS&v=20180323&limit=1&ll=${this.props.item[0].lat},${this.props.item[0].lng}&query=restaurant`)
	    .then(res => {
			return res.json()
	    })
	    .then(data => {
	    	let result = data.response.groups[0].items[0].venue

	    	this.setState({ venue : result })
	    })
	    .catch(err => {
	       	document.querySelector('.foursquare-error').classList.remove('hidden')
	       	document.querySelector('.fs-recommended').classList.add('hidden')
	    	})
		  }
	}

	flickr = () => {
		if(this.state.tab3Open){
			if(document.querySelector('.flickr-error').classList.contains('hidden')){
				document.querySelector('.flickr-error').classList.add('hidden')
			}

			let photoUrls = []

			let query = this.props.item[0].name.split(' ').join('+') + '+Seattle'

			fetch(`https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=8d81df9693b4d5d9b014f53ef182a2e1&text=${query}&format=json&nojsoncallback=1`)
			.then( res => { return res.json() })
			.then( data => {
				console.log(data)
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


				for(let j = 0; j < photoData.length; j++){

					let url = `https://farm${photoData[j].farm}.staticflickr.com/${photoData[j].server}/${photoData[j].id}_${photoData[j].secret}_q.jpg`

					photoUrls.push(url)

				}

				this.setState({ photos : photoUrls })
			})
			.catch(err => document.querySelector('.flickr-error').classList.remove('hidden'))
		}
	}

	openPhotoOverlay = (e) => {
		document.querySelector('.photo-overlay').classList.remove('hidden')

		let image = e.target.src.slice(0, -5) + 'c.jpg'

		this.setState({ bigImage : image })

	}

	closePhotoOverlay =() => {
		document.querySelector('.photo-overlay').classList.add('hidden')
	}

	componentWillReceiveProps(){
		this.setState({ venue : [] }, ()=> {
			this.foursquare()
		})

		this.setState({ photos : [] }, () => {
			this.flickr()
		})


	}

	tabClick = (e) => {
	  if(e.target.classList.contains('tabs') || e.target.classList.contains('emoji')){
	  	this.setState({
	  		tab1Open : false,
	  		tab2Open : false,
	  		tab3Open : false,
	  	})

	  	let targetTab;

	  	if(e.target.classList.contains('tabs')){
	  		targetTab = e.target
	  	}
	  	else(
	  		targetTab = e.target.parentElement
	  	)


	    document.querySelectorAll('.selected').forEach( item => item.classList.remove('selected'));
	    	targetTab.classList.add('selected');

	    document.querySelectorAll('.sm-icons').forEach( item => item.classList.add('hidden'))

	    const clickedTab = targetTab.classList[1];
	    document.querySelectorAll('.tab-content').forEach( tab => {
	      if(tab.classList.contains(clickedTab)){
	        tab.classList.add('selected');
	      }
	  	})

	    if(clickedTab === 'tab1'){
	  		this.setState({ tab1Open : true })
	    }
	    else if(clickedTab === 'tab2'){
	    	document.querySelector('.flIcon').classList.remove('hidden')
	  		this.setState({ tab2Open : true }, () => {
	  			this.foursquare()
			})
	    }
	    else{
	  		this.setState({ tab3Open : true }, () => {
	  			document.querySelector('.fsIcon').classList.remove('hidden')
	  			this.flickr()
			})
	    }
	  }

	}

	render(){
		return(
			<div role="menu"
				    	aria-label="info menu"
>
				<div id="info-menu-close"
					onClick={this.closeMenu}
				>X</div>

				<div id="info-menu">
				  <div id="tab-contain"
				  	onClick={this.tabClick}>
				    <div className="tabs tab1 selected">
				    	<span className="emoji"
				    		role="img"
				    		aria-label="information about location"
				    		tabIndex={0}
				    	>🛈</span>
				    </div>
				    <div className="tabs tab2">
				    	<span className="emoji"
				    		role="img"
				    		aria-label="recommended food near location"
							tabIndex={0}
				    	>🍽</span>
				    </div>
				    <div className="tabs tab3">
				    	<span className="emoji"
				    		role="img"
				    		aria-label="photos from location"
							tabIndex={0}
				    		>📷</span>
				    	</div>
				  </div>

				  <div className="icon-contain">
				  	<img className="sm-icons flIcon hidden" src={ flickrIcon } alt="flickr icon" />
				  	<img className="sm-icons fsIcon hidden" src={ foursquareIcon } alt="foursquare icon" />
				  </div>

				  <div className="tab-content tab1 selected"
				  		role="contentinfo"
				    	aria-label="information about location"
				  >
  				    	<h2>{this.props.item.map(item => { return item.name })[0]}</h2>
  				    	<p>Latitude: {this.props.item.map(item => { return item.lat })[0]}, Longitude: {this.props.item.map(item => { return item.lng })[0]}</p>
				  </div>

				  <div className="tab-content tab2"
				  		role="contentinfo"
				    	aria-label="food near location"
				  	>
				  	<p className="foursquare-error hidden">Information not available from FourSquare</p>
				  	<p className="fs-recommended">Recommended food/drink in this area:</p>
				  	<p id="recommended-name">{this.state.venue.name}</p>
				  	{this.state.venue.location && this.state.venue.location.formattedAddress.slice(0, -1).map( (line, index) =>
				  		<p key={index}>{line}</p>
				  		)}
				  </div>
				  <div className="tab-content tab3"
				  		role="contentinfo"
				    	aria-label="photos from location"
				  >
				  	<div className="flickr-error hidden">Unable to load images from Flickr</div>
				  	<div id={'infomenu-photo-contain'}>
					  	{this.state.photos.length > 0 && this.state.photos.map( (photo, index) =>
					  		<img key={index} src={photo} alt={this.props.item.name} onClick={this.openPhotoOverlay}
					  			tabIndex={0}
					  		/>

					  	)}
				  	</div>
				  </div>
				</div>

				<div className="photo-overlay hidden" onClick={ this.closePhotoOverlay }>
					<div className="photo-overlay-image-contain" onClick={ this.closePhotoOverlay } >
						<div className="photo-overlay-close" onClick={ this.closePhotoOverlay } >X</div>
						<img className="big-photo" src={this.state.bigImage} alt="large version in overlay" onClick={ this.closePhotoOverlay } />
					</div>
				</div>

			</div>
		)
	}
}

export default InfoMenu