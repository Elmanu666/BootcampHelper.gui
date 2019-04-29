import { Directive, EventEmitter, HostListener, AfterViewInit,  Input, ElementRef, ComponentRef, Component } from '@angular/core';
import { OverlayRef, Overlay, OverlayPositionBuilder  } from '@angular/cdk/overlay';
import { ComponentPortal  } from '@angular/cdk/portal';
import { bchTooltipComponent } from './bch-tooltip.component';
import { FilesManagementComponent } from '../files-management/files-management/files-management.component';



@Directive({ selector: '[bchTooltip]' })
export class bchTooltipDirective {

	@Input('bchTooltipText') text = '';
	@Input('bchTooltipImg') img : boolean = false;
	@Input('bchTooltipObjectId') objectId = '';
	@Input('bchTooltipTheme') theme = '';

	@HostListener('window:resize', ['$event'])
    updateScreenSize(event?) {
 //   	this.setScreenSize();
 //   	this.updatePosition();


    }


	@HostListener('mouseenter')
	show() {
		this.rect = this.elementRef.nativeElement.getBoundingClientRect();
  	    // Create tooltip portal
	  	if (this.img = true){



		    // Attach tooltip portal to overlay
		    this.imgtooltipRef = this.overlayRef.attach(this.imgtipPortal);
		      
		    // Pass content to tooltip component instance
		    this.imgtooltipRef.instance.objectId = this.objectId;  		
		    this.imgtooltipRef.instance.display = true;
		    this.imgtooltipRef.instance.upload = false;
		 //   this.imgtooltipRef.instance.theme = 'tooltip';

	  	}

	  	else {

		    // Attach tooltip portal to overlay
		    this.tooltipRef = this.overlayRef.attach(this.tooltipPortal);
		      
		    // Pass content to tooltip component instance
		    this.tooltipRef.instance.text = this.text;

	  	}

     }

	@HostListener('mouseout')
		hide() {
  			this.overlayRef.detach();
		}

	  private overlayRef: OverlayRef;
	  private tooltipPortal;
	  private imgtipPortal;
	  private imgtooltipRef: ComponentRef<FilesManagementComponent>;
	  private tooltipRef: ComponentRef<bchTooltipComponent>;
	  private screenHeight:any;
	  private screenWidth:any;
	  private rect:any;
	  private originX; originY; overlayX; overlayY : any;

 	constructor(
	  	private overlay: Overlay,
	  	private overlayPositionBuilder: OverlayPositionBuilder,
	    private elementRef: ElementRef,


  	) 	{

  	    	this.setScreenSize();
  	    	this.getRect();

  		}


 	ngOnInit() {

	  	this.setScreenSize();
	  	this.getRect();
	  	this.createOverlay(this.setPositionStrategy());
	}


  private createOverlay(positionStrategy){
  	const size = {width : 400, height : 400,minWidth: 200, minHeight:200, maxWidth : 400, maxHeight : 400 }

    this.overlayRef = this.overlay.create({ positionStrategy });
//    this.overlayRef.addPanelClass('tooltip-img')
//   this.overlayRef.updateSize(size);

	if (this.img = true){

		this.imgtipPortal = new ComponentPortal(FilesManagementComponent);
	}

	else {
	this.tooltipPortal = new ComponentPortal(bchTooltipComponent);

	}

  }

  getRect(){
  	  	this.rect = this.elementRef.nativeElement.getBoundingClientRect();

  }

  setPositionStrategy(){
  	this.rect.x > (this.screenHeight/2) ? (this.originX = 'center', this.originY = 'top', this.overlayX = 'center', this.overlayY = 'bottom'):(this.originX = 'center', this.originY = 'bottom', this.overlayX = 'center', this.overlayY = 'top');
	const positionStrategy = this.overlayPositionBuilder
		// Create position attached to the elementRef
		.flexibleConnectedTo(this.elementRef)
		// Describe how to connect overlay to the elementRef
		// Means, attach overlay's center bottom point to the         
		// top center point of the elementRef.
		.withPositions([{
		originX: this.originX,
		originY: this.originY,
		overlayX: this.overlayX,
		overlayY: this.overlayY,
		}])
		.withViewportMargin(5)
		.withFlexibleDimensions(false);
	return positionStrategy

  }

  updatePosition(){

  		this.overlayRef.updatePositionStrategy(this.setPositionStrategy())
  		this.overlayRef.updatePosition();

  }

  setScreenSize(){
  	    this.screenHeight = window.innerHeight;
        this.screenWidth = window.innerWidth;

  }

}