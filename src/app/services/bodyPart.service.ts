import { Injectable } from '@angular/core';



@Injectable()
export class BodyPartService {


	bodyPart : string[];


	constructor(
		

  ) { 


		this.bodyPart = ["Abs", "Biceps", "Triceps", "Glutes", "Legs", "Shoulders", "Oblics", "Chest (middle)", "Chest (high)", "Chest (low)" ];;




	}


	addBodyPart(material:string){

		this.bodyPart.push(material)




	}

	getBodyPart(){


		return this.bodyPart;
	}



}


