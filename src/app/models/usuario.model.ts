import { Empresa } from "./empresa.model";

export class Usuario{
    constructor(
        public nombre:string,
        public apellido:string,
        public correo:string,
        public password:string,
        public rol?:string,
        public fecha?:Date,
        public activo?:Number,
        public google?:boolean,
        public facebook?:boolean,
        public empresa?:Empresa,
        public _id?:string

    ){

    }
}