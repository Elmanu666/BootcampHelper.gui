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

  constructor(private pagerService:PagerService) { }

  ngOnInit() {

  	this.pagesInfo = this.pagerService.getPager();


  
  }

  ngOnChanges(changes: SimpleChanges){
    this.pagesInfo = this.pagerService.getPager();
    console.log(changes);
    console.log(this.pagesInfo);
    //this.pagesInfo.totalPages= this.totalPages;
    


  }

  pageSelect(page:number){

  	this.pagerService.setCurrentPage(page);
  	this.pagesInfo.currentPage = page;

  	  	console.log(this.pagesInfo);


  }

  pageChange(select : string){

  	select == 'next' ? (this.pagerService.setCurrentPage(this.pagesInfo.currentPage + 1), this.pagesInfo.currentPage +=1) : (this.pagerService.setCurrentPage(this.pagesInfo.currentPage - 1), this.pagesInfo.currentPage -=1);

  	console.log(this.pagesInfo);


  }

}