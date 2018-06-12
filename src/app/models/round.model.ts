import Exercise from './exercise.model';



class round {


		title : string;
    	exercisesNumber : number;
    	drillsDuration : number;
    	restDuration : number;
        repeat:number;
    	exercices : [Exercise];


    	constructor (){


    		this.title = "A modifer";
    		this.exercisesNumber = 1;
    		this.drillsDuration = 50;
    		this.restDuration = 10;
    		this.repeat=3;
    		this.exercices = [new Exercise()];


       	}


}

export default round