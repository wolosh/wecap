import { Component, OnInit, ViewChild } from '@angular/core';
import * as XLSX from 'xlsx';
import { Data, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormControl, } from '@angular/forms';
import { GetService } from 'src/app/data/services/get.service';
import { SessionService } from 'src/app/data/services/session.service';
import { HelpersService } from 'src/app/data/services/helpers.service';
import Swal from 'sweetalert2';
import {
  ChartComponent,
  ApexAxisChartSeries,
  ApexResponsive,
  ApexChart,
  ApexDataLabels,
  ApexXAxis,
  ApexLegend,
  ApexPlotOptions,
  ApexTitleSubtitle
} from "ng-apexcharts";
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

export type ChartUsuarios = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  dataLabels: ApexDataLabels;
  title: ApexTitleSubtitle;
  colors: string[];
  legend: ApexLegend;
  plotOptions: ApexPlotOptions;
  responsive: ApexResponsive[];
};
export type ChartAvances = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  dataLabels: ApexDataLabels;
  title: ApexTitleSubtitle;
  colors: string[];
  legend: ApexLegend;
  plotOptions: ApexPlotOptions;
  responsive: ApexResponsive[];
};

export type ChartAvance = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  dataLabels: ApexDataLabels;
  title: ApexTitleSubtitle;
  colors: string[];
  legend: ApexLegend;
  plotOptions: ApexPlotOptions;
  responsive: ApexResponsive[];
};

export type ChartCurso = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  dataLabels: ApexDataLabels;
  title: ApexTitleSubtitle;
  colors: string[];
  legend: ApexLegend;
  plotOptions: ApexPlotOptions;
  responsive: ApexResponsive[];
};
export type ChartMedallas = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  dataLabels: ApexDataLabels;
  title: ApexTitleSubtitle;
  colors: string[];
  legend: ApexLegend;
  plotOptions: ApexPlotOptions;
  responsive: ApexResponsive[];
};


/*export type ChartCalificacion = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  dataLabels: ApexDataLabels;
  title: ApexTitleSubtitle;
  colors: string[];
  legend: ApexLegend;
  plotOptions: ApexPlotOptions;
  responsive: ApexResponsive[];
};
export type ChartTiempo = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  dataLabels: ApexDataLabels;
  title: ApexTitleSubtitle;
  colors: string[];
  legend: ApexLegend;
  plotOptions: ApexPlotOptions;
  responsive: ApexResponsive[];
};*/

export type chartPromedios = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  title: ApexTitleSubtitle;
};

@Component({
  selector: 'app-estadisticas',
  templateUrl: './estadisticas.component.html',
  styleUrls: ['./estadisticas.component.css']
})
export class EstadisticasComponent implements OnInit {

  usersArr: any;
  pusers: number = 1;
  pcursos: number = 1;
  coursesArr: any;
  cursos2: any;
  estadisticaView: number = 0;
  cantAvance: number = 0;

  @ViewChild("chart") chart: ChartComponent;
  public chartUsuarios: Partial<ChartUsuarios> | any;
  public chartAvances: Partial<ChartAvances> | any;
  public chartPromedios: Partial<any>;
  public chartCurso: Partial<ChartCurso> | any;
  public chartMedallas: Partial<ChartMedallas> | any;
  usuarios: any;
  avance: any;
  cursos: any;
  calificacion: any;
  tiempo: any;
  intentos: any;
  certificaciones: any;
  certInfo: any;

  modules: any;
  incremento: any;
  avanceCurso: any;
  tiempoExamenes: any;
  tiempoModulos: any;
  tiempoTemas: any;
  cursoName: any;
  usuariosmod: any;
  calificacionInicial: any;
  calificacionFinal: any;
  areas: any = [];
  value: any = [];
  medallaTerminar: any;
  medallaScore: any;
  medallaTiempo: any;
  modulos: any;
  showModule: number = 0;
  moduleName: any;
  caliMod: any;
  tiempoMod: any;
  avanceMod: any;
  certiCount: number = 0;
  modCount: number = 0;


  constructor(private sanitizer: DomSanitizer, private get: GetService, public helpers: HelpersService, private formBuilder: FormBuilder, private session: SessionService, private route: Router) { }

