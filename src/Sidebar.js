import React from 'react';

class Sidebar extends React.Component {

  state = {
	menuOpen : false,
	markers : this.props.markers,
	selectedListItem : {},
	photoUrl : '',
	photoLink : ''
  }

  toggleSidebar = (e) => {
	let sidebar = document.querySelector('.sidebar')

	let elements = [document.querySelector('#sidebar-photo'), document.querySelector('#sidebar-locations'), document.querySelector('#sidebar-list')]

	function toggleHideElements(){
	  for(let i = 0; i < elements.length; i++){
		elements[i].classList.toggle('hidden')
	  }
	}

	document.querySelectorAll('.control-text').forEach( element => element.classList.toggle('hidden'))

	  if(this.state.menuOpen === false){
		this.setState({ menuOpen : true})
		sidebar.classList.toggle('minimized')
		toggleHideElements()
	  }
	  else {
		this.setState({ menuOpen : false})
		sidebar.classList.toggle('minimized')
		setTimeout(toggleHideElements, 300)
	  }
	}

  handleSidebarClick = (e) => {
	let clickedListItem = this.props.markers.filter( place => { return place.id === Number(e.target.id)} )
	  this.setState({ selectedListItem : clickedListItem })
	  this.props.listItemClick(clickedListItem)
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

  componentDidMount() {
  	if(document.querySelector('.unsplash-error').classList.contains('hidden') === false) {
	  document.querySelector('.unsplash-error').classList.add('hidden')
	}

	fetch('https://api.unsplash.com/photos/?client_id=dfac3ef8c935541b727ab3164de25b94b85f9a4181868d008afd3c3fc41bcf7a&page=1&query=seattle landmarks')
	.then(response => { return response.json() })
	.then(data => {
	  let random = Math.floor(Math.random()*data.length)

	  this.setState({ photoUrl : data[random].urls.thumb,
	  				photoLink : data[random].links.html
	  })

	})
	.catch(err =>
	  document.querySelector('.unsplash-error').classList.remove('hidden')
	)
  }

  render() {
  	return(
	  <aside>
	  	<div className='sidebar'>
		  <div id='sidebar-control'
	  			tabIndex={0}
				role="button"
				aria-label='sidebar control'
	  			onClick={this.toggleSidebar}>
	  		<span className='control-text hidden'>EXPAND LOCATIONS</span>
	  		<span className='control-text'>COLLAPSE LOCATIONS</span>
	  	  </div>
	  	  <br />

	  	  <div className="unsplash-error hidden">Unable to load image from Unsplash</div>
	  	  <div id="sidebar-photo-contain">
	  	  { this.state.photoUrl !== '' &&
		    <a style={{display: "table-cell"}}
		    	href={this.state.photoLink}
		    	target="_blank"
		    	rel="noreferrer">
		   	  <img id="sidebar-photo"
		   		  src={this.state.photoUrl}
		   		  alt="Seattle from Unsplash.com" />
		  	</a>
		  }
	  	  </div>

		  <select id="sidebar-locations"
		  		  name="locations"
			  	  onChange={this.filterLocations}
			  	  aria-label="Dropdown to filter locations"
		  >
		    <option value="all" >All locations...</option>
			<option value="landmark">Landmark</option>
			<option value="food">Food</option>
			<option value="gaming">Gaming</option>
			<option value="transportation">Transportation</option>
			<option value="museum">Museum</option>
		  </select>

  		  <ul id="sidebar-list">
	      {this.state.markers.map((marker) =>
	      	<li key={marker.id}
	      		id={`${marker.id}`}
	      		onClick={this.handleSidebarClick}
	      		tabIndex={0}
				role="link"
				aria-label={marker.name}
			>
	      	{marker.name}
	      	</li>
	      )}

  		  </ul>
	  	</div>
	  </aside>
  	)
  }
}

export default Sidebar