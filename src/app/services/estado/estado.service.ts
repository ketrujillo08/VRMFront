import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import swal from 'sweetalert2';
import { Estado } from '../../models/estado.model';

@Injectable()
export class EstadoService {

  constructor(public _http:HttpClient) { }

  cargarEstado(id:string){
    let url = URL_SERVICIOS + '/estado/' + id;
    return this._http.get(url)
    .catch(err=>{
      swal("Error en consulta","No se logro encontrar el estado de servicio","error");
      throw err;
    });
  }

  guardarEstado(estado:Estado){
    let url = URL_SERVICIOS + '/estado';
    if(estado._id!=="nuevo"){
      url += '/' + estado._id ;
      return this._http.put(url,estado)
      .catch(err=>{
        swal("Error en consulta","No se logro encontrar el estado de servicio","error");
        throw err;
      });

    }else{
      url+='?token=' + localStorage.getItem('token');
      return this._http.post(url,estado)
      .catch(err=>{
        swal("Error en consulta","No se logro guardar el estado","error");
        throw err;
      });

    }
  }

  eliminarEstado(id:string){
    let url = URL_SERVICIOS + "/estado/" + id ;
    return this._http.delete(url)
    .catch(err=>{
      swal("Error Interno","No se pudo eliminar el estado de servicio","error");
      throw err;
    });
  }

}
