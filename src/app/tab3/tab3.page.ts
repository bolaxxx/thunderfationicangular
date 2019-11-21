import { Component, OnInit } from '@angular/core';
import { PlanDieta } from '../model/plan-dieta';
import { AuthService } from '../service/auth.service';
import { PlandietaService } from '../service/plandieta.service';
import { DiaDieta } from '../model/diadieta';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit{
  information: any[];
  automaticClose = false;
  plan: PlanDieta =new PlanDieta();
  dayopened:boolean[];
  selectedDay:number;
  selectedMeal:number;
  constructor(private authservice: AuthService,private plandietaService: PlandietaService, private route: Router) {}
  ngOnInit(): void {
    this.plandietaService.getCurrentPlanByPaciente(this.authservice.getusuario().id).subscribe(response => {
       this.information = response.dias;
       this.plan = response;
     
      }  );
    //throw new Error("Method not implemented.");
  }

  openPage(i){
    console.log('openpage 1'+this.selectedDay+'selected day value  ');
    if(this.selectedDay==i){
      this.selectedDay=-1;
    }else{
    this.selectedDay=i;
    }
  }
  gocomida(i){
    this.route.navigate(['tabs/tab3/comidadetalle/', i.id]);
  }
}
