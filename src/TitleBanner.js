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
        <div id="title"
        	onClick={this.toggleMenu}
        >Seattle Neighborhood Map</div>

		)
	}

}

export default TitleBanner