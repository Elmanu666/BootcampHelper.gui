import {Component, OnInit} from '@angular/core';
import {MenuBlocksComponent} from '../../common/menu-blocks/menuBlocks.component';
import {MenuComponent} from '../../common/menu/menu.component';



@Component({
  selector: 'app-session-main',
  templateUrl: './session-main.component.html',
  styleUrls: ['./session-main.component.scss'],
})



export class SessionMainComponent implements OnInit {


	section:string;

	ngOnInit(){
		this.section = 'session';
	}
	

}