import { Injectable } from '@angular/core';



@Injectable()
export class MaterialTypeService {


	materialType : string[];


	constructor(
		

  ) { 


		this.materialType = ["elastic band","dumbbell", "Yoga ball","medcine ball", "TRX", "bench", "ball", "mate"];




	}


	addMaterialType(material:string){

		this.materialType.push(material)




	}

	getMaterialType(){


		return this.materialType;
	}



}


