import { Component, OnInit } from '@angular/core';
import menu from '../models/menu.model';
import {authService} from '../services/auth.service';


@Component({
  selector: 'app-bootcamp-helper-header',
  templateUrl: './bootcamp-helper-header.component.html',
  styleUrls: ['./bootcamp-helper-header.component.scss']
})
export class BootcampHelperHeaderComponent implements OnInit {

	public menuApp:menu;

  constructor(    private auth: authService,
) { }

  ngOnInit() {




  	//todo : remplacer tout ça par un service

  	var menuAdmin:menu = new menu();

  	menuAdmin.type='admin';
  	menuAdmin.link=[{'name':'Home', 'adress':''}];
  	menuAdmin.link.push({'name':'Exercise', 'adress':'exercise'});


  	var menuGuest:menu = new menu();

  	menuGuest.type='guest';

    menuGuest.link.push({'name':'Exercise', 'adress':'exercise/list'}); 
    menuGuest.link.push({'name':'Session', 'adress':'session'}); 


  	if(this.auth.isSignedIn()){

  		this.menuApp =menuAdmin;



  	}

  	else {

  		this.menuApp=menuGuest;



  	}

  	




  }

}
