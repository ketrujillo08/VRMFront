import { Component, OnInit } from '@angular/core';
import { Carro } from '../../models/carro.model';
import { URL_SERVICIOS } from '../../config/config';
declare var $:any;

@Component({
  selector: 'app-carros',
  templateUrl: './carros.component.html',
  styles: []
})
export class CarrosComponent implements OnInit {
  carros:Carro[]=[];

  constructor() { }

  ngOnInit() {

    this.cargarCarros().
    then(success=>{
        console.log("Init CheckBox");
        this.initCheckBox();
    })
    .catch(
      (error)=>{console.error("Error",error);}
    );
  }
  cargarCarros():Promise<any>{
    return new Promise((resolve,reject)=>{
      $('.data-tbl').DataTable({
          responsive: true,
          ajax:{
            url:URL_SERVICIOS + '/carro?desde=0&limit=40',
            dataSrc:'carros'
          },
          columns:[
            {data:'modelo'},
            {data:'anio'},
            {data:'color'},
            {data:'placas'},
            {data:'usuario.nombre'},
            {data:'creador.nombre'},
            {data:'comentarios'},
            {data:'_id',
              render:function(data, type, row ){
                return `<div class="btn-group">
                          <a href="#/carro/`+data+`" class="btn btn-info"><i class="zmdi zmdi-edit"></i></a>
                        </div>`
              }
            }
          ]
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
