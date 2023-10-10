import { Subscription, filter } from "rxjs";
import { Component, OnDestroy } from '@angular/core';
import {  ActivationEnd, Router } from "@angular/router";


@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styleUrls: ['./breadcrumbs.component.css']
})
export class BreadcrumbsComponent implements OnDestroy{

public titulo:String="";
public titulosSubs$:Subscription;
constructor(private router: Router){
this.titulosSubs$ = this.getArgumentosRuta().subscribe((event: ActivationEnd): void => {
                                                            const eventData = event.snapshot?.data;
                                                            this.titulo=eventData['titulo'];
                                                            document.title ="Claro-"+ eventData['titulo']
                                                          });
}

  ngOnDestroy(): void {
   this.titulosSubs$.unsubscribe();
  }

getArgumentosRuta(){
  return  this.router.events.pipe(
    filter(event => event instanceof ActivationEnd),
    filter((event: any): event is ActivationEnd => event instanceof ActivationEnd),
    filter((event:ActivationEnd)=>event.snapshot.firstChild == null),
    filter((event: ActivationEnd) => event.snapshot?.data !== undefined),

    )
}

}


