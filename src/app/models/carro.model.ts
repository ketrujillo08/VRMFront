import { Usuario } from "./usuario.model";

export class Carro{
    constructor(
        public modelo:string,
        public anio:number,
        public placas:string,
        public color:string,
        public usuario?:Usuario,
        public creador?:Usuario,
        public comentarios?:string,
        public _id?:string
    ){

    }
}