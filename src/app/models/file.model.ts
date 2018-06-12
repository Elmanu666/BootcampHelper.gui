class file {
       _id:string;
      mimeType: String;
      originalname: String;
      FileName: String;
    FileSize : Number ;
    ImagePath : String;
    ThumbPath : String;
    exerciseId: String;
    type: String;



    constructor(){

          this.mimeType = "";
          this.originalname = "";
          this.FileName = "";
          this.FileSize = 0;
          this.ImagePath = "";
          this.ThumbPath = "";
          this.exerciseId = "";
          this.type = "";


    }

}

export default file;