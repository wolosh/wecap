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
  ApexChart,
  ApexXAxis,
  ApexTitleSubtitle
} from "ng-apexcharts";


export type ChartOptions = {
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

  @ViewChild('chart') chart = ChartComponent;
  public chartUsuarios: Partial<ChartOptions> | any;
  public chartPromedios: Partial<ChartOptions> | any;
  usuarios: any;

  constructor(private get: GetService, public helpers: HelpersService, private formBuilder: FormBuilder, private session: SessionService, private route: Router) {
    this.chartUsuarios = {
      series: [44, 55, 13, 43, 22],
      chart: {
        type: "donut"
      },
      labels: ["Team A", "Team B", "Team C", "Team D", "Team E"],
      title: {
        text: "Numero de usuarios"
      },
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 200
            },
            legend: {
              position: "bottom"
            }
          }
        }
      ]
    };
    this.chartPromedios = {
      series: [
        {
          name: "My-series",
          data: [10, 41, 35, 51, 49, 62, 69, 91, 148]
        }
      ],
      chart: {
        height: 350,
        type: "bar"
      },
      title: {
        text: "Promedio"
      },
      xaxis: {
        categories: ["Jan", "Feb",  "Mar",  "Apr",  "May",  "Jun",  "Jul",  "Aug", "Sep"]
      }
    };
  }

  ngOnInit(): void {
    this.helpers.goTop();
    if (localStorage.getItem('type') == '1') {
      this.helpers.type = localStorage.getItem('type');
      //this.users();
      this.estadisticasCurso();
      this.estadGlobales();
      this.estadCurso(1);
      this.estadModulo(1);
    }
  }

  users(){
    this.get.getUsers(localStorage.getItem('token')).subscribe((data: any) => {
      console.log(data)
      this.usersArr = data.users;
      console.log(this.usersArr)
    });
  }

  estadisticasCurso(){
    this.get.getEstadisticas(localStorage.getItem('token')).subscribe((data: any) => {
      console.log(data)
      this.coursesArr =  data.records;
      console.log(this.coursesArr);
    });
  }

  estadGlobales(){
    this.get.getEstadGlobales(localStorage.getItem('token')).subscribe((data: any) => {
      console.log(data)
      this.usuarios =  data.usuarios;
      console.log(this.usuarios);
    });
  }

  estadCurso(id: any) {
    //console.log(id)
    this.get.getEstadCurso(id, localStorage.getItem('token')).subscribe(
      (data: any) => {
        console.log(data);
        //this.allModules = data;
        //console.log(this.allModules)
      }
    );
  }

  estadModulo(id: any) {
    //console.log(id)
    this.get.getEstadModulo(id, localStorage.getItem('token')).subscribe(
      (data: any) => {
        console.log(data);
        //this.allModules = data;
        //console.log(this.allModules)
      }
    );
  }
}
