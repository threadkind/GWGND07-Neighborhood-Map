import React from 'react'

class TitleBanner extends React.Component {
	state = {
		menuOpen : false
	}
	toggleMenu = () => {
		const sidebar = document.querySelector('.sidebar')
		if(this.state.menuOpen === false){
			this.setState({ menuOpen : true})
			sidebar.classList.remove('hidden')
		}
		else {
			this.setState({ menuOpen : false})
			sidebar.classList.add('hidden')

		}
	}

	render() {
		return(

		<div>
			<div id="menu-button"
	        	onClick={this.toggleMenu}
        	>☰</div>


	        <div id="title"
	        >Seattle Neighborhood Map</div>
	    </div>
		)
	}

}

export default TitleBanner