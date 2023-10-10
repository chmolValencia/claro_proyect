import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AuthGuard } from '../guard/auth.guard';
import { Graficas1Component } from './graficas1/graficas1.component';
import { ProgressComponent } from './progress/progress.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PagesComponent } from './pages.component';
import { RegistroProblemasComponent } from './registro-problemas/registro-problemas.component';
import { HomeComponent } from './home/home.component';
import { MatCardModule } from '@angular/material/card';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialogModule } from '@angular/material/dialog';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ProblemasConsultarComponent } from './consultaFromatoFHu/problemas-consultar/problemas-consultar.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';

const routes: Routes = [

  {
    path: 'home',
    component: PagesComponent,
    canActivate:[AuthGuard],
    children: [
      { path: '', component: HomeComponent, data: { titulo: 'Home' } },
      { path: 'dashboard', component: DashboardComponent },
      { path: 'progress', component: ProgressComponent },
      { path: 'grafica1', component: Graficas1Component },
      { path: 'Registro_Problemas', component: RegistroProblemasComponent, data: { titulo: 'Registro Problemas' }},
      { path: 'problemas_consultar', component: ProblemasConsultarComponent, data: { titulo: 'Consultar Formatos HU' } }
    ]
  }
];

@NgModule({
    imports: [
    MatCardModule,
    MatSnackBarModule,
    ReactiveFormsModule,
    MatProgressSpinnerModule,
    FormsModule,
    MatTableModule,
    MatPaginatorModule,
    MatDialogModule,
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class PagesRoutingModule {}
