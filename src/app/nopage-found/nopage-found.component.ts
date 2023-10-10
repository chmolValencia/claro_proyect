import { Component } from '@angular/core';

@Component({
  selector: 'app-nopage-found',
  templateUrl: './nopage-found.component.html',
  styleUrls: ['./nopage-found.component.css']
})

export class NopageFoundComponent {

year=new Date().getFullYear();
mes= new Date().getMonth()+1;
dia=new Date().getDate();
hora=new Date().getSeconds() == 36000;
 today = new Date();
fecha=this.today.toLocaleString();
//fecha: String =this.mes+"/"+this.dia+"/"+this.year+"HORA:"+this.hora ;



}
