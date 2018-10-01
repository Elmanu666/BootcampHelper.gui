
import Pages from '../models/pages.model';

import * as _ from 'underscore';
import { Injectable } from '@angular/core';
import { Subject }    from 'rxjs'

@Injectable()
export class PagerService {

        public page : Pages;
        private currentPageSource = new Subject<number>();
        private totalPageSource = new Subject<number>();
        private oldTotalPages : number;
        currentPage$ = this.currentPageSource.asObservable();
        totalPages$ = this.totalPageSource.asObservable();


      constructor(


   
      ) {  this.page = new Pages() }

    setPager(totalPages: number, currentPage: number , pageSize: number){

        

        this.oldTotalPages = this.page.totalPages ;
        this.page.totalPages = totalPages;


        this.page.currentPage = currentPage;
        this.page.pageSize = pageSize;
        this.page.pages = _.range(1, totalPages+1);
        this.page.nextPage = (<number> currentPage) + 1;
        this.page.previousPage = currentPage -1;
        console.log('page :')
        console.log(this.page);
        this.currentPageSource.next(currentPage);
        if (totalPages != this.oldTotalPages){
                  this.totalPageSource.next(totalPages);

        }
  

    }

    getPager( ) {

        return {
           
            currentPage: this.page.currentPage,
            pageSize: this.page.pageSize,
            nextPage: this.page.nextPage,
            previousPage : this.page.previousPage,
            pages: this.page.pages,
            totalPages:this.page.totalPages,
        };
    }

    setCurrentPage(page:number){
        console.log('on passe dans le setcurrentPage du service')

        this.currentPageSource.next(page);



    }
}