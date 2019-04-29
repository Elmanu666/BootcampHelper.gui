import Session from './session.model';
import User from './user.model';

class CaloriesBurnt {
    _id:string;
    userId: User;
    sessionId: Session;       
    amount:number;

   






    	constructor (){


    		this.userId = new User();
    		this.sessionId = new Session();
    		this.amount = 200;



       	}


}

export default CaloriesBurnt