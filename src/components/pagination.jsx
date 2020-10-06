import React from 'react';

class Pagination extends React.Component{

state={
	isEditable:false,
}

render(){

	const {totalPage,currentPage,isNext,isPrev,next,prev,handlePageChange,goToPage }=this.props
	return(

<div className="d-flex my-5 align-items-center">
<button className="btn btn-warning" disabled={!isPrev}
onClick={() =>prev()}>
Previous
</button>
<div className='"flex-glow-1 text-center'>
{this.state.isEditable ? (
	<input type="number"
	 value={currentPage}
	onChange={(e) => handlePageChange(e.target.value)}
	onKeyPress= {e => {
		
		if(e.key === 'Enter'){
			
			goToPage();
			this.setState({isEditable:false});
		}
	}}


	/>  ):
(<p style={{userSelect:'none',lineheight:'1.1'}}
	title='Double tap to jump page'
	onDoubleClick={() => {
		this.setState({isEditable:!this.state.isEditable});
	}}
	>
	{currentPage} of {totalPage}
	<br></br>
	<small>Doble tap to edit</small>
	</p>
	)}
	</div>
	<button className="btn btn-warning ml-auto" disabled={!isNext} onClick={() =>next()}>
	Next</button>
</div>


		)
}
}


export default Pagination;