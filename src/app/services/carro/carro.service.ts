import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { URL_SERVICIOS } from '../../config/config';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import swal from 'sweetalert2';
import { Carro } from '../../models/carro.model';

@Injectable()
export class CarroService {


  constructor(public _http:HttpClient) { }

  cargarCarro(id:string){

    let url = URL_SERVICIOS + '/carro/' + id;

    return this._http.get(url)
    .catch((error)=>{
      swal("Error interno","No se encontro el vehículo","error");
      throw error;
    });

  }
  getClientes(rol :string){
    let url = URL_SERVICIOS + '/usuario?rol='+rol;
    return this._http.get(url)
    .catch(e=>{
      swal("Error interno","No se encontraron clientes","error");
      throw e;
    });

  }
  guardarCarro(carro:Carro,token:string){
    let url = URL_SERVICIOS + '/carro';

    if(carro._id){
      url = url + "/" + carro._id + "?token="+token;
      return this._http.put(url,carro)
      .catch((error)=>{
        swal("Error interno","No se encontro el vehículo","error");
        throw error;
      });

    }else{
      url = url + "/" + "?token="+token;
      return this._http.post(url,carro)
      .catch((error)=>{
        swal("Error interno","No se encontro el vehículo","error");
        throw error;
      });

    }

  }

  eliminarCarro(id:string){
    let url = URL_SERVICIOS + '/' + id;
    return this._http.delete(url)
    .catch((error)=>{
      swal("Error interno","No se encontro el vehículo","error");
      throw error;
    });
  }

}
