import MenuItem from '../models/menuItem.model';


import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';



@Injectable()
export class MenuService {


    menuItems : Array<MenuItem>;
    menuSelected : Array<MenuItem>;



    constructor() { 


        this.menuItems = [  
              {'title':'Edit', 'section':'session', 'link':'edit', 'icon': null, 'detail': 'blabla', 'size':2, 'line':0, 'color':'blue', 'ico':'fas fa-dumbbell', 'state': 'inactive'},
              {'title':'List', 'section':'session','link':'list', 'icon': null, 'detail': 'blabla', 'size':2, 'line':0, 'color': 'grey', 'ico':'far fa-list-alt', 'state': 'inactive'},
              {'title':'View','section':'session', 'link':'view', 'icon': null, 'detail': 'blabla', 'size':1,  'line':1, 'color': 'blue','ico':'far fa-eye', 'state': 'inactive'},
              {'title':'Run','section':'session', 'link':'run', 'icon': null, 'detail': 'blabla', 'size':2, 'line':1, 'color': 'blue','ico':'fas fa-dumbbell', 'state': 'inactive'},
              {'title':'Create', 'section':'session' , 'link':'create', 'icon': null, 'detail': 'blabla', 'size':1, 'line':1, 'color': 'blue','ico':'far fa-plus-square', 'state': 'inactive'},
              {'title':'Edit', 'section':'exercise', 'link':'edit', 'icon': null, 'detail': 'blabla', 'size':2, 'line':0, 'color':'blue', 'ico':'fas fa-dumbbell', 'state': 'inactive'},
              {'title':'List', 'section':'exercise','link':'list', 'icon': null, 'detail': 'blabla', 'size':2, 'line':0, 'color': 'grey', 'ico':'far fa-list-alt', 'state': 'inactive'},
              {'title':'View','section':'exercise', 'link':'detail', 'icon': null, 'detail': 'blabla', 'size':2,  'line':1, 'color': 'blue','ico':'far fa-eye', 'state': 'inactive'},
              {'title':'Create', 'section':'exercise' , 'link':'create', 'icon': null, 'detail': 'blabla', 'size':2, 'line':1, 'color': 'grey','ico':'far fa-plus-square', 'state': 'inactive'},
              {'title':'Edit', 'section':'material', 'link':'edit', 'icon': null, 'detail': 'blabla', 'size':2, 'line':0, 'color':'blue', 'ico':'fas fa-dumbbell', 'state': 'inactive'},
              {'title':'List', 'section':'material','link':'list', 'icon': null, 'detail': 'blabla', 'size':2, 'line':0, 'color': 'grey', 'ico':'far fa-list-alt', 'state': 'inactive'},
              {'title':'View','section':'material', 'link':'detail', 'icon': null, 'detail': 'blabla', 'size':2,  'line':1, 'color': 'blue','ico':'far fa-eye', 'state': 'inactive'},
              {'title':'Create', 'section':'material' , 'link':'create', 'icon': null, 'detail': 'blabla', 'size':2, 'line':1, 'color': 'grey','ico':'far fa-plus-square', 'state': 'inactive'},
              {'title':'Exercise','section':'', 'link':'exercise', 'icon': null, 'detail': 'blabla', 'size':2,  'line':0, 'color': 'blue','ico':'fas fa-dumbbell', 'state': 'inactive'},
              {'title':'Session', 'section':'' , 'link':'session', 'icon': null, 'detail': 'blabla', 'size':2, 'line':0, 'color': 'grey','ico':'fas fa-globe', 'state': 'inactive'},
              {'title':'Material','section':'', 'link':'material', 'icon': null, 'detail': 'blabla', 'size':2,  'line':1, 'color': 'grey','ico':'fas fa-warehouse', 'state': 'inactive'},
              {'title':'User', 'section':'' , 'link':'user', 'icon': null, 'detail': 'blabla', 'size':2, 'line':1, 'color': 'blue','ico':'fas fa-users', 'state': 'inactive'},
          
          ]

       }

    getMenuItems(section:string){



        this.menuSelected = new Array();

        for (var j=0; j< this.menuItems.length; j++){

          this.menuItems[j].section == section ? ( this.menuSelected.length >0 ? this.menuSelected.push(this.menuItems[j]): this.menuSelected[0]=this.menuItems[j] ): console.log(this.menuItems[j].section);

        }

        return this.menuSelected

    }
   
}