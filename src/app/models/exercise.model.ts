class exercise {
    _id:string;
    title: string;
    description: string;
    type :{ 
    	muscu : Boolean;
    	cardio : Boolean;
    	balance : Boolean;
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
        this.type = {muscu : false, cardio : false, balance: false, bodyPart : ['']}
        this.media = {img: "", video :"", gif : ""}
        this.material = [""]
        this.hidden = false


    }

}

export default exercise;