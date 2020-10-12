import { Component,DoCheck, OnInit, Input, OnChanges, SimpleChanges, IterableDiffer,IterableDiffers } from '@angular/core';
import { Observable, Subscribable } from 'rxjs';

@Component({
  selector: 'app-progress-chart',
  templateUrl: './progress-chart.component.html',
  styleUrls: ['./progress-chart.component.scss'],

})
export class ProgressChartComponent implements OnInit, DoCheck {

	@Input() height: number = 120;
	@Input() width: number = 120;

	@Input() value: number[]=[0,0,0] ;
  @Input() border:number = 14;


  border_center:number;

	cx: number ;
	cy_text: number ;
	cy:number ;

  radiusX:number[] = [0,0,0];
  radiusY:number[] = [0,0,0];

  radiusX_mask:number = 0;
  radiusY_mask:number=0;
  circumference:number[] =[0,0,0];
  dashoffset:number[]=[0,0,0];

  strokeDasharray:string = "0,0";
  load:boolean=false;
  distance1:number;
  fontSize:string="40px"

  public formDef:string="circle";

  /* to detect change in table input */
  private differ: IterableDiffer<number>;


  constructor(iDiff: IterableDiffers) { 
 
		this.differ = iDiff.find(this.value).create();
  }

  ngOnInit(): void {
  	this.setForm()
  	this.initData();
  	this.shape();
  	this.progress();
  	this.load=true;

  }


  public ngDoCheck() {
    console.log('[ngDoCheck] checked');
    if (this.differ.diff(this.value)) {
        // Unfortunately ChangeDetectorRef is not our savior here .
        // this.cd.detectChanges();
  		this.progress();

      }
     //   this.value = this.differ._additionsHead.curentIndex;


    }
    
  setForm(){
  	const rat = this.width/this.height;
  	debugger;
  	if (rat == 1){
  		this.formDef = "circle";
		}
		else {
			this.formDef = "ellipse"
		}
		console.log('form def :', this.formDef)
  }
  


  ngOnChanges(changes: SimpleChanges) {
   
   	if(changes.border !== undefined){
   		if(changes.border.previousValue != undefined  ){
   		  if (changes.border.currentValue !== changes.border.previousValue) {
   		  	this.shape();
   		    this.progress();
    		}
    	}
   	}
  }


  private initData(){
  	this.cx= this.width /2;
  	this.cy= this.height /2;

  	this.distance1=4;
  	this.fontSize=this.height/4+"px";
 // 	  	this.cy_text= this.cy + 8;
  	this.cy_text= this.cy + (this.height/12);
  //	this.cy_text= this.cy;

  }

  private shape(){
  	const circle:string="circle";
  	const ellipse:string="ellipse";
  	debugger;	
  	switch(this.formDef){

  		case circle : {
	  		for (var v = 0; v < this.value.length; v++)
		      {
		  			if (v==0){
		  				this.radiusX[v] = ((this.width-this.border) /2) ;
		  				this.radiusY[v] = ((this.width-this.border) /2) ;
		  			}
	  				if (v==1){
	  					this.radiusX[v] = this.radiusX[0] - this.border  - this.distance1 ;
	  					this.radiusY[v] = this.radiusY[0] - this.border  - this.distance1 ;
	  				}
	  				if (v==2){
	  					this.border_center = this.radiusX[1] - (this.border/2) - this.distance1;

	  					this.radiusX[v] = this.border_center - (this.border_center/2);
	  					this.radiusY[v] = this.border_center - (this.border_center/2);
	  					// this.radiusX[v] = this.radiusX[1] - this.border  - this.distance1 ;
	  					// this.radiusY[v] = this.radiusY[1] - this.border  - this.distance1 ;

	  				}
					}

	  		for (var v = 0; v < this.value.length; v++)
	      	{
	  				this.circumference[v] =  this.radiusX[v] * 2 * Math.PI;
	  			}

  			break;
  		}

  		case ellipse : {

	  		for (var v = 0; v < this.value.length; v++)
		      {
		  			if (v==0){
		  				this.radiusX[v] = ((this.width-this.border) /2) ;
		  				this.radiusY[v] = ((this.height-this.border) /2) ;
		  			}
	  				if (v==1){
	  					this.radiusX[v] = this.radiusX[0] - this.border  - this.distance1 ;
	  					this.radiusY[v] = this.radiusY[0] - this.border  - this.distance1 ;
	  				}
	  				if (v==2){
	  					// const border_centerX :number = this.radiusX[1] - (this.border/2) - this.distance1;
	  					this.radiusX[1] < this.radiusY[1] ? this.border_center = this.radiusY[1] - (this.border/2) - this.distance1 : this.border_center = this.radiusX[1] - (this.border/2) - this.distance1;

	  					 this.radiusY[v] = this.border_center/2;
	  					 this.radiusX[v] = this.border_center/2;

	  					this.radiusX_mask = this.radiusX[1] - this.border  - this.distance1;
  						this.radiusY_mask =this.radiusY[1] - this.border  - this.distance1;


	  				}
					}

	  		for (var v = 0; v < this.value.length; v++)
	      	{

	  				v == 3 ? this.radiusX[v] * 2 * Math.PI : this.circumference[v] =  Math.PI*(3*(this.radiusX[v]+this.radiusY[v])-Math.sqrt((3*this.radiusX[v]+this.radiusY[v])*(this.radiusX[v]+3*this.radiusY[v])));
	  			}


  			break;

  		}

  			

  		default :{

  			break;
  		}

  	}



  	
 

  }




  private progress(){
  	debugger;
  	let progress ;
  	for (var v = 0; v < this.value.length; v++)
      {
  		progress = this.value[v] / 100;
  		v == 1 ? this.dashoffset[v] = (this.circumference[v] * progress ): this.dashoffset[v] = (this.circumference[v] * (1 - progress));
  		
      }

    

    


  }

}  








