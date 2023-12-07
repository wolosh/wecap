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

  @ViewChild("chart") chart: ChartComponent;
  public chartUsuarios: Partial<ChartUsuarios> | any;
  public chartAvances: Partial<ChartAvances> | any;
  public chartPromedios: Partial<any>;
  usuarios: any;
  avance: any;
  cursos: any;
  calificacion: any;
  tiempo: any;
  intentos: any;


  constructor(private get: GetService, public helpers: HelpersService, private formBuilder: FormBuilder, private session: SessionService, private route: Router) {}

  ngOnInit(): void {
    this.helpers.goTop();
    if (localStorage.getItem('type') == '1') {
      this.helpers.type = localStorage.getItem('type');
      //this.users();
      this.estadisticasCurso();
      this.estadGlobales();
      //this.estadCurso(1);
      this.estadModulo(1);
    }
  }

  users(){
    this.get.getUsers(localStorage.getItem('token')).subscribe((data: any) => {
      //console.log(data)
      this.usersArr = data.users;
      //console.log(this.usersArr)
    });
  }

  estadisticasCurso(){
    this.get.getEstadisticas(localStorage.getItem('token')).subscribe((data: any) => {
      //console.log(data)
      this.coursesArr =  data.records;
      for (let curso of this.coursesArr ) {
        this.get.getEstadCurso(curso, localStorage.getItem('token')).subscribe(
          (data: any) => {
            //console.log(data);
            //this.allModules = data;
            //console.log(this.allModules)
          }
        );
      }
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

    });
  }

  /*estadCurso(id: any) {
    //console.log(id)

  }*/

  estadModulo(id: any) {
    //console.log(id)
    this.get.getEstadModulo(id, localStorage.getItem('token')).subscribe(
      (data: any) => {
        console.log(data);
        this.avance =  data.promedioAvance;
        this.calificacion =  data.promedioCalificacion;
        this.tiempo =  data.promedioTiempo;
        //this.allModules = data;
        //console.log(this.allModules)
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
      }
    );
  }
}
