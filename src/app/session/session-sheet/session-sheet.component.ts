import { Component, OnInit,  Input, Output } from '@angular/core';
import SessionModel from '../../models/session.model';
import { NgbModal, NgbActiveModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { SessionService } from '../../services/session.service';
import { RoundComponent } from '../../round/round.component';


@Component({
  selector: 'app-session-sheet',
  templateUrl: './session-sheet.component.html',
  styleUrls: ['./session-sheet.component.scss']
})
export class SessionSheetComponent implements OnInit {


	@Input() idSession: SessionModel['_id']  ;
  @Input() session : SessionModel;
  @Input() roundId : number;
  @Input()  vertical : boolean ;
  @Input()  resume : boolean ;

  public loaded : boolean ;
  private duration : Date;
  public duration2display : String;
  public nbExercise : number;

   closeResult: string;




  constructor(
    private sessionService: SessionService,
    private modalService: NgbModal,
    ) { }

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

  editRound(id) {
    const modalRef = this.modalService.open(RoundComponent);
    modalRef.componentInstance.roundId = id;
    modalRef.componentInstance.editable = true;
    modalRef.result.then((usersAdded) => {
      if (usersAdded) {
//        this.roundId.emit(usersAdded);
      }
    });
   }

  open(content) {
    this.modalService.open(content, { size: 'xl' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      console.log(this.closeResult);
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }

}


