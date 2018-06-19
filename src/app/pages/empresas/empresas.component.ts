import { Component, OnInit, OnChanges } from '@angular/core';
import { Empresa } from '../../models/empresa.model';
import { EmpresaService } from '../../services/empresa/empresa.service';
import { URL_SERVICIOS } from '../../config/config';
declare const $:any;
@Component({
  selector: 'app-empresas',
  templateUrl: './empresas.component.html',
  styles: []
})
export class EmpresasComponent implements OnInit {

  empresas : Empresa[] = [];
  total : number = 0;

  constructor(public _empresasService:EmpresaService) { }

  ngOnInit() {
    this.cargarEmpresas().
    then(success=>{
        console.log("Init CheckBox");
        this.initCheckBox();
    })
    .catch(
      (error)=>{console.error("Error",error);}
    );
    
  }
 
  

  getTotal(){
    this._empresasService.getEmpresas(40)
    .subscribe((res:any)=>{
        this.total = res.total;
    });

  }
  cargarEmpresas():Promise<any>{
    return new Promise((resolve,reject)=>{
      $('.data-tbl').DataTable({
          responsive: true,
          ajax:{
            url:URL_SERVICIOS + '/empresa?desde=0&skip=40',
            dataSrc:'empresas'
          },
          columns:[
            {data:'nombre'},
            {data:'fecha'},
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
                          <a href="#/empresa/`+data+`" class="btn btn-info"><i class="zmdi zmdi-edit"></i></a>
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
