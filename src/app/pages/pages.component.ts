import { Component, OnInit } from '@angular/core';

declare function customInitFuncions():any;

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.css']
})
export class PagesComponent implements OnInit{
  ngOnInit(): void {
    customInitFuncions();
  }


  today = new Date();
  // obtener la fecha y la hora
 fecha = this.today.toLocaleString();

}
