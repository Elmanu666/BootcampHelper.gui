import { Response } from '@angular/http';
import { ExerciseService } from '../../services/exercise.service';
import Exercise from '../../models/exercise.model';
import { Component, OnInit, ViewContainerRef, ViewChildren, AfterViewInit, QueryList,ElementRef } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { PagerService } from '../../services/pages.service';
import Page from '../../models/pages.model';
import { Router, ActivatedRoute } from '@angular/router';
import { PagerComponent } from '../../common/pager/pager.component';
import { MaterialTypeService} from '../../services/materialType.service';
import { BodyPartService} from '../../services/bodyPart.service';
import { trigger, state, style, animate, transition, query, stagger } from '@angular/animations';
import { NgxSpinnerService } from 'ngx-spinner';



@Component({
  selector: 'bth-exerc-list',
  templateUrl: './exercise-list.component.html',
  styleUrls: ['./exercise-list.component.scss'],
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
export class ExerciseListComponent {




  

	  constructor(
    //Private todoservice will be injected into the component by Angular Dependency Injector
    public toastr: ToastrService,
    private exerciseService: ExerciseService,
    private pagerService: PagerService,
    private router : Router,
    private route: ActivatedRoute,
    private spinner:NgxSpinnerService,
    public materialTypeService : MaterialTypeService,
    public bodyPartService : BodyPartService,



  ) {
     
     pagerService.currentPage$.subscribe(
       page => {


         this.currentPage = page;
         this.start= (page-1)*this.nbDisplayItems;

         this.exercisesListSliced= this.exercisesListFiltered.slice(this.start, this.start+this.nbDisplayItems);

           }
       )


      }

  //Declaring the new todo Exercise and initilizing it -- a suprimer --
  public newExercise: Exercise = new Exercise()

  //An Empty list for the visible todo list
  exercisesList: Exercise[];
  exercisesListFiltered: Exercise[];
  exercisesListSliced: Exercise[];
  currentPage : number;
  // nbItemsAftFiltered : number ;

  editExercises: Exercise[] = []; 

  // search criteria  
  searchText :string;
  bodyPart: string[] ;
  bodyPartSelected: string[];
  materialTypeSelected :string[];
  materialType :string[];
  exerciseTypeSelected : {'criteriaActive': boolean, 'cardio' : number, 'balance': number, 'muscu': number, 'warmup' : number } ;
  exerciseTypeSelectedBoolean : {'result': boolean, 'cardio' : boolean, 'balance': boolean, 'muscu': boolean, 'warmup' : boolean } ;

  // display paramater initizialisation
  start :number;
  nbDisplayItems :number;
  pagesInfo : Page = new Page();
  path : string;
  sortingInfo : any[];




  ngOnInit(): void {
    // this.nbItemsAftFiltered=0

    this.spinner.show();
    this.path = this.route.snapshot.routeConfig.path;
    this.sortingInfo = new Array();



    this.start=0;
    this.nbDisplayItems=10;
    this.currentPage = 1;
    this.materialType = this.materialTypeService.getMaterialType();
    this.bodyPart = this.bodyPartService.getBodyPart();

    this.bodyPartSelected = [];
    this.bodyPartSelected[0] = 'any';

    this.materialTypeSelected=[];
    this.materialTypeSelected[0]=('indif');

    this.exerciseTypeSelected = {'criteriaActive': false, 'cardio' : 0, 'balance': 0, 'muscu': 0, 'warmup' : 0 } ;
    this.exerciseTypeSelectedBoolean = { 'result': false, 'cardio' : false, 'balance': false, 'muscu': false, 'warmup' : false } ;



    this.exerciseService.getExercises(1)
      .subscribe(
        exercises => {

          setTimeout(() => {

                this.spinner.hide();
                }, 200);


          this.exercisesList = exercises;
          this.exercisesListFiltered = exercises;
          this.exercisesListSliced =  this.exercisesList.slice(this.start, this.start+this.nbDisplayItems);

          let totalPages = Math.ceil(exercises.length /this.nbDisplayItems);

          this.pagerService.setPager(totalPages, 1 , this.nbDisplayItems);
          this.pagesInfo.totalPages = totalPages;
          this.pagesInfo.currentPage = 1;
          this.pagesInfo.pageSize = this.nbDisplayItems;
        },
        error=>{

          setTimeout(() => {

                this.spinner.hide();
                }, 200);



        }
       )
  }

   create() {
    this.exerciseService.createExercise(this.newExercise)
      .subscribe((res) => {
        this.exercisesList.push(res.data)
        this.newExercise = new Exercise()
      })
  }


  getExercice(page){

  		this.exerciseService.getExercises(page)
		      .subscribe(exercises => {
		        //assign the todolist property to the proper http response
		        this.exercisesList = exercises;
		        this.pagesInfo = this.pagerService.getPager();



		      })



  }

  displayExercise(id: Exercise['_id']){

    console.log('display exercise click')

    this.router.navigate(['exercise/detail/'+id]);




  }

  jumpToExercise(id: Exercise['_id']){

    this.path=="edit" ? this.router.navigate(['exercise/edit/'+id]) : this.router.navigate(['exercise/detail/'+id]);


  }

  exerciseFilterByText(event : any){

    console.log('exerciseFilterByText declenché');

    this.exercisesListFiltered=this.exercisesList;

    if (this.searchText){
        this.exercisesListFiltered = this.exercisesList.filter( it => {
              return it.title.toLowerCase().includes(this.searchText.toLowerCase()) || it.description.toLowerCase().includes(this.searchText.toLowerCase()) ? true : false;
          });

     

     }

     if(this.materialTypeSelected[0] == 'none')
       {

         this.materialTypeSelected.length > 0 ? this.materialTypeSelected = this.materialTypeSelected.slice(0,1) : '';

          this.exercisesListFiltered = this.exercisesListFiltered.filter( it => {
            return it.material.length > 0 ? false : true;


          })


     }

     if (this.materialTypeSelected[0]== 'any'){

         this.materialTypeSelected.length > 0 ? this.materialTypeSelected = this.materialTypeSelected.slice(0,1) : '';

         this.exercisesListFiltered = this.exercisesListFiltered.filter( it => {
            return it.material.length > 0 ? true : false;


          })



     }
     if (this.materialTypeSelected[0] = 'indif'){

         this.materialTypeSelected.length > 0 ? this.materialTypeSelected = this.materialTypeSelected.slice(0,1) : '';




     }

     if(!(this.materialTypeSelected.includes('none') || this.materialTypeSelected.includes('any')|| this.materialTypeSelected.includes('indif')))
     {

       let materialTypeSelected :String[] =  this.materialTypeSelected ;

       this.exercisesListFiltered = this.exercisesListFiltered.filter(it => {

         return it.material.some( res => {

           return materialTypeSelected.includes(res)


         })

     

       })


     }

     if (this.bodyPartSelected.includes('any')){

       this.bodyPartSelected[0]='any';
       this.bodyPartSelected.length > 0 ? this.bodyPartSelected = this.bodyPartSelected.slice(0,1) : '';

     }

     if (this.bodyPartSelected.length > 0 && this.bodyPartSelected[0] !='any') {

       let bodyPartSelected :String[] =  this.bodyPartSelected ;

       this.exercisesListFiltered = this.exercisesListFiltered.filter(it => {

         return it.details.bodyPart.some(res => {

           return bodyPartSelected.includes(res)



         })



       })

     }

     if (this.exerciseTypeSelected.criteriaActive){


       this.exerciseTypeSelected.muscu == 1 ?  this.exerciseTypeSelectedBoolean.muscu = true : (this.exerciseTypeSelected.muscu == 2 ? this.exerciseTypeSelectedBoolean.muscu = false : this.exerciseTypeSelectedBoolean.muscu = null) ;
       this.exerciseTypeSelected.cardio == 1 ?  this.exerciseTypeSelectedBoolean.cardio = true : (this.exerciseTypeSelected.cardio == 2 ? this.exerciseTypeSelectedBoolean.cardio = false : this.exerciseTypeSelectedBoolean.cardio = null  ) ;
       this.exerciseTypeSelected.warmup == 1 ?  this.exerciseTypeSelectedBoolean.warmup = true : (this.exerciseTypeSelected.warmup == 2 ? this.exerciseTypeSelectedBoolean.warmup = false : this.exerciseTypeSelectedBoolean.warmup = null );
       this.exerciseTypeSelected.balance == 1 ?  this.exerciseTypeSelectedBoolean.balance = true : (this.exerciseTypeSelected.balance == 2 ? this.exerciseTypeSelectedBoolean.balance = false : this.exerciseTypeSelectedBoolean.balance = null );

        

       this.exercisesListFiltered = this.exercisesListFiltered.filter(it =>{

        this.exerciseTypeSelectedBoolean.result = true;

        

         this.exerciseTypeSelected.muscu != 0 && this.exerciseTypeSelectedBoolean.result == true? (this.exerciseTypeSelectedBoolean.muscu == it.details.muscu ? '': this.exerciseTypeSelectedBoolean.result = false): ''; 
         this.exerciseTypeSelected.cardio != 0 && this.exerciseTypeSelectedBoolean.result == true? (this.exerciseTypeSelectedBoolean.cardio == it.details.cardio ? '': this.exerciseTypeSelectedBoolean.result = false): ''; 
         this.exerciseTypeSelected.warmup != 0 && this.exerciseTypeSelectedBoolean.result == true? (this.exerciseTypeSelectedBoolean.warmup == it.details.warmup ? '': this.exerciseTypeSelectedBoolean.result = false): ''; 
         this.exerciseTypeSelected.balance != 0 && this.exerciseTypeSelectedBoolean.result == true? (this.exerciseTypeSelectedBoolean.balance == it.details.balance ? '': this.exerciseTypeSelectedBoolean.result = false): ''; 


         return this.exerciseTypeSelectedBoolean.result
       })


     }


     this.exercisesListSliced = this.exercisesListFiltered.slice(this.start, this.nbDisplayItems);
     this.pagesInfo.totalPages = Math.ceil(this.exercisesListFiltered.length /this.nbDisplayItems);
     this.pagerService.setPager(this.pagesInfo.totalPages, this.pagesInfo.currentPage, this.pagesInfo.pageSize);









  }


    editExercise(event, exercise: Exercise) {

    if(this.exercisesList.includes(exercise)){
      if(!this.editExercises.includes(exercise)){
      	this.editExercises = []
        this.editExercises.push(exercise)
      }else{

 //       this.editExercises.splice(this.editExercises.indexOf(exercise), 1)
        this.exerciseService.editExercise(exercise).subscribe(res => {
          console.log('Update Succesful')
          this.toastr.success('Update succesful', 'Success!' , {timeOut: 2000});

        }, err => {
          this.editExercise(err, exercise)
          console.error('Update Unsuccesful')
          this.toastr.error('Update Unsuccesful', 'Error!' , {timeOut: 2000});
        })
      }
    }
  }



    submitExercise(event, exercise:Exercise){

    if(event.keyCode ==13){

    	this.exerciseService.createExercise(exercise).subscribe(res =>{

    		console.log('creation done')
    	},err => {

    		console.error('error creation')

    	})
 //     this.editExercise(exercise)
    }
  }

    formatLabel(value: number | null) {

      if (value === 0) {
        return "indif";
      }

      if (value === 1) {
        
       return "Yes";
      }
      if (value === 2) {
        return "No";
      }

      return value;
  }

  deleteExercise(exercise: Exercise) {
    this.exerciseService.deleteExercise(exercise._id).subscribe(res => {
      this.exercisesList.splice(this.exercisesList.indexOf(exercise), 1);
      this.toastr.success('Delete succesful', 'Success!' , {timeOut: 2000});

    })
  }

  doneEditing(exercise: Exercise) {

  	this.editExercises.splice(this.editExercises.indexOf(exercise), 1);

  }

  sortBy(criteria){
    var sortingInfoExist = false;
    var index = 0 ;
    for (var v = 0; v < this.sortingInfo.length; v++)
      {
      if (this.sortingInfo[v].criteria == criteria ){
        this.sortingInfo[v].sort == 'asc' ? this.sortingInfo[v].sort = 'dsc' :this.sortingInfo[v].sort = 'asc';
        sortingInfoExist = true;
        index = v;

        }
      }

    sortingInfoExist == false ? this.sortingInfo.push({'criteria': criteria, 'sort': 'asc'}) : '';

    this.sortingInfo[index].sort == 'asc' ? this.exercisesList.sort((a,b) => a[criteria].localeCompare(b[criteria])) : this.exercisesList.sort((a,b) => b[criteria].localeCompare(a[criteria]));

    this.exerciseFilterByText('forced');




  }

}
