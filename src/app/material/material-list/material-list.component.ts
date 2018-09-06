import { Response } from '@angular/http';
import { MaterialService } from '../../services/material.service';
import Material from '../../models/material.model';
import { Component, OnInit} from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { PagerService } from '../../services/pages.service';
import Page from '../../models/pages.model';
import { Router, ActivatedRoute } from '@angular/router';
import { PagerComponent } from '../../common/pager/pager.component';
import { MaterialTypeService} from '../../services/materialType.service';
import { BodyPartService} from '../../services/bodyPart.service';
import { trigger, state, style, animate, transition, query, stagger } from '@angular/animations';


@Component({
  selector: 'bth-material-list',
  templateUrl: './material-list.component.html',
  styleUrls: ['./material-list.component.scss'],
  animations: [
      trigger('tableLine', [
          transition('void => *', 
            query('tr',[
              style({ opacity: 0 }),
              stagger(100, [
                  animate('0.2s', style({ opacity: 1 }))

              ])
             ])
            )
          ])
        ],
  providers: [PagerService]
})
export class MaterialListComponent {




  

	  constructor(
    //Private todoservice will be injected into the component by Angular Dependency Injector
    public toastr: ToastrService,
    private materialService: MaterialService,
    private pagerService: PagerService,
    private router : Router,
    private route: ActivatedRoute,

    public materialTypeService : MaterialTypeService,
    public bodyPartService : BodyPartService,



  ) {
     
     pagerService.currentPage$.subscribe(
       page => {


         this.currentPage = page;
         this.start= (page-1)*this.nbDisplayItems;

         this.materialsListSliced= this.materialsListFiltered.slice(this.start, this.start+this.nbDisplayItems);

           }
       )


      }

  //Declaring the new todo Exercise and initilizing it -- a suprimer --
  public newMaterial: Material = new Material()

  //An Empty list for the visible todo list
  materialsList: Material[];
  materialsListFiltered: Material[];
  materialsListSliced: Material[];
  currentPage : number;
  // nbItemsAftFiltered : number ;

  editmaterials: Material[] = []; 
  typeSelected : string[];

  // search criteria  
  searchCriteria :{'searchText': string, 'type' : {'active' : boolean, 'value' : Array<string>}, 'weigth' : {'active': boolean,'min' : number, 'max': number}, 'size':{'active' : boolean, 'value' : Array<string>}, 'length': {'active': boolean, 'min' : number, 'max': number}, 'quantity' :{'active': boolean, 'min' : number, 'max': number}, 'strength' : {'active' : boolean, 'value' : Array<string>}  };
  
  materialType : string[];
  materialSize : string[];

  // display paramater initizialisation
  start :number;
  nbDisplayItems :number;
  pagesInfo : Page = new Page();
  path : string;




  ngOnInit(): void {
    // this.nbItemsAftFiltered=0


    this.path = this.route.snapshot.routeConfig.path

    this.materialSize=['XXS','XS','S', 'M', 'L', 'XL', 'XXL'];


    this.start=0;
    this.nbDisplayItems=10;
    this.currentPage = 1;


    this.materialType = this.materialTypeService.getMaterialType();
    this.typeSelected = new Array();
    this.typeSelected[0]='any';
    this.searchCriteria = {'searchText': '', 'type' :{'active' : false, 'value': this.typeSelected} , 'weigth' : {'active': false ,'min':0, 'max':40}, 'size':{'active' : false, 'value': ['']}, 'length': {'active': false, 'min':0, 'max':200}, 'quantity' :{'active': false, 'min':0, 'max':50}, 'strength' : {'active' : false, 'value': ['']},  };
  





    this.materialService.getMaterials(1)
      .subscribe(materials => {
        this.materialsList = materials;
        this.materialsListFiltered = materials;

        this.materialsListSliced =  this.materialsList.slice(this.start, this.start+this.nbDisplayItems);
        let totalPages = Math.ceil(materials.length /this.nbDisplayItems);
        this.pagerService.setPager(totalPages, 1 , this.nbDisplayItems);
        this.pagesInfo.totalPages = totalPages;
        this.pagesInfo.currentPage = 1;
        this.pagesInfo.pageSize = this.nbDisplayItems;




      })
  }

  updateFilter(sliderEvent, sliderId){

    sliderId == 'nbItems' ? this.nbDisplayItems = sliderEvent.from : '';
    sliderId == 'weigth' ? (this.searchCriteria.weigth.min = sliderEvent.from, this.searchCriteria.weigth.max = sliderEvent.to):'';
    sliderId == 'length' ? (this.searchCriteria.length.min = sliderEvent.from, this.searchCriteria.length.max = sliderEvent.to):'';
    sliderId == 'quantity' ? (this.searchCriteria.quantity.min = sliderEvent.from, this.searchCriteria.quantity.max = sliderEvent.to):'';
    sliderId == 'size' ? this.searchCriteria.size.value:sliderEvent.from;
    sliderId == 'strength' ? this.searchCriteria.strength.value = sliderEvent.from:'';


    this.materialFilter('update');



}


activeFilter(filter:string){

  this.searchCriteria[filter].active ? this.searchCriteria[filter].active = false : this.searchCriteria[filter].active = true;
  this.materialFilter('update');

}




  jumpToMaterial(id: Material['_id']){

    this.path=="edit" ? this.router.navigate(['material/edit/'+id]) : this.router.navigate(['material/detail/'+id]);


  }

  materialFilter(event : any){

    this.materialsListFiltered=this.materialsList;
    if (this.searchCriteria.searchText){
        this.materialsListFiltered = this.materialsList.filter( it => {
              return it.title.toLowerCase().includes(this.searchCriteria.searchText.toLowerCase()) || it.description.toLowerCase().includes(this.searchCriteria.searchText.toLowerCase()) ? true : false;
          });

     

     }

     if (this.searchCriteria.quantity.active){

       this.materialsListFiltered = this.materialsListFiltered.filter( it => {
              return it.quantity >=  this.searchCriteria.quantity.min && it.quantity <=  this.searchCriteria.quantity.max;
          });

     }

      if (this.searchCriteria.length.active){

       this.materialsListFiltered = this.materialsListFiltered.filter( it => {
              return it.length >=  this.searchCriteria.length.min && it.length <=  this.searchCriteria.length.max;
          });

     }

      if (this.searchCriteria.weigth.active){

       this.materialsListFiltered = this.materialsListFiltered.filter( it => {
              return it.weigth >=  this.searchCriteria.weigth.min && it.weigth <=  this.searchCriteria.weigth.max;
          });

     }


     if(this.searchCriteria.type.active){

       this.materialsListFiltered = this.materialsListFiltered.filter(it =>{
         return this.searchCriteria.type.value.includes(it.type) 

       });

     }


      if(this.searchCriteria.strength.active){

       this.materialsListFiltered = this.materialsListFiltered.filter(it =>{
         return this.searchCriteria.strength.value.includes(it.strength) 

       });

     }

     if(this.searchCriteria.size.active){

       this.materialsListFiltered = this.materialsListFiltered.filter(it =>{
         return this.searchCriteria.size.value.includes(it.size) 

       });

     }


     this.materialsListSliced = this.materialsListFiltered.slice(this.start, this.nbDisplayItems);
     this.pagesInfo.totalPages = Math.ceil(this.materialsListFiltered.length /this.nbDisplayItems);
     this.pagerService.setPager(this.pagesInfo.totalPages, this.pagesInfo.currentPage, this.pagesInfo.pageSize);









  }





}
