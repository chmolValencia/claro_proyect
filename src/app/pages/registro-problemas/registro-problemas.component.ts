import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ControllerService } from '../../../app/service/controller';
import { format } from 'date-fns';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';



@Component({
  selector: 'app-registro-problemas',
  templateUrl: './registro-problemas.component.html',
  styleUrls: ['./registro-problemas.component.css'],
})

export class RegistroProblemasComponent implements OnInit {
  public titulo: String = "Registro de problemas";
  public formato: String = "Formato HU";
  editMode: boolean = false;
  fechaActual: string = "";
  usuario:any;
  loginResponse: any;
  nombreUusario:any;
  datosUusario:string="";
  loaded:boolean=false;


  public formulario!: FormGroup;
  public mensajeExito: string = '';

  constructor(private formBuilder: FormBuilder, private controllerService: ControllerService,private dialog: MatDialog, private snackBar: MatSnackBar) {
    const currentDate = new Date();
    this.fechaActual = format(currentDate, 'MM-dd-yyyy HH:mm:ss');
    //validacion de usuario en plataforma que esta realizando las peteciones
  }


  ngOnInit(): void {
    const storedResponse = localStorage.getItem('loginResponse');
    if (storedResponse) {
      this.loginResponse = JSON.parse(storedResponse);
      this.nombreUusario=this.loginResponse.usuario.nombre;
      this.usuario=this.loginResponse.usuario.usuario;

    }

    this.formulario = this.buildFormulario();
  }

  buildFormulario() {
    this.datosUusario=this.nombreUusario+"|"+this.usuario+"|"+this.fechaActual;
    console.log("datos de completos ",this.datosUusario);
    return this.formBuilder.group({
       datos: [this.datosUusario],
      codigo: ['', Validators.required],
      nombre: ['', Validators.required],
      como: ['', Validators.required],
      necesito: ['', Validators.required],
      para: ['', Validators.required],
      criteriosAceptacion: ['', Validators.required],
      requerimientosNoFuncionales: ['', Validators.required],
      datosEntrada: ['', Validators.required],
      datosSalida: ['', Validators.required],
      servicios: ['', Validators.required],
      notas: ['', Validators.required],
      disponibilidad: ['', Validators.required],
      funcionalidad: ['', Validators.required],
      confidencialidad: ['', Validators.required],
      pbi: ['', Validators.required],
      cliente:['', Validators.required],
      servicioIT:['', Validators.required],
      flujoValor:['', Validators.required],
      naturalezaNovedad: ['', Validators.required]
    });
  }

  submitFormulario() {
    this.loaded=true;
    if (this.formulario.valid) {
       console.log('datos iniciales a guardar formulario ', this.formulario);
      const formData = this.formulario.value;
      console.log('datos iniciales a guardar formData ', formData);
      this.controllerService.RegistroProblemasComponent(formData).subscribe(response => {
        // Manejar la respuesta del backend
        console.log('Respuesta del backend:', response);
        this.loaded=false;
        this.snackBar.open('¡La información se guardó exitosamente!', 'Cerrar', {
          duration: 10000,
          verticalPosition: 'top',
          horizontalPosition: 'center',
        });
        this.formulario.reset();

      }, error => {
        // Manejar el error en caso de que la solicitud falle
        console.error('Error al enviar datos al backend:', error);
        this.loaded=false;
        // Ocultar pantalla de espera en caso de error también
      });
    } else {
      alert('Por favor, complete todos los campos requeridos.');
      this.loaded=false;

    }
  }





}
