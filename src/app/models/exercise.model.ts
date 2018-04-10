class exercise {
    _id:string;
    title: string;
    description: string;
    type :{ 
    	muscu : Boolean;
    	cardio : Boolean;
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
        this.type = {muscu : false, cardio : false, bodyPart : ['']}
        // this.type.muscu = false
        // this.type.cardio = false
        // this.type.bodyPart = [""]
        this.media = {img: "", video :"", gif : ""}
        // this.media.img = ""
        // this.media.video = ""
        // this.media.gif = ""
        this.material = [""]
        this.hidden = false


    }

}

export default exercise;