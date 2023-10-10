import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RegistroFhu } from '../../entity/RegistroFhu';
import { ControllerService } from 'src/app/service/controller';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { EditarRegistroModalComponent } from '../../editar-registro-modal/editar-registro-modal.component';
import { Workbook, Worksheet } from 'exceljs';
import * as ExcelJS from 'exceljs';

@Component({
  selector: 'app-problemas-consultar',
  templateUrl: './problemas-consultar.component.html',
  styleUrls: ['./problemas-consultar.component.css'],
})
export class ProblemasConsultarComponent implements OnInit {
  public titulo: String = 'Consultar Formulario';
  public formato: String = 'Consultar Formato HU';
  loaded: boolean = false;
  formulario!: FormGroup; // Define la propiedad formulario
  data: any[] = [];
  codigoConsultado: string = '';
  registro: RegistroFhu | undefined;
  pageIndex: number = 0;
  pageSize: number = 10;
  totalRecords: number = 0;
  dataSource!: MatTableDataSource<RegistroFhu>; // Asegúrate de que el tipo sea el correcto
  codigoFiltro: string = ''; // Inicializa la variable de filtro
  registros: RegistroFhu[] = [];
  displayedColumns: string[] = [
    'codigo',
    'nombre',
    'como',
    'necesito',
    'para',
    'criteriosAceptacion',
    'requerimientosNoFuncionales',
    'datosEntrada',
    'datosSalida',
    'servicios',
    'notas',
    'disponibilidad',
    'funcionalidad',
    'confidencialidad',
    'pbi',
    'cliente',
    'servicioIT',
    'flujoValor',
    'naturalezaNovedad',
    'Opciones',
  ];
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private fb: FormBuilder,
    private controllerService: ControllerService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource<RegistroFhu>([]); // Inicializamos el dataSource aquí si es necesario

