import React from 'react';

class InfoMenu extends React.Component {
	state = {
		view : this.props.view,
		lat : 47.651105,
		lon : -122.347272,
		randomPhoto : ''
	}

	closeMenu = () => {
		this.props.closeMenu()
	}


	componentDidMount() {
		fetch(`https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=9d460bc4de83889dc4b1525544f85924&safe_search=safe&lat=${this.state.lat}&lon=${this.state.lon}&format=json&nojsoncallback=1`)
		.then(data => { return data.json() })
		.then(result => {
			let randomPhoto = Math.floor(Math.random() * result.photos.photo.length)

			let photo = `https://farm${result.photos.photo[randomPhoto].farm}.staticflickr.com/${result.photos.photo[randomPhoto].server}/${result.photos.photo[randomPhoto].id}_${result.photos.photo[randomPhoto].secret}_m.jpg`

			this.setState({ randomPhoto : photo })
		})
	}

	tabClick = (e) => {
	  if(e.target.classList.contains('tabs')){
	    document.querySelectorAll('.selected').forEach( item => item.classList.remove('selected'));
	    e.target.classList.add('selected');

	    const clickedTab =e.target.classList[1];
	    document.querySelectorAll('.tab-content').forEach( tab => {
	      if(tab.classList.contains(clickedTab)){
	        tab.classList.add('selected');
	      }
	  	})
	  }
	}

	render(){
		console.log(this.props.item)
		return(
			<div>
				<div id="info-menu-close"
					onClick={this.closeMenu}
				>X</div>

				<div id="info-menu">
				  <div id="tab-contain"
				  	onClick={this.tabClick}>
				    <div className="tabs tab1 selected">
				    Basic Info </div>
				    <div className="tabs tab2">Tab 2</div>
				    <div className="tabs tab3">Tab 3</div>
				  </div>


				  <div className="tab-content tab1 selected">
  				    	<p>{this.props.item.map(item => { return item.name })[0]}</p>
				    	<img src={this.state.randomPhoto} />
				  </div>
				  <div className="tab-content tab2">Here is Tab 2's content.</div>
				  <div className="tab-content tab3">And also Tab 3's content is right here.</div>
				</div>

			</div>
		)
	}
}

export default InfoMenu