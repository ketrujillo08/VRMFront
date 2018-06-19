import { Empresa } from "./empresa.model";

export class Estado{
    constructor(
        public estado:string,
        public empresa?:Empresa,
        public activo?:boolean,
        public _id?:string
    ){

    }
}