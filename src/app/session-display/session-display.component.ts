import { Component, OnInit,  Input, Output } from '@angular/core';
import SessionModel from '../models/session.model';

@Component({
  selector: 'app-session-display',
  templateUrl: './session-display.component.html',
  styleUrls: ['./session-display.component.scss']
})
export class SessionDisplayComponent implements OnInit {

	errors: Array<string> =[];
	@Input() session: SessionModel  ;




  constructor() { }

  ngOnInit() {


  	console.log('session-display');
  	console.log(this.session);





  }

}
