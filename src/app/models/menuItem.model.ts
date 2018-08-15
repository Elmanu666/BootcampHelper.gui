class menuItem {


  title: string;
  section: string;
  link: string;
  icon:string;
  detail:string;
  size:number;
  line:number;
  color:string;
  ico:string;
  state:string


    constructor(){

    this.title= "";
    this.link= "";
    this.icon="";
    this.detail="";
    this.size=0;
    this.line=0;
    this.color="";
    this.ico="";
    this.state="inactive"


    }

}

export default menuItem;