import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { NopageFoundComponent } from './nopage-found/nopage-found.component';

import { AuthModule } from './auth/auth.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { PagesModule } from './pages/pages/pages/pages.module';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';
import { MatCardModule } from '@angular/material/card';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { EditarRegistroModalComponent } from './pages/editar-registro-modal/editar-registro-modal.component';
import { ProblemasConsultarComponent } from './pages/consultaFromatoFHu/problemas-consultar/problemas-consultar.component';
import { AppRoutingModule } from './app-routing.module';

@NgModule({

  imports: [
    ReactiveFormsModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    PagesModule,
    AuthModule,
    CommonModule,
    HttpClientModule,
    FormsModule,
    MatInputModule,
    MatDialogModule,
    MatCardModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
    MatTableModule,
    MatPaginatorModule,
  ],declarations:
  [ AppComponent,
    NopageFoundComponent,
    ProblemasConsultarComponent,
    EditarRegistroModalComponent,
    ]
  ,
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
