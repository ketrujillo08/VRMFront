import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../models/usuario.model';
import { UsuarioService } from '../../services/usuario/usuario.service';
import { URL_SERVICIOS } from '../../config/config';
import swal from 'sweetalert2';
declare var $:any;
@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styles: []
})
export class UsuariosComponent implements OnInit {
  usuarios : Usuario[] = [];
  total : number = 0;

  constructor(public _usuariosServicio:UsuarioService) {
    
   }

  ngOnInit() {
    this.initTable();
  }

  getUsuarios(){
    

  }

  initTable(){

      console.log('initTable');
    
      $('.data-tbl').DataTable({
          responsive: true,
          ajax:{
            url:URL_SERVICIOS + '/usuario?desde=0&skip=40',
            dataSrc:'usuarios'
          },
          columns:[
            {data:'nombre'},
            {data:'apellido'},
            {data:'correo'},
            {data:'rol'},
            {data:'empresa.nombre'},
            {data:'fecha'},
            {data:'_id',
              render:function(data, type, row ){
                return `<div class="btn-group">
                          <a href="#/usuario/`+data+`" class="btn btn-info"><i class="zmdi zmdi-edit"></i></a>
                        </div>`
              }
            }
          ]
      });
  }

 

}
