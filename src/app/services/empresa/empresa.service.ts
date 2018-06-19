import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Empresa } from '../../models/empresa.model';
import { URL_SERVICIOS } from '../../config/config';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import swal from 'sweetalert2';

@Injectable()
export class EmpresaService {

  constructor(public _http:HttpClient) { }

  getEmpresas(limit:number){
    let url = URL_SERVICIOS + '/empresa?desde=0&limit=' + limit;
    return this._http.get(url)
    .catch((e)=>{
      swal("Error","error al consultar empresas","error");
      throw e;
    });
  }
  getEmpresa(id:string){
    let url = URL_SERVICIOS + '/empresa/' + id;
    return this._http.get(url)
    .catch(e=>{
      swal("Error interno","no se encontro la empresa","error");
      throw e;
    });
  }

  guardarEmpresa(empresa:Empresa){
    let url = URL_SERVICIOS + '/empresa';
    if(empresa._id){
      url += "/" + empresa._id;
      return this._http.put(url,empresa)
      .catch(e=>{
        swal("Error Interno","no se pudo crear a la empresa","error");
        throw e;
      });
    }else{
      return this._http.post(url,empresa)
      .catch(e=>{
        swal("Error Interno","no se pudo crear a la empresa","error");
        throw e;
      });
    }
  }
  eliminarEmpresa(id:string){
    let url = URL_SERVICIOS + '/empresa/' + id;
    return this._http.delete(url)
    .catch(e=>{
      throw e;
    });
  }



}
