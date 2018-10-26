import { AfterContentInit, ElementRef, ContentChildren, Directive, EventEmitter, Output, QueryList } from '@angular/core';
import { SortableDirective } from './sortable.directive';
import { DroppableDirective } from './droppable.directive';

export interface SortEvent {
  currentIndex: number;
  newIndex: number;
}

const distance = (rectA: ClientRect, rectB: ClientRect): number => {
  return Math.sqrt(
    Math.pow(rectB.top - rectA.top, 2) +
    Math.pow(rectB.left - rectA.left, 2)
  )
};

const hCenter = (rect: ClientRect): number => {
  return rect.left + rect.width / 2;
};

const vCenter = (rect: ClientRect): number => {
  return rect.top + rect.height / 2;
};

@Directive({
  selector: '[appSortableList]'
})
export class SortableListDirective implements AfterContentInit {
  @ContentChildren(SortableDirective) sortables: QueryList<SortableDirective>;
  //  @ContentChildren(DroppableDirective) dropables: QueryList<DroppableDirective>;

  @Output() sort = new EventEmitter<SortEvent>();

  private sortablesOld : QueryList<ElementRef>;

  private clientRects: ClientRect[];



  ngAfterContentInit(): void {

    

    //this.sortableItemsNumber = this.sortables.length;

    this.updateSortablesOld();
    //this.sortables_old = this.sortables;

    this.sortables.changes.subscribe(() => {
      this.addSortables();

    })
    this.sortables.forEach(sortable => {
      sortable.dragStart.subscribe(() => this.measureClientRects());
      sortable.dragMove.subscribe(event => this.detectSorting(sortable, event));
    });
  }

  private addSortables() {

    // var j = 0;

    

    //  this.sortables.forEach(sortable => {
    //    if(i<)
    //   sortable.dragStart.subscribe(() => this.measureClientRects());
    //   sortable.dragMove.subscribe(event => this.detectSorting(sortable, event));
    // });


    //  this.sortables.forEach(sortable => {
    //   sortable.dragStart.subscribe(() => this.measureClientRects());
    //   sortable.dragMove.subscribe(event => this.detectSorting(sortable, event));
    // });

    // var sortable = this.sortables.last;
    var sortable = this.sortables.filter(srt => {
      
      var t = true;
        this.sortablesOld.forEach(sortableOld =>{
          if (sortableOld.element.nativeElement === srt.element.nativeElement){

           t = false;

          }
          else {

            t == true ? t = true : t= false;
            
          }



        })
        return t;

    });

        sortable.forEach(sortable => {

            sortable.dragStart.subscribe(() => this.measureClientRects());
            sortable.dragMove.subscribe(event => this.detectSorting(sortable, event));
          })
  }

  private updateSortablesOld(){

    this.sortablesOld = this.sortables.map(rslt => rslt)


  }

  private measureClientRects() {
    this.clientRects = this.sortables.map(sortable => sortable.element.nativeElement.getBoundingClientRect());
  }

  private detectSorting(sortable: SortableDirective, event: PointerEvent) {
    const currentIndex = this.sortables.toArray().indexOf(sortable);
    const currentRect = this.clientRects[currentIndex];

    this.clientRects
      .slice()
      .sort((rectA, rectB) => distance(rectA, currentRect) - distance(rectB, currentRect))
      .filter(rect => rect !== currentRect)
      .some(rect => {
        const isHorizontal = rect.top === currentRect.top;
        const isBefore = isHorizontal ?
          rect.left < currentRect.left :
          rect.top < currentRect.top;

        // refactored this part a little bit after my Youtube video
        // for improving readability
        const moveBack = isBefore && (isHorizontal ?
          event.clientX < hCenter(rect) :
          event.clientY < vCenter(rect)
        );

        const moveForward = !isBefore && (isHorizontal ?
          event.clientX > hCenter(rect) :
          event.clientY > vCenter(rect)
        );

        if (moveBack || moveForward) {
          this.sort.emit({
            currentIndex: currentIndex,
            newIndex: this.clientRects.indexOf(rect)
          });

          return true;
        }

        return false;
      });
  }
}
