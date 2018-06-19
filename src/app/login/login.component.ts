import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms'
import { UsuarioService } from '../services/usuario/usuario.service';
import { Usuario } from '../models/usuario.model';
import swal from 'sweetalert2';
import { Router } from '@angular/router';
import { GOOGLE_CLIENT_ID } from '../config/config';
declare const gapi : any;
declare var window: any;
declare var FB: any;
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: []
})
export class LoginComponent implements OnInit {

  recordar:boolean;
  correo:string = '';
  auth2:any;
  constructor(public _usuarioService:UsuarioService,public _router:Router) {
    
  }

  ngOnInit() {
    this.checkRecordar();
    this.googleInit();
   
  }


  login(formulario:NgForm){
   
    if(formulario.valid){
      let usuario = new Usuario('','',formulario.value.correo,formulario.value.password);
      this._usuarioService.login(usuario,this.recordar)
      .subscribe((res:any)=>{
          this._router.navigate(['/inicio']);
      });

    }

  }
  checkRecordar(){
    if(localStorage.getItem('correo')){
      this.recordar=true;
      this.correo=localStorage.getItem('correo');
    }
  }
  googleInit(){
    gapi.load('auth2',()=>{
      this.auth2 = gapi.auth2.init({
        client_id: GOOGLE_CLIENT_ID,
        cookiepolicy:'single_host_origin',
        scope:'profile email'
      });
      this.attachSignin(document.getElementById('btn-google'));
      
    });
  }

  attachSignin(element) {
    this.auth2.attachClickHandler(element, {},
        (googleUser)=>{
              //console.log(googleUser);
              //console.log(googleUser.getAuthResponse());
              //googleUser.getBasicProfile().getName();
              var id_token = googleUser.getAuthResponse().id_token;
              this._usuarioService.loginGoogle(id_token)
              .subscribe((res:any)=>{
                  console.log(res);
                  this._router.navigate(['/login']);
                  //swal("Google","Login Google","success");
              });
        }, (error)=> {
          alert(JSON.stringify(error, undefined, 2));
        });
  }

  facebookInit(){
   
  }

  

}
