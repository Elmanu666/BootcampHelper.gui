import { Component, OnInit,  Input, Output } from '@angular/core';
import SessionModel from '../../models/session.model';
import { SessionService } from '../../services/session.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';




@Component({
  selector: 'app-session-display',
  templateUrl: './session-display.component.html',
  styleUrls: ['./session-display.component.scss']
})
export class SessionDisplayComponent implements OnInit {

	errors: Array<string> =[];
	session: SessionModel  ;
  loaded : boolean = false;
  idSession : SessionModel['_id'];




  constructor(
          private sessionService: SessionService,
          private route: ActivatedRoute,
          private router: Router,
          private toastr : ToastrService,
          private spinner: NgxSpinnerService
          ) { }

  ngOnInit() {



      this.idSession = this.route.snapshot.paramMap.get('id');

      this.spinner.show();

      this.sessionService.getSession(this.idSession)
      .subscribe(session => {
        //assign the todolist property to the proper http response
        this.session = session;
        this.loaded = true

        this.spinner.hide();




      })




    }


    editSession(){

              this.router.navigate(['session/edit/'+this.idSession]);




    }

    deleteSession (){

      this.sessionService.deleteSession(this.idSession).subscribe(res => {
        this.toastr.success('Delete succesful', 'Success!' , {timeOut: 2000});

    })
    }





  }


