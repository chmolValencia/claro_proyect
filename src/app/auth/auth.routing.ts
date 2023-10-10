import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


const routes: Routes = [
  {path:'register',component:RegisterComponent },
  {path:'login',component:LoginComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes),ReactiveFormsModule,FormsModule ],
  exports: [RouterModule]
})
export class AuthRoutingModule {}
