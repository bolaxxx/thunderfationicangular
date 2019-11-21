import { Component, OnInit } from '@angular/core';
import { PlanDieta } from '../model/plan-dieta';
import { PlandietaService } from '../service/plandieta.service';
import { AuthService } from '../service/auth.service';
import { Ingrediente } from '../model/ingrediente';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {
  public  ingredientes: Ingrediente[];
  constructor(private plandietaService: PlandietaService, private authservice: AuthService) {}

  ngOnInit(): void {
   this.plandietaService.getlistaCompra(this.authservice.getusuario().id).subscribe(response=>{
    this.ingredientes=response;
    console.log(response);
   });
  }
}
