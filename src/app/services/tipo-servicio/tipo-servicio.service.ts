import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import swal from 'sweetalert2';
import { TipoServicio } from '../../models/tipo-servicio.model';

@Injectable()
export class TipoServicioService {

  constructor(public _http:HttpClient) { }

  cargarTipoServicio(id:string){

    let url = URL_SERVICIOS + '/tipoServicio/' + id;

    return this._http.get(url)
    .catch(err=>{
      swal("Error en consulta","No se logro encontrar el Servicio","error");
      throw err;
    });
  }

  guardarTipoServicio(tipoServicio:TipoServicio){
    let url = URL_SERVICIOS + '/tipoServicio';
    if(tipoServicio._id!=="nuevo"){
      url += '/' + tipoServicio._id;
      return this._http.put(url,tipoServicio)
      .catch(err=>{
        swal("Error en consulta","No se logro encontrar el Servicio","error");
        throw err;
      });

    }else{
      return this._http.post(url,tipoServicio)
      .catch(err=>{
        swal("Error en consulta","No se logro guardar el servicio","error");
        throw err;
      });

    }
  }

  eliminarTipoServicio(id:string){
    let url = URL_SERVICIOS + "/tipoServicio/" + id;
    return this._http.delete(id)
    .catch(err=>{
      swal("Error Interno","No se pudo eliminar el servicio","error");
      throw err;
    });
  }

}
