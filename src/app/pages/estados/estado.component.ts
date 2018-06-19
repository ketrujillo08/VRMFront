import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import swal from 'sweetalert2';
import { EstadoService } from '../../services/estado/estado.service';
import { EmpresaService } from '../../services/service.index';
import { NgForm } from '@angular/forms';
import { Estado } from '../../models/estado.model';
import { Empresa } from '../../models/empresa.model';

@Component({
  selector: 'app-estado',
  templateUrl: './estado.component.html',
  styles: []
})
export class EstadoComponent implements OnInit {

  estado:Estado = new Estado("",null,true,"nuevo");
  empresa:Empresa;
  empresas:Empresa[];

  constructor(
    private _activatedRouter:ActivatedRoute,
    public _estadoService:EstadoService,
    public _empresaService:EmpresaService,
    public _router:Router

  ) { 
    _activatedRouter.params.subscribe(params=>{
      let id = params['id'];
      if(id!=="nuevo"){
          this.cargarEstado(id);
      }else{
        this.estado = new Estado("",null,true,"nuevo");
      }

    });
  }

  ngOnInit() {
    this.cargarEmpresas();
  }

  cargarEmpresas(){
    this._empresaService.getEmpresas(100)
    .subscribe((res:any)=>{
      this.empresas = res.empresas;
    });

  }
  cargarEstado(id:string){
    this._estadoService.cargarEstado(id)
    .subscribe((res:any)=>{
      this.estado = res.estado;
      this.empresa = res.estado.empresa;
      this.estado.empresa = res.estado.empresa._id;
    });
  }
  guardarEstado(formulario:NgForm){

    if(formulario.valid){
      this._estadoService.guardarEstado(this.estado)
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
            this._router.navigate(['/estados']);
          }else{
            this._router.navigate(['/estado',res._id]);
          }
        });
      });
    }

  }
  eliminarEstado(id:string){

    this._estadoService.eliminarEstado(id)
    .subscribe(res=>{
      this._router.navigate(['/estados']);
    });     
  }


}
