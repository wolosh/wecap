import { Component, OnInit, ViewChild } from '@angular/core';
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
  usuariosmod:any;
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


  constructor(private get: GetService, public helpers: HelpersService, private formBuilder: FormBuilder, private session: SessionService, private route: Router) {}

  ngOnInit(): void {
    this.helpers.goTop();
    this.helpers.loader();
    if (localStorage.getItem('type') == '1') {
      this.helpers.type = localStorage.getItem('type');
      //this.certifications();
      //this.estadisticasCurso(1);
      this.estadGlobales();
      this.estadisticas();
      //this.estadCurso(1);
      //this.estadModulo(1);
    }
  }

  changeViewEstadisticas(view:any, id?:any, name?:any){
    console.log(view, id, name)
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
        console.log(id)
        this.certificaciones.forEach((element: any) => {
          if(element.idCurso == id){
            console.log(element);
            this.estaCurso(element);
          }
        });
        this.estadisticaView = 1;
        console.log(this.certInfo)
        this.estadModulo(id);
        break;
      case 'moduloInfo':
        this.showModule = 1;
        console.log(this.modulos)
        this.moduleName = name;
        this.modulos.forEach((element: any) => {
          if(element.idModule == id){
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

  estaCurso(element:any){
    console.log(element);
    this.modules = element.modulos;
    this.usuariosmod = element.usuarios;
    this.calificacionInicial = element.promedioCalificacion;
    this.calificacionFinal = element.promedioCalificacion;
    this.incremento = element.diagnostico.porcentajeMejorado;
    //this.avanceCurso = element.promedioAvance;
    this.medallaTerminar = element.promedioMedalla1;
    this.medallaScore = element.promedioMedalla2;
    this.medallaTiempo = element.promedioMedalla3;
    console.log(element.promedioAvanceArea)

    Object.keys(element.promedioAvanceArea).forEach((key) => {
      console.log(key, element.promedioAvanceArea[key]);
      console.log(key.replace(/_+/g,' '));
      this.areas.push(key.replace(/_+/g,' '));
      this.value.push(element.promedioAvanceArea[key]);
      console.log(this.areas, this.value);
    });
    


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
      labels: ["Terminar", "Score Perfecto",  "Terminar a Tiempo"],
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
      },colors: [
        '#015287',
        '#A6DAFC',
        '#707070',
      ],
      title: {
        text: "Progreso por Áreas",
        align: 'center',
        style: {
          fontSize:  '18px',
          fontFamily:  'Helvetica-Bold',
          color:  '#015287'
        },
      },dataLabels: {
        //offseY: 30,
        style: {
          fontSize:  '10px',
          fontFamily:  'Helvetica-Bold',
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

  users(){
    this.get.getUsers(localStorage.getItem('token')).subscribe((data: any) => {
      //console.log(data)
      this.usersArr = data.users;
      //console.log(this.usersArr)
    });
  }

  estadGlobales(){
    this.get.getEstadGlobales(localStorage.getItem('token')).subscribe((data: any) => {
      //console.log(data)
      this.usuarios =  data.usuarios;
      this.avance =  data.avance;
      this.cursos =  data.totalCursos;
      this.calificacion =  data.promedioCalificacion;
      this.tiempo =  data.promedioTiempo;
      this.intentos =  data.promedioIntentos;
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
      };

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
      };
      Swal.close();
      this.helpers.goTop();
    });
  }
  /*certifications() {
    //this.certificaciones = [];
    let json={}
    this.get.getCertifications(localStorage.getItem('token')).subscribe(
      (data: any) => {
        console.log(data);
        this.certificaciones = data;
        for (let item of this.certificaciones){
          this.cursos2.push({iduser:data.idCertification,name:data.title})
          console.log(this.cursos2)
          let id=item.idCertification;
          this.get.getEstadCurso(id, localStorage.getItem('token')).subscribe(
            (data: any) => {
              console.log(data);

            }
          )
        }
      }
    );
  }*/

  /*estadCurso(id: any) {
    this.get.getEstadCurso(id, localStorage.getItem('token')).subscribe(
      (data: any) => {
        console.log(data);
      }
    )
  }*/
  

  estadisticas(){
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
  
  estadisticasCurso(id:any){
    this.get.getEstadCurso(id, localStorage.getItem('token')).subscribe(
      (data: any) => {
        console.log(data);
            //this.allModules = data;
            //console.log(this.allModules)
      }
    )
  }

  estadModulo(id: any) {
    console.log(id)
  
    this.get.getEstadModulo(id, localStorage.getItem('token')).subscribe(
      (data: any) => {
        console.log(data);
        this.modulos = data;
        this.modCount = data.length;
        console.log(this.modulos)
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
  
}
