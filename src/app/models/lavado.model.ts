export class Lavado{
    constructor(
        public carro:string,
        public cliente:string,
        public servicio:string,
        public empresa:string,
        public creador:string,
        public lluvia?:boolean,
        public tapete?:boolean,
        public aroma?:boolean,
        public lavador?:string,
        public fecha?:string,
        public hora?:string,
        public estado?:string,
        public precio?:number,
        public _id?:string
    ){

    }
}