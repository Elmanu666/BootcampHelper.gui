class exercise {
    _id:string;
    title: string;
    description: string;
    details :{ 
    	muscu : Boolean;
    	cardio : Boolean;
    	balance : Boolean;
    	warmup : Boolean;
    	bodyPart : [String]
    	};
    media : {
    	img : String;
    	video : String;
    	gif : String;

    };
    material : [String];
    hidden: Boolean;



    constructor(){

    	this.title = ""
        this.description = ""
        this.details = {muscu : false, cardio : false, balance: false, warmup: false, bodyPart : ['']}
        this.media = {img: "", video :"", gif : ""}
        this.material = [""]
        this.hidden = false


    }

}

export default exercise;