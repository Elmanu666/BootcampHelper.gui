import { trigger, state, style, animate, transition } from '@angular/animations';

const animateIn = '0.15s ease-in';
const animateOut = '0.25s ease-out';

const styleIdle = { transform: 'translate3d(0, 0, 0)' };
const styleTop = { transform: 'translate3d(0, -100%, 0)' };
const styleRight = { transform: 'translate3d(100%, 0, 0)' };
const styleBottom = { transform: 'translate3d(0, 100%, 0)' };
const styleLeft = { transform: 'translate3d(-100%, 0, 0)' };

export const MenuAnimations = [


  trigger('flyInOut', [
    state('in', style({transform: 'translateX(0)'})),
    transition('void => *', [
      style({transform: 'translateX(100%)'}),
      animate(1000)
    ]),
    transition('* => void', [
      animate(1000, style({transform: 'translateX(-100%)'}))
    ])
  ]),


];