  ngOnInit(): void {
    this.helpers.goTop();

    if (localStorage.getItem('type') == '1') {
      this.helpers.loader();
      this.helpers.type = localStorage.getItem('type');
      //this.certifications();
      //this.estadisticasCurso(1);
      this.estadGlobales();
      this.estadisticas();
      //this.estadCurso(1);
      //this.estadModulo(1);
    } else {
      if (localStorage.getItem('type') == '4') {
        Swal.fire({
          title: '¡Error!',
          text: 'No tienes permiso para acceder a esta página.',
          icon: 'error',
          confirmButtonColor: '#015287',
        }).then((result) => {
          //console.log(result)
          if (result.isConfirmed) {
            this.route.navigate(['/cmtemplate']);
          }
        });
      } else if (localStorage.getItem('token') == null) {
        this.route.navigate(['/']);
      }
    }
  }

  changeViewEstadisticas(view: any, id?: any, name?: any) {
    //console.log(view, id, name)
    this.helpers.loader();
    switch (view) {
      case 'generales':

        this.estadisticaView = 0;
        this.estadGlobales();
        this.areas = [];
        this.value = [];
        break;
      case 'modulos':
        //this.estadisticaView = 1;
        //this.estadModulo(id);
        this.cursoName = name;
        //console.log(id)
        this.certificaciones.forEach((element: any) => {
          if (element.idCurso == id) {
            //console.log(element);
            this.estaCurso(element);
          }
        });
        this.estadisticaView = 1;
        //console.log(this.certInfo)
        this.estadModulo(id);
        break;
      case 'moduloInfo':
        this.showModule = 1;
        //console.log(this.modulos)
        this.moduleName = name;
        this.modulos.forEach((element: any) => {
          if (element.idModule == id) {
            this.caliMod = element.promedioCalificacion;
            this.avanceMod = element.promedioAvance;
            this.tiempoMod = element.promedioTiempo;
            Swal.close();
          }
        });
        break;
      case 'close':
        this.showModule = 0;
        this.moduleName = '';
        this.caliMod = '';
        this.avanceMod = '';
        this.tiempoMod = '';
        Swal.close();
        break;
    }

  }

