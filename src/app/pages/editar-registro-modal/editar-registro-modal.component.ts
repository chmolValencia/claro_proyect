import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RegistroFhu } from '../entity/RegistroFhu';
import { ControllerService } from 'src/app/service/controller';
import { MatSnackBar } from '@angular/material/snack-bar';
import { format } from 'date-fns';


@Component({
  selector: 'app-editar-registro-modal',
  templateUrl: './editar-registro-modal.component.html',
  styleUrls: ['./editar-registro-modal.component.css']
})
export class EditarRegistroModalComponent {
  editarForm: FormGroup;
  loaded:boolean=false;
  loginResponse: any;
  nombreUusario: any;
  usuario: any;
  fechaActual: string="";
  datosUusario: string="";


  constructor(
    private dialogRef: MatDialogRef<EditarRegistroModalComponent>,
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar, // Asegúrate de tener esto
    @Inject(MAT_DIALOG_DATA) public data: RegistroFhu,
    private controllerService: ControllerService
  ) {
    const currentDate = new Date();
    this.fechaActual = format(currentDate, 'MM-dd-yyyy HH:mm:ss');
    //tomar datos de quein lo modifica el formato
    const storedResponse = localStorage.getItem('loginResponse');

    if (storedResponse) {
      this.loginResponse = JSON.parse(storedResponse);
      this.nombreUusario=this.loginResponse.usuario.nombre;
      this.usuario=this.loginResponse.usuario.usuario;
      this.datosUusario=this.nombreUusario+"|"+this.usuario+"|"+this.fechaActual;
    }
    // Crear el formulario con los datos existentes

    this.editarForm = this.formBuilder.group({
      id:[data.id, Validators.required],
      datos:[this.datosUusario, Validators.required],
      codigo: [data.codigo, Validators.required],
      nombre: [data.nombre, Validators.required],
      como: [data.como,Validators.required],
      necesito: [data.necesito,Validators.required],
      para: [data.para,Validators.required],
      criteriosAceptacion: [data.criteriosAceptacion,Validators.required],
      requerimientosNoFuncionales: [data.requerimientosNoFuncionales,Validators.required],
      datosEntrada: [data.datosEntrada,Validators.required],
      datosSalida: [data.datosSalida,Validators.required],
      servicios: [data.servicios,Validators.required],
      notas: [data.notas,Validators.required],
      disponibilidad: [data.disponibilidad,Validators.required],
      funcionalidad: [data.funcionalidad,Validators.required],
      confidencialidad: [data.confidencialidad,Validators.required],
      pbi: [data.pbi,Validators.required],
      cliente: [data.cliente,Validators.required],
      servicioIT: [data.servicioIT,Validators.required],
      flujoValor: [data.flujoValor,Validators.required],
      naturalezaNovedad: [data.naturalezaNovedad,Validators.required]
    });
  }

  guardarCambios() {
    this.loaded = true;
    if (this.editarForm.valid) {
        console.log('datos iniciales a guardar formulario', this.editarForm.value);
        this.controllerService.editarFormularioHU(this.editarForm.value).subscribe(
            (response) => {
                this.loaded = false,
                this.snackBar.open('¡La información se modifico exitosamente!', 'Cerrar', {
                    duration: 10000,
                    verticalPosition: 'top',
                    horizontalPosition: 'center',
                    panelClass: ['snackbar-text'] // Agrega la clase personalizada aquí

                });
            },
            (error) => {
                // Manejar el error en caso de que la solicitud falle
                console.error('Error al enviar datos al backend:', error);
                this.loaded = false;
                // Ocultar pantalla de espera en caso de error también
            }
        );
    } else {
        alert('Por favor, complete todos los campos requeridos.');
        this.loaded = false;
    }
    this.dialogRef.close(true);
}


  cerrarModal() {
    // Cierra el modal sin realizar cambios
    this.dialogRef.close(false);
  }
}
