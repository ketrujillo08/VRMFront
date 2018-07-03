import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Usuario } from '../../models/usuario.model';
import { URL_SERVICIOS } from '../../config/config';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Observable } from 'rxjs/Observable';
import swal from 'sweetalert2';

@Injectable()
export class UsuarioService {
  public token : string;
  public usuario :Usuario;
  constructor(public _http:HttpClient) {
    this.cargarStorage();

  }

  cargarStorage(){
    if(localStorage.getItem("token")){
      this.token = localStorage.getItem("token");
      this.usuario = JSON.parse(localStorage.getItem('usuario'));
    }
  }

  login(usuario:Usuario,recordar:boolean){
    if(recordar){
      localStorage.setItem('correo',usuario.correo);
    }else{
      localStorage.removeItem('correo');
    }
    let url = URL_SERVICIOS + '/login';
    return this._http.post(url,usuario)
    .map((res:any)=>{
        this.guardarStorage(res.usuario._id,res.usuario,res.token);
        this.usuario = res.usuario;
        console.log("Token Storage",localStorage.getItem("token"));
        return res;
    })
    .catch((err)=>{
     swal('error',err.error.mensaje,'error');
     throw err;
    });
  }
  loginGoogle(idtoken:string){
    let url = URL_SERVICIOS + '/login/' + 'google';
    return this._http.post(url,{token:idtoken})
    .catch((err)=>{
        swal('error',err.error.mensaje,'error');
        throw err;
    });

  }
  getUsers(idtoken:string,desde:number,skip:number){
    let url = URL_SERVICIOS + '/usuario?desde='+desde+'&skip='+skip;
    return this._http.get(url)
    .catch((e)=>{
      swal('error',e.error.mensaje,'error');
      throw e;
    });

  }
  getClientes(){
    let url = URL_SERVICIOS + '/usuario?rol=Cliente';
    return this._http.get(url)
    .catch((e)=>{
      swal('error',e.error.mensaje,'error');
      throw e;
    });
  }
  getUser(id:string){
    let url = URL_SERVICIOS + '/usuario/' + id;
    return this._http.get(url)
    .catch((e)=>{
      swal('error',e.error.mensaje,'error');
      throw e;
    });
  }
  getCarrosCliente(id:string){
    let url = URL_SERVICIOS + '/carro/?cliente=' + id;
    return this._http.get(url)
    .catch((e)=>{
      swal('error',e.error.mensaje,'error');
      throw e;
    }); 
  }
  guardarUsuario(usuario:Usuario){
    let url = URL_SERVICIOS + '/usuario/';
    if(usuario._id){
      url += usuario._id;
      return this._http.put(url,usuario)
      .catch((e)=>{
        swal("Error Interno","no se pudo almacenar el usuario","error");
        throw e;
      });

    }else{
      usuario.activo = 0;
      return this._http.post(url,usuario)
      .map((res:any)=>{
        swal("Éxito","usuario creado","success");
        return res.usuario;
      })
      .catch((e)=>{
        swal("Error Interno","no se pudo almacenar el usuario","error");
        throw e;
      });


    }
  }

  eliminarUsuario(id:string){
    let url = URL_SERVICIOS + '/usuario/' + id;
    return this._http.delete(url)
    .catch(e=>{
      swal("Error Interno","no se pudo eliminar el usuario","error");
       throw e; 
    });
  }
  

  guardarStorage(id:string,usuario:Usuario,token:string){
     localStorage.setItem('id',id);
     localStorage.setItem('usuario',JSON.stringify(usuario));
     localStorage.setItem('token',token);
  }


}
