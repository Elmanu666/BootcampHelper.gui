class event {
    _id:string;
    startDate: Date;
    endDate: Date;
    type: string;
    title : string ;
    primaryColor : string;
    secondaryColor : string;
    actions: {'labels':string, 'actions' :string }[];
    allday:boolean;
    resizable: {'before':boolean, 'after':boolean};
    draggable :boolean;
    link: string;
    



    constructor(){

          this.startDate = new Date();
          this.endDate = new Date(); 
          this.endDate.setTime(this.startDate.getTime() + (60*60*1000)) ;
          this.type = "Session";
          this.title = "";
          this.primaryColor = "";
          this.secondaryColor = "";
          this.actions = [{'labels':'<i class=\"fa fa-fw fa-pencil\"></i>', 'actions' :'edit' },
                          {'labels':'<i class=\"fa fa-fw fa-pencil\"></i>', 'actions' :'edit' }
          ];
          this.allday = false;
          this.resizable = {'before':false, 'after':false};
          this.draggable = false;
          this.link='';


    }

}

export default event;