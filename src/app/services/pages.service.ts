
import Pages from '../models/pages.model';

import * as _ from 'underscore';
import { Injectable } from '@angular/core';

@Injectable()
export class PagerService {

        public page : Pages;

      constructor(


   
      ) {  this.page = new Pages() }

    setPager(totalPages: number, currentPage: number , pageSize: number){

        this.page.totalPages = totalPages;


        this.page.currentPage = currentPage;
        this.page.pageSize = pageSize;
        this.page.pages = _.range(1, totalPages+1);
        this.page.nextPage = (<number> currentPage) + 1;
        this.page.previousPage = currentPage -1;
        console.log('page :')
        console.log(this.page);

    }

    getPager( ) {
        // calculate total pages
        //let totalPages = Math.ceil(totalItems / pageSize);

        // let startPage: number, endPage: number;
        // if (totalPages <= 10) {
        //     // less than 10 total pages so show all
        //     startPage = 1;
        //     endPage = totalPages;
        // } else {
        //     // more than 10 total pages so calculate start and end pages
        //     if (currentPage <= 6) {
        //         startPage = 1;
        //         endPage = 10;
        //     } else if (currentPage + 4 >= totalPages) {
        //         startPage = totalPages - 9;
        //         endPage = totalPages;
        //     } else {
        //         startPage = currentPage - 5;
        //         endPage = currentPage + 4;
        //     }
        // }

        // calculate start and end item indexes
        //let startIndex = (currentPage - 1) * pageSize;
        //let endIndex = Math.min(startIndex + pageSize - 1, totalItems - 1);

        // create an array of pages to ng-repeat in the pager control
     

        // return object with all pager properties required by the view
        return {
           
            currentPage: this.page.currentPage,
            pageSize: this.page.pageSize,
            nextPage: this.page.nextPage,
            previousPage : this.page.previousPage,
            pages: this.page.pages,
            totalPages:this.page.totalPages,
        };
    }
}