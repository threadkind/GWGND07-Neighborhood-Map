import React from 'react';

class Sidebar extends React.Component {

  render() {
  	console.log(this.props.markers)
  	return(
  		<div id='sidebar'>
  			<input type="text" placeholder="Search"></input>
  			<ol>
	      		{this.props.markers.map((marker, index) =>
	      			<li key={index}>{marker.name}</li>
	      		)}

  			</ol>
  		</div>
  	)
  }
}

export default Sidebar