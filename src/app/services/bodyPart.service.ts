import { Injectable } from '@angular/core';



@Injectable()
export class BodyPartService {


	bodyPart : string[];


	constructor(
		

  ) { 


		this.bodyPart = ["Abs", "Biceps", "Triceps", "Glutes", "Legs", "Shoulders", "Oblics", "Chest (middle)", "Chest (high)", "Chest (low)" ];;




	}


	addBodyPart(bodyPart:string){

		this.bodyPart.push(bodyPart)




	}

	getBodyPart(){


		return this.bodyPart;
	}



}


