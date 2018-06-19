import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../models/usuario.model';
import { Empresa } from '../../models/empresa.model';
import { URL_SERVICIOS } from '../../config/config';
import { EmpresaService } from '../../services/empresa/empresa.service';
import { Form, NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import swal from 'sweetalert2';
import { UsuarioService } from '../../services/service.index';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styles: []
})
export class UsuarioComponent implements OnInit {
  usuario:Usuario;
  empresas : Empresa[]=[];
  totalEmpresas :number = 0;
  constructor(public _empresaService:EmpresaService, public _activatedRoute:ActivatedRoute,public _usuarioService:UsuarioService,public _router:Router) { 
    _activatedRoute.params.subscribe(params=>{
      let id = params['id'];
      if(id !== 'nuevo'){
        this.getUsuario(id);
      }else{
        this.usuario = new Usuario("","","","Inactivo","");
      }

    });
  }

  ngOnInit() {
    this.getEmpresas();
  }
  getUsuario(id:string){
    this._usuarioService.getUser(id)
    .subscribe((res:any)=>{
      this.usuario = res.usuario;
    });

  }
  getEmpresas(){
    this._empresaService.getEmpresas(40)
    .subscribe((res:any)=>{
      this.totalEmpresas = res.total;
      this.empresas = res.empresas;
    });
  }

  guardarUsuario(formulario : NgForm){
    if(formulario.valid){
      this._usuarioService.guardarUsuario(this.usuario)
      .subscribe((res:any)=>{
        swal({
          title:"Éxito al guardar",
          text:"¿Regresar al listado o quedarse?",
          type:"info",
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#CCCCCC',
          showCancelButton: true,
          focusConfirm: true,
          confirmButtonText:
            '<i class="fa fa-thumbs-up"></i> Regresar',
          cancelButtonText:
          '<i class="fa fa-thumbs-down"></i> Seguir',

        }).then((btnSelected)=>{
          if(btnSelected.value){
            this._router.navigate(['/usuarios']);
          }else{
            this._router.navigate(['/usuario',res._id]);
          }
        });
        
      });
    }else{
      swal("Formulario incompleto","asegure que todos los campos estén correctos","warning");
    }
  }
  eliminarUsuario(data:string){
    if(this._usuarioService.usuario._id === data){
      swal("Error","No puedes eliminarte a ti mismo","error");
    }
    swal({
      title:"¿Deseas eliminar al usuario?",
      text:"El usuario sera eliminado permanentemente",
      type:"error",
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      showCancelButton: true,
      focusConfirm: true,
      confirmButtonText:
        '<i class="fa fa-thumbs-up"></i> Eliminar',
      cancelButtonText:
      '<i class="fa fa-thumbs-down"></i>',
      
      
    }).then((res)=>{
        if(res.value){
          this._usuarioService.eliminarUsuario(data)
          .subscribe((res:any)=>{
            if(res.exito){
              this._router.navigate(['/usuarios']);
            }
          });
        }
    });

  }
  

}
