import { Component, OnInit, OnChanges } from '@angular/core';
import { URL_SERVICIOS } from '../../config/config';
declare const $:any;

@Component({
  selector: 'app-lavados',
  templateUrl: './lavados.component.html',
  styles: []
})
export class LavadosComponent implements OnInit {
  public table : any;
  constructor() { }

  ngOnInit() {
    this.cargarEstados(null)
    .then(
      ()=>{
        this.table.destroy();
      }
    );
    $( function() {
      $.fn.dataTable.ext.errMode = 'throw';
      $( "#date-icon" ).datepicker({
        minDate: 0,
        maxDate: 7,
        dateFormat:'yy-mm-dd',
        onSelect: function() {
          $(this).trigger("onChange");   
        }
      });
    });
    
  }
  mostrarFecha(e:any){
    let fecha = e.value;
    this.cargarEstados(fecha)
    .then(
      ()=>{
        this.table.destroy();
      }
    ).catch(e=>{
      this.table.destroy();
    });
  }
  cargarEstados(fecha:string):Promise<any>{
    let url = URL_SERVICIOS + '/lavado/?token='+localStorage.getItem("token");
    if(fecha){
      url += '&fecha=' + fecha;
    }
    
    return new Promise((resolve,reject)=>{
      this.table = $('.data-tbl').DataTable({
          retrieve: true,
          paging: false,
          responsive: true,
          ajax:{
            url:url,
            dataSrc:'lavados'
          },
          columns:[
            {data:'carro.modelo'},
            {data:'cliente.nombre'},
            {data:'empresa.nombre'},
            {data:'estado.estado'},
            {data:'servicio.servicio'},
            {data:'fecha',
              render:function(data,type,row){
                let fecha = new Date(data);
                let hora = fecha.getHours();
                let minutos = fecha.getMinutes();
                return hora + ':' + minutos
              }
            },
            {data:'lavador.nombre'},
            {data:'_id',
              render:function(data, type, row ){
                return `<div class="btn-group">
                          <a href="#/lavado/`+data+`" class="btn btn-info"><i class="zmdi zmdi-edit"></i></a>
                        </div>`
              }
            }
          ]
        })
        .on( 'draw', function () {
            resolve(true);
          })
        .on( 'xhr', function ( e, settings, json ) {
          console.log("XHR DataTable");
          if(!json){
            console.log("ERROR XHR DataTable");
            window.location.href="#/login";
          }
        });
      });
    }

}
