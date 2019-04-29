import Exercise from './exercise.model';
import User from './user.model';



class round {


		title : string;
        type : string;
    	exercisesNumber : number;
    	drillsDuration : number;
    	restDuration : number;
        repeat:number;
        exercisesId : Exercise[];
        exercisesAlternatives : {'usersId': User[], 'exercisesAltId': Exercise[]}[];
        exercisesMainUser : User[];
    	


    	constructor (){


    		this.title = "A modifier";
            this.type = "";
    		this.exercisesNumber = 1;
    		this.drillsDuration = 50;
    		this.restDuration = 10;
    		this.repeat=3;
    		this.exercisesId = [new Exercise()];
            this.exercisesAlternatives = new Array();

       	}


}

export default round