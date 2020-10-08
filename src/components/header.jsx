import React  from 'react';
import {newsCategory} from '../news/index';

class Header extends React.Component {
	state={
		searchTerm:'',
	};

searchRef=React.createRef();
handleChange= e => {
	this.setState({searchTerm:e.target.value})


}
handleKeyPress= e =>{

	if(e.key === 'Enter'){

	this.props.search(this.state.searchTerm)
}

}

componentDidMount(){
  this.searchRef.current.focus();



}


render(){
	const {category,changeCategory}=this.props;
return (

	<div className='my-4'>
	<h1 className ="mb-4" style={{fontWeight :'300'}}>
	    Blockbluster Headlines  
	 </h1>
	 <input ref={this.searchRef}
	 type="search" 
	 className='form-Control'
	 placeholder="search"
	 value={this.state.searchTerm}
	 onChange={this.handleChange}
	 onKeyPress={this.handleKeyPress}
	 />
	 <div className='my-4'>
	 {newsCategory && Object.keys(newsCategory).map( (item) =>{
         console.log(category);

	 	if(category=== newsCategory[item])
	 		return (
<button 
onClick={() =>changeCategory(newsCategory[item])
  }
className="btn btn-sm btn-warning mr-2 mb-2"
>
{`#${newsCategory[item]}`}
</button>

	 			)
	 	return(
<button 
onClick={() =>changeCategory(newsCategory[item])

}
className="btn btn-sm btn-light mr-2 mb-2"
>

{`#${newsCategory[item]}`}
</button>
)
	 })}

	</div>
	</div>
	);
	 }
}

export default Header;