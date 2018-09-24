import React from 'react';

class InfoMenu extends React.Component {
	state = {
		view: this.props.view
	}

	closeMenu = () => {
		this.props.closeMenu()
	}

	tabClick = (e) => {
	  if(e.target.classList.contains('tabs')){
	    document.querySelectorAll('.selected').forEach( item => item.classList.remove('selected'));
	    e.target.classList.add('selected');

	    const clickedTab =e.target.classList[1];
	    document.querySelectorAll('.tab-content').forEach( tab => {
	      if(tab.classList.contains(clickedTab)){
	        tab.classList.add('selected');
	      }
	  	})
	  }
	}

	render(){
		console.log(this.props.item.map(item => { return item.name })[0])
		return(
			<div>
				<div id="info-menu-close"
					onClick={this.closeMenu}
				>X</div>

				<div id="info-menu">
				  <div id="tab-contain"
				  	onClick={this.tabClick}>
				    <div className="tabs tab1 selected">Tab 1</div>
				    <div className="tabs tab2">Tab 2</div>
				    <div className="tabs tab3">Tab 3</div>
				  </div>


				  <span className="tab-content tab1 selected">{this.props.item.map(item => { return item.name })[0]}</span>
				  <span className="tab-content tab2">Here is Tab 2's content.</span>
				  <span className="tab-content tab3">And also Tab 3's content is right here.</span>
				</div>

			</div>
		)
	}
}

export default InfoMenu