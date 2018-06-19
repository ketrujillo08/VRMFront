import { Component, OnInit } from '@angular/core';
import { URL_SERVICIOS } from '../../config/config';
declare var $:any;

@Component({
  selector: 'app-tipos-servicios',
  templateUrl: './tipos-servicios.component.html',
  styles: []
})
export class TiposServiciosComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    this.cargarEmpresas()
    .then(success=>{
      this.initCheckBox();
    })
    .catch((error)=>{console.error("Error",error);});
  }

  cargarEmpresas(){
    return new Promise((resolve,reject)=>{
      $('.data-tbl').DataTable({
          responsive: true,
          ajax:{
            url:URL_SERVICIOS + '/tipoServicio?desde=0&skip=40',
            dataSrc:'tiposServicios'
          },
          columns:[
            {data:'servicio'},
            {data:'empresa.nombre'},
            {data:'activo',
              render:function(data, type, row){
                let checked : string = "";
                if(data){
                  checked = "checked='checked'";
                }
                return `<label class="radio-toggle">
                          <input class="switch-sm" type="checkbox" name="radio-toggle" `+checked+`>
                          <i></i>
                        </label>`;
               
              }
            },
            {data:'_id',
              render:function(data, type, row ){
                return `<div class="btn-group">
                          <a href="#/tipo-servicio/`+data+`" class="btn btn-info"><i class="zmdi zmdi-edit"></i></a>
                        </div>`
              }
            }
          ]
        })
        .on( 'draw', function () {
            resolve(true);
          });
      });
    }

    initCheckBox()
    {
      try{
        $(".switch-sm").switchButton({
          show_labels: false, // Should we show the on and off labels?
          on_label: 'C',
          off_label: 'F',
          //      on_callback: wc, //callback function that will be executed after going to on state
          //      off_callback: wf,
          width: 30, // Width of the button in pixels
          height: 20, // Height of the button in pixels
          button_width: 20 // Width of the sliding part in pixels
        });
      }
      catch(e){
        throw e;
      }
    }

}
