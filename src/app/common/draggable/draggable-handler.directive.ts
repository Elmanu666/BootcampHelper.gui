import { Directive, EventEmitter, HostListener,  Output, ElementRef  } from '@angular/core';

@Directive({
  selector: '[appDraggableHandler]'
})
export class DraggableHandlerDirective {


	@Output() dragHelperClickStart = new EventEmitter<PointerEvent>();
  	@Output() dragHelperClickMove = new EventEmitter<PointerEvent>();
  	@Output() dragHelperClickEnd = new EventEmitter<PointerEvent>();




  constructor() { }

  @HostListener('pointerdown', ['$event'])
  onPointerDown(event: PointerEvent): void {



  	 if (event.button !== 0) {
      return;
    }


    this.dragHelperClickStart.emit(event);
    
	}

  @HostListener('document:pointercancel', ['$event'])
  @HostListener('document:pointerup', ['$event'])
  onPointerUp(event: PointerEvent): void {
  	
	this.dragHelperClickEnd.emit(event);


  }		


}
