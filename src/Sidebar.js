import React from 'react';


class Sidebar extends React.Component {
	handleSidebarClick = (e) => {
		let clickedMarker = this.props.markers[e.target.id-1]


		console.log(clickedMarker)
	}

  render() {
  	return(
  		<div className='sidebar hidden'>
  			<input type="text" placeholder="Search"></input>
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
  	)
  }
}

export default Sidebar