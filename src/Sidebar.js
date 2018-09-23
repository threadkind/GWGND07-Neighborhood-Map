import React from 'react';


class Sidebar extends React.Component {

	state = {
		markers : this.props.markers
	}

	handleSidebarClick = (e) => {
		let clickedMarker = this.props.markers[e.target.id-1]
		console.log(clickedMarker)
	}

	filterLocations = (e) => {
		console.log(e.target.value)
		console.log(this.props.markers)

		e.preventDefault()

		if(e.target.value === 'all'){
			this.setState({ markers : this.props.markers })
		}
		else {
			let filtered = this.props.markers.filter( place => place.category === e.target.value )
			this.setState({ markers : filtered })
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