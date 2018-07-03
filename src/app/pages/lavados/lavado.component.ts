import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../models/usuario.model';
import { UsuarioService } from '../../services/service.index';
import { TipoServicio } from '../../models/tipo-servicio.model';
import { Estado } from '../../models/estado.model';
import { Carro } from '../../models/carro.model';
import { NgForm } from '@angular/forms';
import { Lavado } from '../../models/lavado.model';
import { LavadoService } from '../../services/lavado/lavado.service';
import { ActivatedRoute, Router } from '@angular/router';
import swal from 'sweetalert2';
declare const $:any;
@Component({
  selector: 'app-lavado',
  templateUrl: './lavado.component.html',
  styles: []
})
export class LavadoComponent implements OnInit {

  creador:Usuario;
  clientes:Usuario[] = [];
  tiposServicios:TipoServicio[] = [];
  estados:Estado[] = [];
  carros:Carro[] = [];
  lavado:Lavado = new Lavado("","","",String(this._usuarioService.usuario.empresa),String(this._usuarioService.usuario._id),true,false,false);
  lavadores : Usuario[] = [];



  constructor(public _usuarioService:UsuarioService,public _lavadoService:LavadoService,public activaRoute : ActivatedRoute,public _router:Router) {
    activaRoute.params.subscribe(params=>{
      let id = params['id'];
      if(id!=="nuevo"){
        this.getLavado(id);

      }else{

        this.lavado = new Lavado("","","",String(this._usuarioService.usuario.empresa),String(this._usuarioService.usuario._id),false,false,false);

      }
    });
   }

  ngOnInit() {
    this.cargarClientes();
    this.getTipoServicios(String(this._usuarioService.usuario.empresa));
    this.getEstados(String(this._usuarioService.usuario.empresa));
    this.getLavadores(String(this._usuarioService.usuario.empresa));
    $( function() {
      $( "#date-icon" ).datetimepicker({
        minDate: 0,
        maxDate: 7,
        dateFormat:'MM dd, yy',
      });
      
    } );

  }
  formatDate(){
    let fecha = $("input[name='hora']").val();
    this.lavado.hora = fecha;
    this.lavado.fecha = fecha;
  }
  verficarCheck(element:any){
    console.log("Click");
  }

  guardarLavado(formulario:NgForm){

    if(formulario.valid){
      this.formatDate();
      let lluvia = $("input[name='lluvia']").is(":checked");
      let aroma = $("input[name='aroma']").is(":checked");
      let tapete = $("input[name='tapete']").is(":checked");
      this.lavado.aroma = aroma;
      this.lavado.tapete = tapete;
      this.lavado.lluvia = lluvia;
      this._lavadoService.guardarLavado(this.lavado)
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
            this._router.navigate(['/lavados']);
          }else{
            this._router.navigate(['/lavado',res.lavado._id]);
          }
        });

      });

    }
    

  }
  getLavado(id:string){
    this._lavadoService.getLavado(id)
    .subscribe((res:any)=>{
      this.lavado=res.lavado;
    });

  }
  eliminarLavado(id:string){

  }
  cargarClientes(){
    this._usuarioService.getClientes()
    .subscribe((res:any)=>{
      this.clientes =res.usuarios;
      console.log(this.clientes);
    });
  }

  getVehiculos(e:any){
    let cliente = e.target.value;
    this._usuarioService.getCarrosCliente(cliente)
    .subscribe((res:any)=>{
      this.carros = res.carros;
    });
  }
  getTipoServicios(empresa:string){
    this._lavadoService.getTiposervicios(empresa)
    .subscribe((res:any)=>{
      this.tiposServicios = res.tiposServicios;
    });
  }
  getEstados(empresa:string){
    this._lavadoService.getEstadosServicio(empresa)
    .subscribe((res:any)=>{
        this.estados=res.estados;
    });
  }
  getLavadores(empresa:string){
    this._lavadoService.getEmpleados(empresa)
    .subscribe((res:any)=>{
        this.lavadores=res.usuarios;
    });
  }



}
