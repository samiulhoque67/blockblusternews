import axios from '../utils/axios.js'


export const newsCategory={

  technology:'technology',
  science:'science',
  business:'business',
  entertainment:'entertainment',
  general:'general',
  health:'health',
  sports:'sports'

};


const Max_Item_per_page=10;

export default class News{

constructor(category){

this._category=category;
this._searchTerm='';
this._pageSize=Max_Item_per_page;
this._currentPage=1;
this._totalPage=1;







}
async getNews(){

	try{

		const {data}=await axios.get(this._getUrl());
		this._totalPage=Math.ceil(data.totalResults/this._pageSize);
		return {
             articles :data.articles,
             totalPage:this._totalPage,
             isNext:this._isNext(),
             isPrev:this._isPrev(),
             currentPage:this._currentPage,
             totalResults:data.totalResults,
             category:this._category
         }
	}
	catch(e){

		throw new Error(e);
	}
}


next(){

if(this._isNext()){
	this._currentPage++;
	return this.getNews();
}
return null;

}
prev(){

	if(this._isPrev()){
		this._currentPage--;
		return this.getNews();
	}
	return null;
}


setCurrentPageNumber(pageNumber){
	if(pageNumber>=1 && pageNumber<=this._totalPage){
		
		this._currentPage=pageNumber;
		return this.getNews();
	}

}
changeCategory(category){

	this._category=category;
	this._currentPage=1;
	return this.getNews();


}
searchTerm(term){
	this._searchTerm=term;
	return this.getNews();
}



_getUrl(){
	let url='/?'
	 
	if (this._category) url +=`category=${this._category}`;
	if(this._searchTerm) url +=`&q=${this._searchTerm}`;
	if(this._pageSize) url +=`&pageSize=${this._pageSize}`;
	if(this._currentPage) url +=`&page=${this._currentPage}`;
	
	return url;




}

_isNext(){
	if(this._currentPage<this._totalPage){
		return true;
	}
	}
	_isPrev(){

		if(this._currentPage>1){
			return true;
		}
	}




}

