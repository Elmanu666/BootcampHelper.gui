import { Component, OnInit, HostListener, ElementRef, Input } from '@angular/core';
import { AnimationEvent } from '@angular/animations';
import { MenuAnimations } from './menu.animations';
import { ActivatedRoute, Router } from '@angular/router';
import menuItem from '../../models/menuItem.model';
import { MenuService } from '../../services/menu.service';



@Component({
  // tslint:disable-next-line:component-selector
  selector: 'menuWithBlocks',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
  animations: MenuAnimations,
})
export class MenuComponent implements OnInit {


  menuList: Array<menuItem>;
  menuByLine1: Array<menuItem>;
  menuByLine2: Array<menuItem>;

  @Input() section : string;  


  constructor(
    //Private todoservice will be injected into the component by Angular Dependency Injector
    public MenuService: MenuService, 


  ) { 
    }

    ngOnInit(){

    //   this.menuList=[
    //   {'title':'Edit', 'section':'session', 'link':'edit', 'icon': null, 'detail': 'blabla', 'size':2, 'line':0, 'color':'blue', 'ico':'fas fa-dumbbell', 'state': 'inactive'},
    //   {'title':'List', 'section':'session','link':'list', 'icon': null, 'detail': 'blabla', 'size':2, 'line':0, 'color': 'grey', 'ico':'far fa-list-alt', 'state': 'inactive'},
    //   {'title':'View','section':'session', 'link':'view', 'icon': null, 'detail': 'blabla', 'size':1,  'line':1, 'color': 'blue','ico':'far fa-eye', 'state': 'inactive'},
    //   {'title':'Run','section':'session', 'link':'run', 'icon': null, 'detail': 'blabla', 'size':2, 'line':1, 'color': 'blue','ico':'fas fa-dumbbell', 'state': 'inactive'},
    //   {'title':'Create', 'section':'session' , 'link':'create', 'icon': null, 'detail': 'blabla', 'size':1, 'line':1, 'color': 'blue','ico':'far fa-plus-square', 'state': 'inactive'},


    // ];

    this.menuList = this.MenuService.getMenuItems(this.section);


    console.log('menulist :');
    console.log(this.menuList);



    
    this.menuByLine1 = new Array();
    this.menuByLine2 = new Array();

    for (var j=0; j< this.menuList.length; j++){

      this.menuList[j].line === 0 && this.menuList[j].section == this.section ? ( this.menuByLine1.length >0 ? this.menuByLine1.push(this.menuList[j]): this.menuByLine1[0]=this.menuList[j] ): console.log(this.menuList[j].section);

    }

    for (var j=0; j< this.menuList.length; j++){

      this.menuList[j].line === 1 && this.menuList[j].section == this.section  ? ( this.menuByLine2.length >0 ? this.menuByLine2.push(this.menuList[j]): this.menuByLine2[0]=this.menuList[j] ): '';

    }











    }




  }

