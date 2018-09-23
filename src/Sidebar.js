import React from 'react';


class Sidebar extends React.Component {
	handleSidebarClick = (e) => {
		let clickedMarker = this.props.markers[e.target.id-1]


		console.log(clickedMarker)
	}

	filterLocations = (e) => {
		console.log(e.target.value)
	}

  render() {
  	return(
  		<div>

	  		<div className='sidebar hidden'>

				  <select name="locations"
				  		onChange={this.filterLocations}
>
				    <option value="filter" disabled>Filter locations...</option>
				    <option value="landmark">Landmark</option>
				    <option value="food">Food</option>
				    <option value="gaming">Gaming</option>
				    <option value="transportation">Transportation</option>
				    <option value="museum">Museum</option>
				  </select>

	  			<ul>
		      		{this.props.markers.map((marker) =>
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