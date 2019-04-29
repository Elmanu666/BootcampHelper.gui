import { Component, OnInit,  Input, Output } from '@angular/core';
import SessionModel from '../../models/session.model';
import { SessionService } from '../../services/session.service';

@Component({
  selector: 'app-session-sheet',
  templateUrl: './session-sheet.component.html',
  styleUrls: ['./session-sheet.component.scss']
})
export class SessionSheetComponent implements OnInit {


	@Input() idSession: SessionModel['_id']  ;
  @Input() session : SessionModel;
  @Input()  vertical : boolean ;
  @Input()  resume : boolean ;

  public loaded : boolean ;
  private duration : Date;
  public duration2display : String;
  public nbExercise : number;




  constructor(private sessionService: SessionService,) { }

  ngOnInit() {
    this.loaded = false;
    this.vertical == undefined ? this.vertical = true : '';
    this.resume == undefined ? this.resume = false : '';
    this.resume==true? this.calData():'';

    if (this.idSession != undefined){
      this.sessionService.getSession(this.idSession)
      .subscribe(session => {
        this.session = session;
        this.loaded=true;
      })
    }
    else if (this.idSession == undefined && this.session != undefined){
      this.loaded=true;
    }
  }

  calData(){
    this.calTotalDuration();
    this.calTotalExercise();
  }

  calTotalDuration(){
    let st, end, rst : any;
    st = new Date(this.session.executionStart);
    end = new Date(this.session.executionEnd);
    rst = end - st

    this.duration = new Date(rst);
    let h : string = this.duration.getUTCHours().toString().length == 2 ? this.duration.getUTCHours().toString() : "0"+this.duration.getUTCHours().toString();
    let m : string = this.duration.getUTCMinutes().toString().length == 2 ? this.duration.getUTCMinutes().toString() : "0"+this.duration.getUTCMinutes().toString();
    let s : string = this.duration.getUTCSeconds().toString().length == 2 ? this.duration.getUTCSeconds().toString() : "0"+this.duration.getUTCSeconds().toString();
    this.duration2display = h+"h"+m+"m"+s+"s";

  }

  calTotalExercise(){
    this.nbExercise = 0;
    for (var v = 0; v < this.session.round.length; v++){
      this.nbExercise += this.session.round[v].exercisesId.length;
    }


  }

}


