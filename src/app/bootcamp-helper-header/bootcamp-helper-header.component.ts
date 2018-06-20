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
  	menuAdmin.link=[{'name':'home', 'adress':''}];
  	menuAdmin.link.push({'name':'Exercises', 'adress':'exercises'});


  	var menuGuest:menu = new menu();

  	menuGuest.type='guest';
  	menuGuest.link=[{'name':'home', 'adress':''}]
    menuGuest.link.push({'name':'exercises', 'adress':'exercises'}); 
    menuGuest.link.push({'name':'sessions', 'adress':'sessions'}); 
    menuGuest.link.push({'name':'sessions list', 'adress':'sessions-list'}); 
    
  	if(this.auth.isSignedIn()){

  		this.menuApp =menuAdmin;



  	}

  	else {

  		this.menuApp=menuGuest;



  	}

  	




  }

}
