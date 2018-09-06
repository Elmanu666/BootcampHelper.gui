import { Component, OnInit, HostListener, ElementRef, Input } from '@angular/core';
import { AnimationEvent } from '@angular/animations';
import { MenuBlocksAnimations } from './menuBlocks.animations';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'menu-blocks',
  template: `
  <div (click)="goTo()" >
    <div class="still" 
        *ngIf="state=='out'" 
        [@still]="state" >
      <ng-content select="[still]"></ng-content>
    </div>
    
    <div class="overlay" 
        *ngIf="state=='in'" 
        [@hover]="state" 
        (@hover.done)="onDone($event)">
      <ng-content select="[overlay]"></ng-content>
    </div>
    </div>`,
  styleUrls: ['./menuBlocks.component.scss'],
  animations: MenuBlocksAnimations,
})
export class MenuBlocksComponent implements OnInit {

  state;

  constructor(
    private router:Router
    ){



  }

  ngOnInit(){
    this.state='out';
    

  }
  @Input() link: string ;
  @HostListener('mouseenter', ['$event'])
  @HostListener('mouseleave', ['$event'])
  onHover(event: MouseEvent){
    this.state = event.type === 'mouseenter' ? 'in' : 'out';


  }

    

  // @HostListener('mouseenter', ['$event'])
  // @HostListener('mouseleave', ['$event'])
  // onHover(event: MouseEvent) {
  //   const direction = event.type === 'mouseenter' ? 'in' : 'out';
  //   const host = event.target as HTMLElement;
  //   const w = host.offsetWidth;
  //   const h = host.offsetHeight;

  //   const x = (event.pageX - host.offsetLeft - (w / 2)) * (w > h ? (h / w) : 1);
  //   const y = (event.pageY - host.offsetTop - (h / 2)) * (h > w ? (w / h) : 1);
  //   const states = ['top', 'right', 'bottom', 'left'];
  //   const side = Math.round((((Math.atan2(y, x) * (180 / Math.PI)) + 180) / 90) + 3) % 4;
  //   this.state = `${direction}-${states[side]}`;
  // }

  onDone(event: AnimationEvent) {
    //this.state = event.toState.startsWith('out-') ? null : this.state;
  }

  goTo(){
  

    this.router.navigate([this.link]);

  }

}