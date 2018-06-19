import { Routes,RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { PagesComponent } from './pages/pages.component';

const appRoutes:Routes = [
    {path:'login',component:LoginComponent},
    {path:'**',component:LoginComponent}
];

export const APP_ROUTES = RouterModule.forRoot(appRoutes,{useHash:true});