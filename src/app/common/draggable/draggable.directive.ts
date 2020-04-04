import { Directive, EventEmitter, AfterContentInit, HostBinding, HostListener, ContentChild, Output, ElementRef, QueryList } from '@angular/core';
import { DraggableHandlerDirective } from './draggable-handler.directive';




@Directive({
  selector: '[appDraggable],[appDroppable]'
})
export class DraggableDirective implements AfterContentInit {
  @HostBinding('class.draggable') draggable = true;

  @ContentChild(DraggableHandlerDirective, /* TODO: add static flag */ {static: true}) draggableHandler: DraggableHandlerDirective;


  pointerId?: number;
  draggableHandlerActivated:boolean;

  // to trigger pointer-events polyfill
  @HostBinding('attr.touch-action') touchAction = 'none';

  @Output() dragStart = new EventEmitter<PointerEvent>();
  @Output() dragMove = new EventEmitter<PointerEvent>();
  @Output() dragEnd = new EventEmitter<PointerEvent>();

  @HostBinding('class.dragging') dragging = false;

  constructor(public element: ElementRef) {}

  @HostListener('pointerdown', ['$event'])
  onPointerDown(event: PointerEvent): void {
   

    // if directive drragableHandler exit as a child the the dragging is active only if click on the handler
    if(typeof this.draggableHandler != undefined && !this.draggableHandlerActivated){


      return;
    }

    
    // added after YouTube video: ignore right-click
    if (event.button !== 0) {
      return;
    }

    this.pointerId = event.pointerId;

    this.dragging = true;
    this.dragStart.emit(event);
  }

  @HostListener('document:pointermove', ['$event'])
  onPointerMove(event: PointerEvent): void {
    if (!this.dragging || event.pointerId !== this.pointerId) {
      return;
    }

    this.dragMove.emit(event);
  }

  // added after YouTube video: pointercancel
  @HostListener('document:pointercancel', ['$event'])
  @HostListener('document:pointerup', ['$event'])
  onPointerUp(event: PointerEvent): void {

 

    if (!this.dragging || event.pointerId !== this.pointerId) {
      return;
    }

    this.dragging = false;
    this.draggableHandlerActivated= false;
    this.dragEnd.emit(event);
  }

  ngAfterContentInit(): void {
    
    this.draggableHandlerActivated = false;


      if (typeof this.draggableHandler != undefined)
      {

        this.draggableHandler.dragHelperClickStart.subscribe(event=> this.draggableHandlerActivated = true)
        //this.draggableHandler.dragHelperClickEnd.subscribe(event=> this.draggableHandlerActivated = false)
      // draggableHandler.onPointerDown.subscribe(event => this.onPointerDown(event));
      // draggableHandler.onPointerUp.subscribe(event => this.onPointerUp(event));


      }


   


   }
}
