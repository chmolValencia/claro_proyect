import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from "@angular/router";
import { DashboardComponent } from '../../dashboard/dashboard.component';
import { ProgressComponent } from '../../progress/progress.component';
import { Graficas1Component } from '../../graficas1/graficas1.component';
import { PagesComponent } from '../../pages.component';
import { SharedModule } from 'src/app/shared/shared/shared.module';
import { RegistroProblemasComponent } from '../../registro-problemas/registro-problemas.component';
import { HomeComponent } from '../../home/home.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatSnackBarModule } from '@angular/material/snack-bar';

@NgModule({
  declarations: [
    HomeComponent,
    DashboardComponent,
    ProgressComponent,
    Graficas1Component,
    PagesComponent,
    RegistroProblemasComponent
  ],
  exports: [
    HomeComponent,
    DashboardComponent,
    ProgressComponent,
    Graficas1Component,
    PagesComponent,
    RegistroProblemasComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule,
    ReactiveFormsModule,
    FormsModule,
    MatCardModule,
    MatSnackBarModule,

  ]
})
export class PagesModule { }
