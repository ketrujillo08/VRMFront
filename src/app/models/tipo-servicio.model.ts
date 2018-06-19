import { Empresa } from "./empresa.model";

export class TipoServicio{
    constructor(
        public servicio:string,
        public empresa?:Empresa,
        public activo?:boolean,
        public _id?:string
    ){

    }
}