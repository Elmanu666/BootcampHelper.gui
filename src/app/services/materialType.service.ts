import { Injectable } from '@angular/core';



@Injectable()
export class MaterialTypeService {


	materialType : string[];


	constructor(
		

  ) { 


		this.materialType = ["elastic band","dumbbell", "Yoga ball","medecine ball", "bars", "weigth" , "bench", "ball", "mate", "other"];




	}


	addMaterialType(material:string){

		this.materialType.push(material)




	}

	getMaterialType(){


		return this.materialType;
	}



}