    this.consultarRegistros();
  }

  consultarRegistros(): void {
    this.loaded = true;
    this.controllerService.consultarPorCodigo().subscribe(
      (data: RegistroFhu[]) => {
        console.log('Datos obtenidos:', data);
        this.dataSource.data = data;
        this.dataSource.paginator = this.paginator;
        this.loaded = false;
      },
      (error: any) => {
        this.loaded = false;
        console.error('Error al obtener registros:', error);
        // Aquí puedes mostrar un mensaje de error al usuario si lo deseas
      }
    );
  }

  aplicarFiltro(valor: string) {
    if (valor) {
      this.dataSource.filter = valor.trim().toLowerCase();
    }
  }

  editarFila(row: RegistroFhu) {
    const dialogRef = this.dialog.open(EditarRegistroModalComponent, {
      width: '2600px', // Ajusta el tamaño del modal según tus necesidades
      data: row, // Pasa los datos del registro a editar al modal
    });

    dialogRef.afterClosed().subscribe((result) => {
      // Aquí puedes manejar el resultado después de cerrar el modal (por ejemplo, si hubo cambios)
    });
  }
  descargarFila(row: RegistroFhu) {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('HU');

    // Establecer tamaños personalizados para columnas
    const customColumnSizes = [
      { col: 'A', width: 43 },
      { col: 'B', width: 43 },
      { col: 'C', width: 43 },
      { col: 'D', width: 43 },
      { col: 'E', width: 43 },
      { col: 'F', width: 43 },
      { col: 'G', width: 43 },
      { col: 'H', width: 43 },
      { col: 'I', width: 43 },
      { col: 'J', width: 43 },
      { col: 'K', width: 43 },
      { col: 'L', width: 43 },
      { col: 'M', width: 43 },
      { col: 'N', width: 43 },
    ];

    // Establecer el tamaño de las columnas personalizadas
    customColumnSizes.forEach((colSize) => {
      worksheet.getColumn(colSize.col).width = colSize.width;
    });

    // Establecer el tamaño de las columnas automáticamente basado en el contenido
    for (let colNumber = 1; colNumber <= 14; colNumber++) {
      worksheet
        .getColumn(colNumber)
        .eachCell({ includeEmpty: true }, (cell) => {
          const desiredWidth = Math.max(
            (cell.value ? cell.value.toString().length : 10) + 2, // Mínimo ancho de 10
            10 // Ancho mínimo
          );
          worksheet.getColumn(colNumber).width = desiredWidth;
        });
    }

    // Estilo para la fila de encabezado
    const headerRow = worksheet.addRow([
      'Código *',
      'Nombre HU',
      'Como … *',
      'Necesito (quiero) … *',
      'Para … *',
      'Criterios de aceptación *',
      'Requerimientos no funcionales - Volumetría *',
      'Datos de entrada',
      'Datos de salida ',
      'Servicios',
      'Notas',
      'Disponibilidad',
      'Funcionalidad',
      'Confidencialidad'
    ]);
    headerRow.eachCell((cell, colNumber) => {
      cell.fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: 'FFFF0000' }, // Fondo rojo
      };
      cell.font = {
        color: { argb: 'FFFFFFFF' }, // Texto blanco
        bold: true, // Hacer el texto en negrita
        size: 12, // Tamaño de fuente
      };
      cell.alignment = {
        vertical: 'middle', // Centrar verticalmente
        horizontal: 'center', // Centrar horizontalmente
      };
      cell.border = {
        top: { style: 'thin' }, // Borde superior delgado
        bottom: { style: 'thin' }, // Borde inferior delgado
        left: { style: 'thin' }, // Borde izquierdo delgado
        right: { style: 'thin' }, // Borde derecho delgado
      };
    });

    // Agregar la fila de datos en la fila 2
    const rowData = [
      row.codigo,
      row.nombre,
      row.como,
      row.necesito,
      row.para,
      row.criteriosAceptacion,
      row.requerimientosNoFuncionales,
      row.datosEntrada,
      row.datosSalida,
      row.servicios,
      row.notas,
      row.disponibilidad,
      row.funcionalidad,
      row.confidencialidad,

    ];

    const dataRow = worksheet.addRow(rowData);
    dataRow.eachCell((cell) => {
      cell.alignment = {
        horizontal: 'center', // Centrar horizontalmente
        vertical: 'middle', // Centrar verticalmente (opcional, puede omitirse si se desea)
        wrapText: true, // Activar el ajuste de texto (word wrap)
      };
      cell.border = {
        top: { style: 'thin' }, // Borde superior delgado
        bottom: { style: 'thin' }, // Borde inferior delgado
        left: { style: 'thin' }, // Borde izquierdo delgado
        right: { style: 'thin' }, // Borde derecho delgado
      };
    });

    // Agregar la información de A8:E8 y A9:E9 en sus ubicaciones correctas
    const infoData = [
      [
        'PBI',
        'Cliente',
        'Servicio IT',
        'Flujo Valor',
        'Naturaleza Origen del Dolor',
      ],
      [
        row.pbi,
        row.cliente,
        row.servicioIT,
        row.flujoValor,
        row.naturalezaNovedad,
      ],
    ];

    const infoRow1 = worksheet.getRow(8);
    infoRow1.values = infoData[0];
    infoRow1.eachCell((cell) => {
      cell.border = {};

      cell.alignment = {
        vertical: 'middle',   // Centrar verticalmente
        horizontal: 'justify', // Justificar horizontalmente
      };
    });

    const infoRow2 = worksheet.getRow(9);
    infoRow2.values = infoData[1];
    infoRow2.eachCell((cell) => {
      cell.border = {
         top: { style: 'thin' }, // Agregar borde superior
      };
    });

    // Congelar las columnas 'A' y 'B' para que estén bloqueadas
    worksheet.views = [
      { state: 'frozen', xSplit: 2, ySplit: 1, topLeftCell: 'C2' },
    ];

    // Generar el archivo de Excel
    workbook.xlsx.writeBuffer().then((buffer) => {
      const blob = new Blob([buffer], {
        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'Formato HU.xlsx';
      a.click();
      document.body.appendChild(a);
      a.remove();
      window.URL.revokeObjectURL(url);
    });
  }
}
