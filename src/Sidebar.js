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

		console.log(e.target.classList)
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

		fetch('https://api.unsplash.com/photos/?client_id=dfac3ef8c935541b727ab3164de25b94b85f9a4181868d008afd3c3fc41bcf7a&page=1&query=seattle landmarks')
		.then(response => { return response.json() })
		.then(data => {
			let random = Math.floor(Math.random()*data.length)

			this.setState({ photoUrl : data[random].urls.thumb, photoLink : data[random].links.html })

		})

	}

  render() {
  	return(
  		<div>
	  		<div className='sidebar'>
	  		  <div id="sidebar-photo-contain">

		  		  <a href={this.state.photoLink} target="_blank">
		  		  	<img id="sidebar-photo" src={this.state.photoUrl} alt="Seattle from Unsplash.com" />
		  		  </a>
	  		  </div>


			  <select id="sidebar-locations" name="locations"
			  		onChange={this.filterLocations}
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
	      				onClick={this.handleSidebarClick}>
	      			{marker.name}
	      			</li>
	      		)}

  			</ul>
  			<div id='sidebar-control'
  				onClick={this.toggleSidebar}>
  				<span className='control-text hidden'>- EXPAND -</span>
  				<span className='control-text'>- COLLAPSE -</span>
  			</div>
	  	  </div>
	  	</div>
  	)
  }
}

export default Sidebar