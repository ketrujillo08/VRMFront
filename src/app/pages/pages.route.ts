import {Routes,RouterModule,CanActivate} from '@angular/router';
import { InicioComponent } from './inicio/inicio.component';
import { PerfilComponent } from './perfil/perfil.component';
import { PagesComponent } from './pages.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { UsuarioComponent } from './usuarios/usuario.component';
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


const pagesRoutes:Routes =[
    {
        path:'',component:PagesComponent,
        children:[
            {path:'inicio',component:InicioComponent,data:{titulo:'Inicio'}},
            {path:'perfil',component:PerfilComponent,data:{titulo:'Perfil'}},
            {path:'usuarios',component:UsuariosComponent,data:{titulo:'Listado',padre:'Usuarios'}},
            {path:'usuario/:id',component:UsuarioComponent,data:{titulo:'Listado',padre:'Usuario'}},
            {path:'empresas',component:EmpresasComponent,data:{titulo:'Listado',padre:'Empresas'}},
            {path:'empresa/:id',component:EmpresaComponent,data:{titulo:'Listado',padre:'Empresa'}},
            {path:'carros',component:CarrosComponent,data:{titulo:'Listado',padre:'Carros'}},
            {path:'carro/:id',component:CarroComponent,data:{titulo:'Listado',padre:'Carro'}},
            {path:'tipos-servicios',component:TiposServiciosComponent,data:{titulo:'Listado',padre:'Tipos de Servicios'}},
            {path:'tipo-servicio/:id',component:TiposComponent,data:{titulo:'Listado',padre:'Tipo de Servicio'}},
            {path:'estados',component:EstadosComponent,data:{titulo:'Listado',padre:'Estados'}},
            {path:'estado/:id',component:EstadoComponent,data:{titulo:'Listado',padre:'Estado'}},
            {path:'lavados',component:LavadosComponent,data:{titulo:'Listado',padre:'Lavados'}},
            {path:'lavado/:id',component:LavadoComponent,data:{titulo:'Listado',padre:'Lavado'}},
            {path:'',redirectTo:'/inicio',pathMatch:'full'}
        ]
    }
]

export const Pages_Routes = RouterModule.forChild(pagesRoutes);