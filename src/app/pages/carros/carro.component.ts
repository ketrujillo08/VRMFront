import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Carro } from '../../models/carro.model';
import { NgForm } from '@angular/forms';
import { CarroService } from '../../services/carro/carro.service';
import swal from 'sweetalert2';
import { Usuario } from '../../models/usuario.model';
import { UsuarioService } from '../../services/usuario/usuario.service';


@Component({
  selector: 'app-carro',
  templateUrl: './carro.component.html',
  styles: []
})
export class CarroComponent implements OnInit {

  carro: Carro = new Carro('',0,'','');
  usuario: Usuario = new Usuario("","","","");
  usuarios : Usuario[] = [];
  constructor(public _routerActivated:ActivatedRoute,public _router:Router,public _carroService:CarroService,public _usuarioService:UsuarioService) {
    _routerActivated.params.subscribe(params=>{
      let id = params['id'];
      if(id !== 'nuevo'){
       this.cargarCarro(id);
      }else{
        this.carro = new Carro('',0,'','');
      }
    });
  }

  ngOnInit() {
    this.getClientes();
  }

  cargarCarro(id:string){
    this._carroService.cargarCarro(id).subscribe((res:any)=>{
      this.carro = res.carro;
      this.usuario= res.carro.usuario;
      this.carro.usuario = res.carro.usuario._id;
      console.log(this.carro);
    });

  }

  getClientes(){
    this._carroService.getClientes('Cliente')
    .subscribe((res:any)=>{
      this.usuarios = res.usuarios;
    });
  }
  cambiarUsuario(id:string){
    this.usuario._id = id;
  }
  guardarCarro(formulario:NgForm){
    if(formulario.valid){
      this._carroService.guardarCarro(this.carro,this._usuarioService.token)
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
            this._router.navigate(['/carros']);
          }else{
            this._router.navigate(['/empresa',res._id]);
          }
        });

      });

    }

  }
  eliminarCarro(id:string){
    swal({
      title:"¿Deseas eliminar el vehículo",
      text:"El vehículo sera eliminado permanentemente",
      type:"warning",
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
          this._carroService.eliminarCarro(id)
          .subscribe((res:any)=>{
            if(res.exito){
              this._router.navigate(['/carros']);
            }
          });
        }
    });

  }

}
