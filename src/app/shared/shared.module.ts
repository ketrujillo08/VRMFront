import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { LeftbarComponent } from './leftbar/leftbar.component';
import { RightbarComponent } from './rightbar/rightbar.component';
import { RouterModule } from '@angular/router';
import { BreadcrumbsComponent } from './breadcrumbs/breadcrumbs.component';
import { FooterComponent } from './footer/footer.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule
  ],
  declarations: [
    HeaderComponent,
    LeftbarComponent,
    RightbarComponent,
    BreadcrumbsComponent,
    FooterComponent
  ],
  exports:[
    HeaderComponent,
    LeftbarComponent,
    RightbarComponent,
    BreadcrumbsComponent,
    FooterComponent
  ]
})
export class SharedModule { }
