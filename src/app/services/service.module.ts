import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsuarioService } from './usuario/usuario.service';
import { HttpClientModule } from '@angular/common/http';
import { EmpresaService } from './empresa/empresa.service';
import { CarroService } from './carro/carro.service';
import { TipoServicioService } from './tipo-servicio/tipo-servicio.service';
import { EstadoService } from './estado/estado.service';
import { LavadoService } from './lavado/lavado.service';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule
  ],
  providers:[
    UsuarioService,
    EmpresaService,
    CarroService,
    TipoServicioService,
    EstadoService,
    LavadoService
  ],
  declarations: [],
})
export class ServiceModule { }
