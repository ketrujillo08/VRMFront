export class Lavado{
    constructor(
        public carro:string,
        public cliente:string,
        public servicio:string,
        public empresa:string,
        public creador:string,
        public fecha:Date,
        public estado:string,
        public lluva:boolean,
        public tapete:boolean,
        public aroma:boolean,
        public precio:number,
        public _id:string
    ){

    }
}