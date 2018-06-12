import Round from './round.model';



class session {
    _id:string;
    description:string;
    plannedDate: Date;
    executionDate :Date;
    Status: string;
    attendees : [string];
    round :[Round];
    deleted:boolean;
    executed:boolean;




    constructor(){

    this.description="";
    this.plannedDate= new Date();
    this.executionDate = new Date();
    this.Status= "new";
    this.attendees = [""];
    this.round = [new Round()];
    this.deleted=false;
    this.executed=false;

    	


    }



}

export default session;