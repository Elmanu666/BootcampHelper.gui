import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NgbModal, NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import { UserService } from '../../services/user.service';
import user from '../../models/user.model';
import { SessionService } from '../../services/session.service';




@Component({
  selector: 'app-session-users-selection',
  templateUrl: './session-users-selection.component.html',
  styleUrls: ['./session-users-selection.component.scss']
})
export class SessionUsersSelectionModalComponent implements OnInit {

	


	usersList : user[];
  userAdded : user[];
//	@Input() users;
  users : user[];
  newUser : string;

  constructor(     
  	public activeModal: NgbActiveModal,
  	private userService :UserService,
    private sessionService : SessionService
	) 
  { }

  
  ngOnInit() {
    this.users = this.sessionService.ProcessingSession.attendees;
    this.userAdded = [];
  	this.userService.getUsers()
    	.subscribe(users =>{
        debugger;
    		for (var j = 0; j < this.users.length; j++){
    				users = users.filter(x=>
    				!(x._id==this.users[j]._id)	
    				)

    	}
      this.usersList = users;



    	})
  }

  save(){
    console.log('on save');
    this.sessionService.addAttendeesToProcessingSession(this.userAdded);
    this.activeModal.close(this.userAdded);
  }


  addUser(event){

      const addedUser = this.usersList.filter(x=>
         x._id == this.newUser
      )
      this.removeUser2Select(addedUser[0]);
      this.addUser2list(addedUser[0]);
     

  }

  addUser2list(user){
    debugger;
     this.userAdded.push(user);

  }

  removeUser(user:user){
    this.addUser2Select(user);
    this.removeUser2List(user);

  }

  removeUser2List(user:user){
    this.userAdded = this.userAdded.filter(x=> 
      !(x._id==user._id) 
    )
  }

  removeUser2Select(user:user){
    this.usersList = this.usersList.filter(x=> 
      !(x._id== user._id)
      )
  }

  addUser2Select(user:user){
    this.usersList.push(user);
  }

}

@Component({
  selector: 'app-session-users-selection-modal',
  template: '<button  class="btn btn-lg btn-success" (click)="open(content)">Add user</button>'
})


export class SessionUsersSelectionComponent {
	@Input() users;
  @Output() newUser: EventEmitter<any> = new EventEmitter();
  	constructor(private modalService: NgbModal) {}

	open() {
	    const modalRef = this.modalService.open(SessionUsersSelectionModalComponent);
	    modalRef.componentInstance.users = this.users;
      modalRef.result.then((usersAdded) => {
        if (usersAdded) {
          this.newUser.emit(usersAdded);
        }
  	  });
   }


}




