class user {
    _id:string;
    username: string;
    password: string;       
    name:string;
    familyName:string;   
    dateOfBirth:Date;    
    sex:string;       
    weigth:number;  
    height:number;
   






    	constructor (){


    		this.username = "A modifer";
    		this.password = '';
    		this.name = '';
    		this.familyName = '';
    		this.dateOfBirth= new Date();
    		this.sex = '';
            this.weigth = 0;
            this.height = 0;


       	}


}

export default user