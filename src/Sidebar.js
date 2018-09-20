import React from 'react';

class Sidebar extends React.Component {
	handleSidebarClick = (e) => {
		console.log(e.target)
	}

  render() {
  	return(
  		<div id='sidebar'>
  			<input type="text" placeholder="Search"></input>
  			<ul>
	      		{this.props.markers.map((result, index) =>
	      			<li key={index}
	      				onClick={this.handleSidebarClick}>
	      			{result.name}
	      			</li>
	      		)}

  			</ul>
  		</div>
  	)
  }
}

export default Sidebar