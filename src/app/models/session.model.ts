import Round from './round.model';
import User from './user.model';



class session {
    _id:string;
    description:string;
    plannedDate: Date;
    executionDate :Date;
    executionStart :Date;
    executionEnd :Date;
    Status: string;
    attendees : User[];
    round :Round[];
    caloriesBurntId: [{'users' : string, 'calories' : number}]
    deleted:boolean;
    executed:boolean;




    constructor(){

    this.description="";
    this.plannedDate= new Date();
    this.executionDate = new Date();
    this.Status= "new";
    this.attendees = [new User()];
    this.round = [new Round()];
    this.deleted=false;
    this.executed=false;

    	


    }



}

export default session;