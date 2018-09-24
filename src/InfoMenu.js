import React from 'react';

class InfoMenu extends React.Component {
	state = {
		venue : [],
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

    	console.log('foursquare rendered')

    })
    .catch(err => {
       	this.setState({ venue : ['Information not available', err]})
    })

	}
	}

	componentWillReceiveProps(){
		this.setState({ venue : [] })
		console.log('props rec')
		this.foursquare()
	}

	componentDidMount() {
		console.log('mounted')
	}

	tabClick = (e) => {
	  this.foursquare()

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
	  		console.log(this.state)


	    }
	    else{
	  		this.setState({ tab3Open : true })
	    }
	  }

	}

	render(){
		console.log(this.props)
		console.log(this.state)
			return(
			<div>
				<div id="info-menu-close"
					onClick={this.closeMenu}
				>X</div>

				<div id="info-menu">
				  <div id="tab-contain"
				  	onClick={this.tabClick}>
				    <div className="tabs tab1 selected">
				    🛈 </div>
				    <div className="tabs tab2">🍽</div>
				    <div className="tabs tab3">Tab 3</div>
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
				  <div className="tab-content tab3">And also Tab 3's content is right here.</div>
				</div>

			</div>
		)
	}
}

export default InfoMenu