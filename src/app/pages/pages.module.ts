import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PagesComponent } from './pages.component';
import { Pages_Routes } from './pages.route';
import { InicioComponent } from './inicio/inicio.component';
import { PerfilComponent } from './perfil/perfil.component';
import { SharedModule } from '../shared/shared.module';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { UsuarioComponent } from './usuarios/usuario.component';
import { FormsModule } from '@angular/forms';
import { EmpresasComponent } from './empresas/empresas.component';
import { EmpresaComponent } from './empresas/empresa.component';
import { CarrosComponent } from './carros/carros.component';
import { CarroComponent } from './carros/carro.component';
import { TiposServiciosComponent } from './tipos-servicios/tipos-servicios.component';
import { TiposComponent } from './tipos-servicios/tipos.component';
import { EstadosComponent } from './estados/estados.component';
import { EstadoComponent } from './estados/estado.component';
import { LavadosComponent } from './lavados/lavados.component';
import { LavadoComponent } from './lavados/lavado.component';

@NgModule({
  declarations: [
    InicioComponent,
    PerfilComponent,
    PagesComponent,
    UsuariosComponent,
    UsuarioComponent,
    EmpresasComponent,
    EmpresaComponent,
    CarrosComponent,
    CarroComponent,
    TiposServiciosComponent,
    TiposComponent,
    EstadosComponent,
    EstadoComponent,
    LavadosComponent,
    LavadoComponent
  ],
  imports: [
    SharedModule,
    CommonModule,
    Pages_Routes,
    FormsModule  ],
  
  providers:[
  ]
})
export class PagesModule { }
