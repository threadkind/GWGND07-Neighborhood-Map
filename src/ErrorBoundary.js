import React from 'react'

class ErrorBoundary extends React.Component {
  state = {
	hasError : false,
  }

  componentDidCatch(error, info) {
  	this.setState({ hasError : true })
  }

  render() {
  	if(this.state.hasError) {
  	  return (
  	  	<div>
	  	  <h1 className="component-error">Sorry, something went wrong
	  	  </h1>
	  	</div>
  	  )

  	}

	return this.props.children


  }

}

export default ErrorBoundary