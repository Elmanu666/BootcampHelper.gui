import { Response } from '@angular/http';
import { UserService } from '../../services/user.service';
import User from '../../models/user.model';
import { Component, OnInit} from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { PagerService } from '../../services/pages.service';
import Page from '../../models/pages.model';
import { Router, ActivatedRoute } from '@angular/router';
import { PagerComponent } from '../../common/pager/pager.component';
import { MaterialTypeService} from '../../services/materialType.service';
import { BodyPartService} from '../../services/bodyPart.service';
import { trigger, state, style, animate, transition, query, stagger } from '@angular/animations';
import { GeneralAnimations } from '../../animation/general.animations';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss'],
  animations: GeneralAnimations
})
export class UsersListComponent implements OnInit {

  constructor(
  	public toastr: ToastrService,
    private userService: UserService,
    private pagerService: PagerService,
    private router : Router,
    private route: ActivatedRoute,



  	) {
          pagerService.currentPage$.subscribe(
              page => {
                this.currentPage = page;
                this.start= (page-1)*this.nbDisplayItems;
                this.usersListSliced= this.usersListFiltered.slice(this.start, this.start+this.nbDisplayItems);
                }
              )
      }

   public path:string;
   public nbDisplayItems:number;
   public currentPage:number;
   public usersList:User[]; 
   public usersListFiltered:User[]; 
   public usersListSliced:User[];
   public start:number;
   public pagesInfo:Page = new Page();




  ngOnInit() {

    this.path = this.route.snapshot.routeConfig.path



    this.start=0;
    this.nbDisplayItems=10;
    this.currentPage = 1;


    this.userService.getUsers()
      .subscribe(users => {
        this.usersList = users;
        this.usersListFiltered = users;
        this.usersListSliced =  this.usersList.slice(this.start, this.start+this.nbDisplayItems);
        let totalPages = Math.ceil(users.length /this.nbDisplayItems);
        this.pagerService.setPager(totalPages, 1 , this.nbDisplayItems);
        this.pagesInfo.totalPages = totalPages;
        this.pagesInfo.currentPage = 1;
        this.pagesInfo.pageSize = this.nbDisplayItems;




      })


  }

  jumpToUser(id){


        this.path=="edit" ? this.router.navigate(['user/edit/'+id]) : this.router.navigate(['user/detail/'+id]);

  }



}
