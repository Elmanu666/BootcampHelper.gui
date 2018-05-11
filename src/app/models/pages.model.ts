class pages {
    
          totalPages : number;
          currentPage : number;
          pageSize : number;
          pages : [number];
          previousPage : number;
          nextPage : number;



    constructor(){

          this.totalPages = 0;
          this.currentPage = 0;
          this.pageSize = 0;
          this.pages = [0];
          this.previousPage = 0;
          this.nextPage = 0;


    }

}

export default pages;