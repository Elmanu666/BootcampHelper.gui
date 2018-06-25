import { Component, OnInit,  Input, Output } from '@angular/core';
import SessionModel from '../../models/session.model';
import { SessionService } from '../../services/session.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';



@Component({
  selector: 'app-session-display',
  templateUrl: './session-display.component.html',
  styleUrls: ['./session-display.component.scss']
})
export class SessionDisplayComponent implements OnInit {

	errors: Array<string> =[];
	session: SessionModel  ;
  loaded : boolean = true;
  idSession : SessionModel['_id'];




  constructor(
          private sessionService: SessionService,
          private route: ActivatedRoute,
          private router: Router,
          private toastr : ToastrService) { }

  ngOnInit() {



      this.idSession = this.route.snapshot.paramMap.get('id');
  

      this.sessionService.getSession(this.idSession)
      .subscribe(session => {
        //assign the todolist property to the proper http response
        this.session = session;
        this.loaded = true
        console.log("on reçoit la session");
        console.log(session);




      })




    }


    editSession(session : SessionModel){

              this.router.navigate(['session/edit/'+session._id]);




    }

    deleteSession (session: SessionModel){

      this.sessionService.deleteSession(session._id).subscribe(res => {
        this.toastr.success('Delete succesful', 'Success!' , {timeOut: 2000});

    })
    }





  }

}
