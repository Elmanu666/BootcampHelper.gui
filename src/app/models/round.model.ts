import Exercise from './exercise.model';



class round {


		title : string;
    	exercisesNumber : number;
    	drillsDuration : number;
    	restDuration : number;
        repeat:number;
        exercices : [Exercise];
        exercisesAlternatives : [{'users': [string], 'exercises': Exercise}];
        exercisesMainUser : [string];
    	


    	constructor (){


    		this.title = "A modifer";
    		this.exercisesNumber = 1;
    		this.drillsDuration = 50;
    		this.restDuration = 10;
    		this.repeat=3;
    		this.exercices = [new Exercise()];
            this.exercisesAlternatives = new Array();
            this.exercisesAlternativesUsers = new Array();
            this.exercisesMainUser = new Array();

       	}


}

export default round