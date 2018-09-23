import React from 'react';


class Sidebar extends React.Component {

	state = {
		markers : this.props.markers
	}

	handleSidebarClick = (e) => {
		console.log(this.props)
		let clickedMarker = this.props.markers[e.target.id-1]
		console.log(this.state.markers)
	}

	filterLocations = (e) => {
		e.preventDefault()

		if(e.target.value === 'all'){
			this.setState({ markers : this.props.markers })
			this.props.markerClick(this.props.markers)
		}
		else {
			let filtered = this.props.markers.filter( place => place.category === e.target.value )
			this.setState({ markers : filtered })
			this.props.markerClick(filtered)
		}
	}

  render() {
  	return(
  		<div>

	  		<div className='sidebar hidden'>

				  <select name="locations"
				  		onChange={this.filterLocations}
>
				    <option value="all" >All locations...</option>
				    <option value="landmark">Landmark</option>
				    <option value="food">Food</option>
				    <option value="gaming">Gaming</option>
				    <option value="transportation">Transportation</option>
				    <option value="museum">Museum</option>
				  </select>

	  			<ul>
		      		{this.state.markers.map((marker) =>
		      			<li key={marker.id}
		      				id={`${marker.id}`}
		      				onClick={this.handleSidebarClick}>
		      			{marker.name}
		      			</li>
		      		)}

	  			</ul>
	  		</div>
	  	</div>
  	)
  }
}

export default Sidebar