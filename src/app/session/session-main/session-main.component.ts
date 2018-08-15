import {Component, OnInit} from '@angular/core';
import {MenuBlocksComponent} from '../../common/menu-blocks/menuBlocks.component';



@Component({
  selector: 'app-session-main',
  template: '<menuWithBlocks section="{{section}}"></menuWithBlocks>',
  styleUrls: ['./session-main.component.scss'],
})



export class SessionMainComponent implements OnInit {


	menu : Array<{'title': string, 'link': string, 'icon':string, 'detail':string, 'size':number, 'line':number, 'color':string, 'ico':string, 'state':string}>;


	ngOnInit(){
		this.section = 'session';
	

}