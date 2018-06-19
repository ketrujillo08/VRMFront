import { Component, OnInit } from '@angular/core';
import { Empresa } from '../../models/empresa.model';
import { Router, ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';
import { EmpresaService } from '../../services/empresa/empresa.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-empresa',
  templateUrl: './empresa.component.html',
  styles: []
})
export class EmpresaComponent implements OnInit {
  empresa : Empresa = new Empresa('',false);

  constructor(private _router:Router,public _routerActivated:ActivatedRoute,public _empresaService:EmpresaService) {
    _routerActivated.params.subscribe(params=>{
      let id = params['id'];
      if(id !== 'nuevo'){
       this.cargarEmpresa(id);
      }else{
        this.empresa = new Empresa('',false);
      }

    });
   }

  ngOnInit() {
  }
  cargarEmpresa(id:string){
    this._empresaService.getEmpresa(id)
    .subscribe((res:any)=>{
      this.empresa = res.empresa;
    });

  }
  eliminarEmpresa(id : string){
    swal({
      title:"¿Deseas eliminar a la empresa",
      text:"La empresa sera eliminado permanentemente",
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
          this._empresaService.eliminarEmpresa(id)
          .subscribe((res:any)=>{
            if(res.exito){
              this._router.navigate(['/empresas']);
            }
          });
        }
    });

  }
  guardarEmpresa(){
    this._empresaService.guardarEmpresa(this.empresa)
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
          this._router.navigate(['/empresas']);
        }else{
          this._router.navigate(['/empresa',res._id]);
        }
      });
      
    });

  }

}
