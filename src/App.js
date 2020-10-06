import React from 'react';
import Header from './components/header.jsx';
import News,{newsCategory} from './news/index';
import NewsList from './components/news.jsx';
import Pagination from './components/pagination.jsx';
import Loading from './components/loading.jsx';
const news=new News(newsCategory.technology);
class App extends React.Component {

   state={
      data:{},
      isLoading:true,
    }  

    componentDidMount(){


      
      news.getNews()
      .then(data =>{
        this.setState({data,isLoading:false,})
      } )
      .catch(e =>{


console.log(e);
alert("something went wrong") ;       
      }


        )

    }

    next=() =>{
      if(this.state.data.isNext){
       this.setState({isLoading:true})
      }
      news.next()
      .then(data =>{
        this.setState({data,isLoading:false})
      })



    }
 prev=() =>{
      if(this.state.data.isPrev){
       this.setState({isLoading:true})
      }
      news.prev()
      .then(data =>{
        this.setState({data,isLoading:false})
      })

    }
    handleChange= value => {
     

     this.setState({
      data:{...this.state.data,
        currentPage:Number.parseInt(value),
      }
     })
     
    }
    changeCategory=category =>{

      this.setState({isLoading:true});
      news.changeCategory(category)
      .then(data =>{
        this.setState({data,isLoading:false})
      })




    }

    goToPage=()=> {
      console.log(this.state.data.currentPage);
      this.setState({isLoading:true})
      news.setCurrentPageNumber(this.state.data.currentPage)
      .then(data =>{
        this.setState({data,isLoading:false})
      })
    }
searchTerm=term =>{
  this.setState({isLoading:true});
      news.searchTerm(term)
      .then(data =>{
        this.setState({data,isLoading:false})
      })
  
}
  render(){

 

    
  return (
    <div className="container">
          <div className="row">
    <div className="col-sm-6  offset-md-3">
     <Header category= {this.state.data.category}
             changeCategory={this.changeCategory}
             search={this.searchTerm}/>
     <div className='d-flex'>
     <p className='text-black-50'>
     About {this.state.data.totalResults} results found
     </p>
     <p className='text-black-50 ml-auto'>
     {this.state.data.currentPage} page of {this.state.data.totalPage}
     </p>
     </div>

{this.state.isLoading ?(
<Loading/>):

  (<div>
<NewsList news= {this.state.data.articles}/>
     <Pagination totalPage={this.state.data.totalPage}
                       currentPage={this.state.data.currentPage}
                       isNext={this.state.data.isNext}
                       isPrev={this.state.data.isPrev}
                       next={this.next}
                       prev={this.prev}
                       handlePageChange={this.handleChange}
                       goToPage={this.goToPage}





     />

    </div>)}

     
     
     
     </div>
    </div>
    </div>
  );
}}

export default App;
