import {Component, OnInit} from '@angular/core';
import {MenuBlocksComponent} from '../../common/menu-blocks/menuBlocks.component';
import {MenuComponent} from '../../common/menu/menu.component';



@Component({
  selector: 'app-session-main',
  template: '<menuWithBlocks section="exercise"></menuWithBlocks>',
})



export class ExerciseMainComponent implements OnInit {


	section:string;

		ngOnInit(){
			this.section = 'exercise';
		

		}
}