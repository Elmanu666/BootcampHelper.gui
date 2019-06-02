import MaterialType from './materialType.model';




class material {
    _id: string;
     title: string;
    description: string;
    weigth : Number;
    length : Number;
    size : string;
    strength : string;
    type: MaterialType;
    quantity: Number;


    constructor(){

          this.title = "";
          this.description = "";
          this.weigth = 0;
          this.length = 0;
          this.size = '';
          this.strength = "";
          this.type = new MaterialType();
          this.quantity = 0;


    }

}

export default material;