import { Component, OnInit, Input, OnChanges, Output, EventEmitter, SimpleChanges, ViewChildren } from '@angular/core';
import { PagerService } from '../../services/pages.service';
import Pages from '../../models/pages.model';



@Component({
  selector: 'app-pager',
  templateUrl: './pager.component.html',
  
  
})
export class PagerComponent implements OnChanges, OnInit {

	errors: Array<string> =[];
	pagesInfo: Pages ;
	@Input() currentPage: number ;
	@Input() totalPages: number ;
	@Input() itemsPerpage: number ;
  private _totalPages:number;
  private _currentPage:number;
  private _itemsPerpage:number;


  constructor(private pagerService:PagerService) { 

       pagerService.totalPages$.subscribe(
       page => {


         this.pagesInfo = this.pagerService.getPager();
         console.log('pager : change in totalPage detected')
         console.log(this.pagesInfo);

           }
       )



  }

  ngOnInit() {

    if (this.currentPage == null && this.totalPages == null && this.itemsPerpage == null){

      this.pagesInfo = this.pagerService.getPager();
      this._totalPages= this.pagesInfo.totalPages;
      this._currentPage= this.pagesInfo.currentPage;
      this._itemsPerpage= this.pagesInfo.pageSize;


    }
    else {

        this._totalPages= this.totalPages;
        this._currentPage= this.currentPage;
        this._itemsPerpage= this.itemsPerpage;

    }

 
    console.log(this.pagesInfo);
    console.log(this._totalPages);
    console.log(this._currentPage);
    console.log(this._itemsPerpage);


  
  }

  ngOnChanges(changes: SimpleChanges){
    this.pagesInfo = this.pagerService.getPager();
    this._totalPages= this.pagesInfo.totalPages;
    this._currentPage= this.pagesInfo.currentPage;
    this._itemsPerpage= this.pagesInfo.pageSize;
    
    console.log(changes);
    console.log(this.pagesInfo);
    console.log(this._totalPages);
    console.log(this._currentPage);
    console.log(this._itemsPerpage);
    //this.pagesInfo.totalPages= this.totalPages;
    


  }

  pageSelect(page:number){

  	this.pagerService.setCurrentPage(page);
    this._currentPage = page;
  	this.pagesInfo.currentPage = page;

  	 console.log(this.pagesInfo);


  }

  pageChange(select : string){

  	select == 'next' ? (this.pagerService.setCurrentPage(this.pagesInfo.currentPage + 1), this.pagesInfo.currentPage +=1) : (this.pagerService.setCurrentPage(this.pagesInfo.currentPage - 1), this.pagesInfo.currentPage -=1);

  	console.log(this.pagesInfo);


  }

}