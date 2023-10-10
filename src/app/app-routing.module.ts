import { NgModule } from '@angular/core';
import { RouterModule, Routes} from '@angular/router'
import { AuthRoutingModule } from './auth/auth.routing';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner'; // Importa correctamente


import { NopageFoundComponent } from './nopage-found/nopage-found.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { PagesRoutingModule } from './pages/pages.routing';

const routes: Routes = [
  //path:'/dashboard' pagesRounting
  //path: 'auth' AuthRoutingModule
  {path: '',redirectTo: '/home',pathMatch: 'full'},
  {path:'**',component:NopageFoundComponent }
];

@NgModule({

  imports: [
    RouterModule.forRoot(routes),
    PagesRoutingModule,
    ReactiveFormsModule,
    AuthRoutingModule,
    MatCardModule,
    MatSnackBarModule,
    MatProgressSpinnerModule,
    MatTableModule,
    MatPaginatorModule
  ],
  exports:[RouterModule]
})
export class AppRoutingModule { }
