import { Component, OnInit } from '@angular/core';
import { TipoServicio } from '../../models/tipo-servicio.model';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { TipoServicioService } from '../../services/tipo-servicio/tipo-servicio.service';
import { Empresa } from '../../models/empresa.model';
import { NgForm } from '@angular/forms';
import swal from 'sweetalert2';
import { EmpresaService } from '../../services/empresa/empresa.service';

@Component({
  selector: 'app-tipos',
  templateUrl: './tipos.component.html',
  styles: []
})
export class TiposComponent implements OnInit {

  tipoServicio : TipoServicio = new TipoServicio("",null,true,"nuevo");
  empresa : Empresa;
  empresas : Empresa[] = [];

  constructor(public _activatedRouter:ActivatedRoute,
              public _http:HttpClient, 
              public tipoServicioService:TipoServicioService,
              public _empresaService:EmpresaService,
              public _router:Router
  ) {

    _activatedRouter.params.subscribe(params=>{

      let id = params['id'];
      if(id !== 'nuevo'){
        this.cargarTipoServicio(id);
      }else{
        this.tipoServicio = new TipoServicio("",null,true,"nuevo");
      }

    });
   }

  ngOnInit() {
    this.cargarEmpresas();
  }

  cargarEmpresas(){
    this._empresaService.getEmpresas(100).subscribe((res:any)=>{
        this.empresas = res.empresas;
    });
  }

  cargarTipoServicio(id:string){
    this.tipoServicioService.cargarTipoServicio(id)
    .subscribe((res:any)=>{
      this.tipoServicio = res.tipoServicio;
      this.empresa = res.tipoServicio.empresa;
      this.tipoServicio.empresa = res.tipoServicio.empresa._id;

    });
  }

  guardarTipoServicio(formulario : NgForm){
    if(formulario.valid){
      this.tipoServicioService.guardarTipoServicio(this.tipoServicio)
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
            this._router.navigate(['/tipos-servicios']);
          }else{
            this._router.navigate(['/tipo-servicio',res._id]);
          }
        });

      });
    }
  }
  eliminarTipoServicio(id:string){
    this.tipoServicioService.eliminarTipoServicio(id)
    .subscribe((res:any)=>{
      this._router.navigate(['/tipos-servicios']);
    });
  }

}
