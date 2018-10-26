import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DraggableDirective } from './draggable.directive';
import { MovableDirective } from './movable.directive';
import { MovableAreaDirective } from './movable-area.directive';
import { DraggableHelperDirective } from  './draggable-helper.directive';
import { OverlayModule } from '@angular/cdk/overlay';
import { SortableDirective } from './sortable.directive';
import { SortableListDirective } from './sortable-list.directive';
import { DropzoneDirective } from "./dropzone.directive";
import { DroppableDirective } from "./droppable.directive";
import { DroppableService } from './droppable.service';
import { DraggableHandlerDirective } from './draggable-handler.directive';

@NgModule({
  imports: [
    CommonModule,
    OverlayModule
  ],
  declarations: [
    DraggableHandlerDirective,
  	DraggableDirective, 
  	MovableDirective, 
  	MovableAreaDirective, 
  	DraggableHelperDirective, 
  	SortableDirective,
    SortableListDirective,
    DropzoneDirective,
    DroppableDirective
    ],
  exports: [
    DraggableHandlerDirective,
  	DraggableDirective, 
  	MovableDirective, 
  	MovableAreaDirective, 
  	DraggableHelperDirective,
    SortableListDirective,
    SortableDirective,
    DropzoneDirective,
    DroppableDirective,
    ],
  providers :[
  	DroppableService
  	]  
})
export class DraggableModule { }
