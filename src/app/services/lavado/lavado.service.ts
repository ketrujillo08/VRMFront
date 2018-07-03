import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import swal from 'sweetalert2';
import { Lavado } from '../../models/lavado.model';
import { Router } from '@angular/router';

@Injectable()
export class LavadoService {

  constructor(public _http:HttpClient,public _router:Router) { }


  getTiposervicios(empresa:string){
    let url = URL_SERVICIOS + '/tipoServicio/?empresa='+empresa;

    return this._http.get(url)
    .catch((e)=>{
      swal('error',e.error.mensaje,'error');
      throw e;
    }); 
  }
  getEstadosServicio(empresa:string){
    let url = URL_SERVICIOS + '/estado/?empresa='+empresa;

    return this._http.get(url)
    .catch((e)=>{
      swal('error',e.error.mensaje,'error');
      throw e;
    }); 
  }
  getEmpleados(empresa:string){
    let url = URL_SERVICIOS + '/usuario/?empresa='+empresa;

    return this._http.get(url)
    .catch((e)=>{
      swal('error',e.error.mensaje,'error');
      throw e;
    }); 
  }
  guardarLavado(lavado:Lavado){
    if(lavado._id){
      let url = URL_SERVICIOS + '/lavado/'+lavado._id+'?token=' + localStorage.getItem('token');
      return this._http.put(url,lavado)
      .catch(e=>{
        swal('error',e.error.mensaje,'error');
        throw e;
      });

    }else{
      let url = URL_SERVICIOS + '/lavado?token=' + localStorage.getItem('token');
      return this._http.post(url,lavado)
      .catch(e=>{
        swal('error',e.error.mensaje,'error');
        throw e;
      });

    }
    
  }
  getLavado(id:string){
    let url = URL_SERVICIOS + '/lavado/' + id;
    return this._http.get(url)
    .map((res:any)=>{
      let date = new Date(res.lavado.fecha);
      res.lavado.date = date.getHours();
      return res;
    })
    .catch(e=>{
      swal('error',e.error.mensaje,'error');
      throw e;
    });
  }

}
