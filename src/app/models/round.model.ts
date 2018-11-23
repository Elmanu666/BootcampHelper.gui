import Exercise from './exercise.model';



class round {


		title : string;
    	exercisesNumber : number;
    	drillsDuration : number;
    	restDuration : number;
        repeat:number;
        exercises : Exercise[];
        exercisesAlternatives : {'users': string[], 'exercises': Exercise[]}[];
        exercisesMainUser : string[];
    	


    	constructor (){


    		this.title = "A modifier";
    		this.exercisesNumber = 1;
    		this.drillsDuration = 50;
    		this.restDuration = 10;
    		this.repeat=3;
    		this.exercises = [new Exercise()];
            this.exercisesAlternatives = new Array();
            this.exercisesMainUser = new Array();

       	}


}

export default round