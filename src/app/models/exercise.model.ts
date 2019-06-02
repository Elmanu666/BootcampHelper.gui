import Material from './material.model';
import Sport from './sport.model';
import MaterialType from './materialType.model';




class exercise {
    _id:string;
    title: string;
    description: string;
    details :{ 
    	muscu : Boolean;
    	cardio : Boolean;
    	balance : Boolean;
    	warmup : Boolean;
    	bodyPart : String[]
    	};
    media : {
    	img : String;
    	video : String;
    	gif : String;

    };
    material : Material[];
    materialType : MaterialType[];
    sports : Sport[]
    hidden: Boolean;



    constructor(){

    	this.title = ""
        this.description = ""
        this.details = {muscu : false, cardio : false, balance: false, warmup: false, bodyPart : ['']}
        this.media = {img: "", video :"", gif : ""}
        this.material = new Array()
        this.materialType = new Array()
        this.sports = new Array()
        this.hidden = false


    }

}

export default exercise;