  estaCurso(element: any) {
    //console.log(element);
    this.modules = element.modulos;
    this.usuariosmod = element.usuarios;
    this.calificacionInicial = element.promedioCalificacion;
    this.calificacionFinal = element.promedioCalificacion;
    this.incremento = element.diagnostico.porcentajeMejorado;
    //this.avanceCurso = element.promedioAvance;
    this.medallaTerminar = element.promedioMedalla1;
    //console.log(this.medallaTerminar);
    this.medallaScore = element.promedioMedalla2;
    this.medallaTiempo = element.promedioMedalla3;
    //console.log(element.promedioAvanceArea)

    Object.keys(element.promedioAvanceArea).forEach((key) => {
      //console.log(key, element.promedioAvanceArea[key]);
      //console.log(key.replace(/_+/g,' '));
      this.areas.push(key.replace(/_+/g, ' '));
      this.value.push(element.promedioAvanceArea[key]);
      //console.log(this.areas, this.value);
    });


    //información grafica de avance en medallas en un curso
    this.chartMedallas = {
      series: [this.medallaTerminar, this.medallaScore, this.medallaTiempo],
      chart: {
        type: "donut"
      },
      colors: [
        '#015287',
        '#A6DAFC',
        '#707070',
      ],
      title: {
        text: "Promedio de obtención de medallas",
        align: 'center',
        style: {
          fontSize: '18px',
          fontFamily: 'Helvetica-Bold',
          color: '#015287'
        },
      },
      dataLabels: {
        //offseY: 30,
        style: {
          fontSize: '16px',
          fontFamily: 'Helvetica-Bold',
          colors: ['#FFF']
        },
        dropShadow: {
          enabled: false
        }
      },
      plotOptions: {
        pie: {
          customScale: 0.8,
        }
      },
      labels: ["Terminar", "Score Perfecto", "Terminar a Tiempo"],
      legend: {
        position: 'bottom',
        fontSize: '16px',
        fontFamily: 'Helvetica-Bold',
        labels: {
          colors: ['#015287']
        },
        markers: {
          width: 25,
          height: 25,
          radius: 5,
        },
      },
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 200
            },
          }
        }
      ]
    };

    //información grafica de avance en un curso
    this.chartCurso = {
      series: [
        {
          name: "Porcentaje de avance",
          data: this.value
        }
      ],
      chart: {
        height: 350,
        type: "bar"
      }, colors: [
        '#015287',
        '#A6DAFC',
        '#707070',
      ],
      title: {
        text: "Progreso por Áreas",
        align: 'center',
        style: {
          fontSize: '18px',
          fontFamily: 'Helvetica-Bold',
          color: '#015287'
        },
      }, dataLabels: {
        //offseY: 30,
        style: {
          fontSize: '10px',
          fontFamily: 'Helvetica-Bold',
          colors: ['#FFF']
        },
        dropShadow: {
          enabled: false
        }
      }, legend: {
        position: 'bottom',
        fontSize: '16px',
        fontFamily: 'Helvetica-Bold',
        labels: {
          colors: ['#015287']
        },
        markers: {
          width: 25,
          height: 25,
          radius: 5,
        },
      },
      xaxis: {
        categories: this.areas,
      }, responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 200
            },
          }
        }
      ]
    };
  }

  users() {
    this.get.getUsers(localStorage.getItem('token')).subscribe((data: any) => {
      //console.log(data)
      this.usersArr = data.users;
      //console.log(this.usersArr)
    });
  }



  dosDecimales(n) {
    let t = n.toString();
    let regex = /(\d*.\d{0,2})/;
    return t.match(regex)[0];
  }

  estadGlobales() {
    this.get.getEstadGlobales(localStorage.getItem('token')).subscribe((data: any) => {
      console.log(data)
      this.usuarios = data.usuarios;
      this.avance = data.avance;
      this.cursos = data.totalCursos;
      this.calificacion = data.promedioCalificacion;
      this.tiempo = this.dosDecimales(data.promedioTiempo);
      this.intentos = data.promedioIntentos;
      console.log(this.tiempo)

      console.log(this.usuarios.hombres)
      //Datos de grafica cantidad de usuarios
      this.chartUsuarios = {
        series: [this.usuarios.hombres, this.usuarios.mujeres, this.usuarios.otro],
        chart: {
          type: "donut"
        },
        colors: [
          '#015287',
          '#A6DAFC',
          '#707070',
        ],
        title: {
          text: "Numero de usuarios",
          align: 'center',
          style: {
            fontSize: '18px',
            fontFamily: 'Helvetica-Bold',
            color: '#015287'
          },
        },
        dataLabels: {
          //offseY: 30,
          style: {
            fontSize: '16px',
            fontFamily: 'Helvetica-Bold',
            colors: ['#FFF']
          },
          dropShadow: {
            enabled: false
          }
        },
        plotOptions: {
          pie: {
            customScale: 0.8,
          }
        },
        labels: ["Hombres", "Mujeres", "Otros"],
        legend: {
          position: 'bottom',
          fontSize: '16px',
          fontFamily: 'Helvetica-Bold',
          labels: {
            colors: ['#015287']
          },
          markers: {
            width: 25,
            height: 25,
            radius: 5,
          },
        },
        responsive: [
          {
            breakpoint: 480,
            options: {
              chart: {
                width: 200
              },
            }
          }
        ]
      };
      if (this.avance.hombres == 0 && this.avance.mujeres == 0 && this.avance.otro == 0) {
        this.cantAvance = 0;
      } else {
        this.cantAvance = 1;
        //Datos de grafica cantidad de avance por usuarios
        this.chartAvances = {
          series: [this.avance.hombres, this.avance.mujeres, this.avance.otro],
          chart: {
            type: "donut"
          },
          colors: [
            '#015287',
            '#A6DAFC',
            '#707070',
          ],
          title: {
            text: "Promedio de avance global",
            align: 'center',
            style: {
              fontSize: '18px',
              fontFamily: 'Helvetica-Bold',
              color: '#015287'
            },
          },
          dataLabels: {
            //offseY: 30,
            style: {
              fontSize: '16px',
              fontFamily: 'Helvetica-Bold',
              colors: ['#FFF']
            },
            dropShadow: {
              enabled: false
            }
          },
          plotOptions: {
            pie: {
              customScale: 0.8,
            }
          },
          labels: ["Hombres", "Mujeres", "Otros"],
          legend: {
            position: 'bottom',
            fontSize: '16px',
            fontFamily: 'Helvetica-Bold',
            labels: {
              colors: ['#015287']
            },
            markers: {
              width: 25,
              height: 25,
              radius: 5,
            },
          },
          responsive: [
            {
              breakpoint: 480,
              options: {
                chart: {
                  width: 200
                },
              }
            }
          ]
        };
      }
      Swal.close();
      this.helpers.goTop();
    });
  }

  /*estadCurso(id: any) {
    this.get.getEstadCurso(id, localStorage.getItem('token')).subscribe(
      (data: any) => {
        console.log(data);
      }
    )
  }*/


  estadisticas() {
    this.get.getEstadGenerales(localStorage.getItem('token')).subscribe(
      (data: any) => {
        console.log(data);
        this.certificaciones = data;
        console.log(this.certificaciones)
        this.certiCount = data.length;
      }, (error: any) => {
        this.helpers.logout();
      }
    );
  }

  estadisticasCurso(id: any) {
    this.get.getEstadCurso(id, localStorage.getItem('token')).subscribe(
      (data: any) => {
        //console.log(data);
        //this.allModules = data;
        ////console.log(this.allModules)
      }
    )
  }

  estadModulo(id: any) {
    //console.log(id)

    this.get.getEstadModulo(id, localStorage.getItem('token')).subscribe(
      (data: any) => {
        console.log(data);
        this.modulos = data;
        //console.log(this.modulos)
        this.modCount = data.length;
        //console.log(this.modulos)
        Swal.close();
        //this.avance =  data.promedioAvance;
        //this.calificacion =  data.promedioCalificacion;
        //this.tiempo =  data.promedioTiempo;
        //this.allModules = data;
        //console.log(this.allModules)
        /*this.chartUsuarios = {
          series: [this.usuarios.hombres, this.usuarios.mujeres, this.usuarios.otro],
          chart: {
            type: "donut"
          },
          colors: [
            '#015287',
            '#A6DAFC',
            '#707070',
          ],
          title: {
            text: "Numero de usuarios",
            align: 'center',
            style: {
              fontSize:  '18px',
              fontFamily:  'Helvetica-Bold',
              color:  '#015287'
            },
          },
          dataLabels: {
            //offseY: 30,
            style: {
              fontSize:  '16px',
              fontFamily:  'Helvetica-Bold',
              colors: ['#FFF']
            },
            dropShadow: {
                enabled: false
            }
          },
          plotOptions: {
            pie: {
              customScale: 0.8,
            }
          },
          labels: ["Hombres", "Mujeres",  "Otros"],
          legend: {
            position: 'bottom',
            fontSize: '16px',
            fontFamily: 'Helvetica-Bold',
            labels: {
              colors: ['#015287']
            },
            markers: {
              width: 25,
              height: 25,
              radius: 5,
            },
          },
          responsive: [
            {
              breakpoint: 480,
              options: {
                chart: {
                  width: 200
                },
              }
            }
          ]
        };*/
      }
    );
  }

  parseTableElement(tableElement: HTMLElement): any[][] {
    const rows = tableElement.querySelectorAll('tr');
    const data = [];

    rows.forEach(row => {
      const rowData = [];
      row.querySelectorAll('td, th').forEach(cell => {
        rowData.push(cell.textContent);
      });
      data.push(rowData);
    });

    return data;
  }

  informe() {
    this.get.getEstadisticasExcel(localStorage.getItem('token')).subscribe((data: any) => {
      ///console.log(data)
      const tempElement = document.createElement('div');
      tempElement.innerHTML = data;
      

      // Find the table element in the tempElement
      const tableElement = tempElement.querySelectorAll('table');
      
      // Initialize variables to store the merged data
    let mergedData = [];
    
    // Iterate through all found table elements and merge their data
    tableElement.forEach((tableElement) => {
      // Convert each table element to an array of arrays
      const tableData = this.parseTableElement(tableElement);

      // Merge the table data into the mergedData array
      mergedData = mergedData.concat(tableData);
    });

    // Convert the merged data to a worksheet
    const worksheet = XLSX.utils.aoa_to_sheet(mergedData);

      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');
      

      const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'buffer' });
      const blob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      const link = document.createElement('a');
      link.href = window.URL.createObjectURL(blob);
      let date = new Date();
      //console.log(date)
      let fileName = 'Informe_' + date.getDate() + '-' + (date.getMonth() + 1) + '-' + date.getFullYear() + '.xlsx';
      link.download = fileName;
      link.click();
    });
  }

}
