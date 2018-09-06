import {Component, OnInit} from '@angular/core';
import {MenuBlocksComponent} from '../common/menu-blocks/menuBlocks.component';
import {MenuComponent} from '../common/menu/menu.component';



@Component({
  selector: 'home',
  template: '<menuWithBlocks section=""></menuWithBlocks>',
})



export class HomeComponent implements OnInit {


	section:string;

	ngOnInit(){
		this.section = '';
	

	
	}
}