import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../models/usuario.model';
import { UsuarioService } from '../../services/service.index';
import { Empresa } from '../../models/empresa.model';
import { TipoServicio } from '../../models/tipo-servicio.model';
import { Estado } from '../../models/estado.model';
import { Carro } from '../../models/carro.model';
import { NgForm } from '@angular/forms';
import { Lavado } from '../../models/lavado.model';
import { LavadoService } from '../../services/lavado/lavado.service';

@Component({
  selector: 'app-lavado',
  templateUrl: './lavado.component.html',
  styles: []
})
export class LavadoComponent implements OnInit {

  creador:Usuario;
  clientes:Usuario[] = [];
  empresa:Empresa[];
  tipoServicio:TipoServicio[] = [];
  estado:Estado[] = [];
  carro:Carro[] = [];
  lavado:Lavado;



  constructor(public _usuarioService:UsuarioService,public _lavadoService:LavadoService) { }

  ngOnInit() {
    this.cargarClientes();
  }

  guardarLavado(formulario:NgForm){

  }
  eliminarLavado(id:string){

  }
  cargarClientes(){
    this._usuarioService.getClientes()
    .subscribe((res:any)=>{
      this.clientes =res.usuarios;
    });
  }

}
