import { Component, OnInit, ViewChild , ElementRef, AfterViewInit} from '@angular/core';
import { ChartDataSets, ChartOptions } from 'chart.js';
import { Color, Label, SingleDataSet, BaseChartDirective, ChartsModule } from 'ng2-charts';
import { AuthService } from '../service/auth.service';
import { MedicionGeneralService } from '../service/medicion-general.service';
import { MedicionespecificaService } from '../service/medicionespecifica.service';
import { Cita } from '../model/cita';
import { CitaService } from '../service/cita.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {
  public chart: BaseChartDirective;
  public cita: Cita = new Cita();
  public lineChartData: ChartDataSets[] = [{data: [], label: 'Peso Actual'},
  {data: [ ] , label: 'Tension min'},
  {data: [ ] , label: 'Tension max '},
  {data: [ ] , label: 'ICC'},
  {data: [ ] , label: 'IMC'},
  {data: [ ] , label: 'Cintura'},
  {data: [ ] , label: 'Cadera'},
  {data: [ ] , label: '%Grasas'}];
  lineChartData2: ChartDataSets[] = [{data: [], label: 'Grasas Id Min'},
 {data: [ ] , label: 'Grasas Id Max'},
 {data: [ ] , label: 'Grasas Visceral'},
 {data: [ ] , label: 'Grasas'},
 {data: [ ] , label: '%Grasas'}];
 lineChartData3: ChartDataSets[] = [{data: [], label: 'Musculo'},
 {data: [ ] , label: 'Musculo Id Max'},
 {data: [ ] , label: 'Musculo Id Min'},
 {data: [ ] , label: 'Poxmus Max'},
 {data: [ ] , label: 'Poxmus Min'},
 {data: [ ] , label: 'Masa Osea'}];
    public lineChartLabels: Label[] = [];
    public lineChartLabels2: Label[] = [];




    public lineChartOptions: ChartOptions = {
      responsive: true
    };
    public lineChartColors: Color[] = [
      {
        borderColor: 'black',
        backgroundColor: 'rgba(255,0,0,0.3)'
      }
    ];
    public lineChartLegend = true;
    public lineChartType = 'line';
    public lineChartPlugins = [];
    public nombre:string;
    public apellido:string ;
    public  telefeno:string;
  constructor( private authserv: AuthService,
               private medicionGeneralService: MedicionGeneralService,
               private medicionEspecificaservice: MedicionespecificaService,
               private citaservice: CitaService) {}
               ngOnInit() {
               this.citaservice.buscarProximaCita().subscribe(response => {console.log(JSON.stringify(response));
                                                                           this.cita = response;
                                                                          console.log(JSON.stringify(this.cita) + 'cita');});
               this.updateChart2();
               this.updateChart();
}
public updateChart2() {
  this.medicionGeneralService.getMedciones(this.authserv.getusuario().id).subscribe(mediciones => {
    const pesoactualdata: number[] = [ ];
    const tennsionmmindata: number [] = [];
    const tensionmaxdata: number [] = [];
    const porcentajegrasasdata: number [] = [];
    const imcdata: number [] = [];
    const iccdata: number [] = [];
    const cinturadata: number[] = [];
    const caderadata: number [] = [];

    mediciones.forEach(medicion => {
  console.log(medicion.fecha.toString() + 'medicion individual ');
  console.log(medicion.tensionmax + ' tension maxima');
  pesoactualdata.push(medicion.pesoactual);
  tennsionmmindata.push(medicion.tensionmin);
  tensionmaxdata.push(medicion.tensionmax);
  console.log(medicion.imc + 'el imc ');
  imcdata.push(medicion.imc);
  iccdata.push(medicion.icc);
  cinturadata.push(medicion.cintura);
  caderadata.push(medicion.cadera);
  porcentajegrasasdata.push(medicion.porcentajegrasas);
  this.lineChartLabels.push(medicion.fecha.toString());
});
    console.log(this.lineChartData.toString() + 'antes de asignar');
    console.log(imcdata + ' imc data');
    this.lineChartData[0].data = pesoactualdata;
    this.lineChartData[1].data = tennsionmmindata;
    this.lineChartData[2].data = tensionmaxdata;
    this.lineChartData[3].data = iccdata;
    this.lineChartData[4].data = imcdata;
    this.lineChartData[5].data = cinturadata;
    this.lineChartData[6].data = caderadata;
    this.lineChartData[7].data = porcentajegrasasdata;
    console.log(this.lineChartData.toString() + 'despues de asignar');
     });
}
public  updateChart(): void {
  this.lineChartLabels2 = [];
  this.medicionEspecificaservice.getMedciones(this.authserv.getusuario().id).subscribe(mediciones => {

    const grasasidmaxdata: number[] = [ ];
    const grasasidmindata: number [] = [];
    const grasasvisceraldata: number[] = [];
    const grasasdata: number [] = [];
    const porcentajegrasasdata: number [] = [];
    const musculodata: number [] = [];
    const musculoidmaxdata: number [] = [];
    const musculoidmindata: number[] = [];
    const poxmusmaxdata: number [] = [];
    const poxmusmindata: number[] = [];
    const masaoseadata: number [] = [];
    mediciones.forEach(medicion => {
console.log(medicion.fecha.toString() + 'medicion individual ');
console.log(medicion.id + ' id');
grasasidmaxdata.push(medicion.grasaidmax);
grasasidmindata.push(medicion.grasasidmin);
grasasvisceraldata.push(medicion.grasavisceral);
grasasdata.push(medicion.grasas);
musculodata.push(medicion.musculo);
musculoidmaxdata.push(medicion.musculoidmax);
musculoidmindata.push(medicion.musculoidmin);
poxmusmaxdata.push(medicion.poxmusmax);
poxmusmindata.push(medicion.poxmusmin);
masaoseadata.push(medicion.masaosea);
porcentajegrasasdata.push(medicion.porcentajegrasa);
this.lineChartLabels2.push(medicion.fecha.toString());
});


    console.log(this.lineChartData2.toString() + 'antes de asignar');
    this.lineChartData2[0].data = grasasidmindata;
    this.lineChartData2[1].data = grasasidmaxdata;
    this.lineChartData2[2].data = grasasvisceraldata;
    this.lineChartData2[3].data = grasasdata;
    this.lineChartData2[4].data = porcentajegrasasdata;

    this.lineChartData3[0].data = musculodata;
    this.lineChartData3[1].data = musculoidmaxdata;
    this.lineChartData3[2].data = musculoidmindata;
    this.lineChartData3[3].data = poxmusmaxdata;
    this.lineChartData3[4].data = poxmusmindata;
    this.lineChartData3[5].data = masaoseadata;
    console.log(this.lineChartData2.toString() + 'despues de asignar');
   });

}
}
