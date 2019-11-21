import { Component, OnInit } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { ComidaService } from '../service/comida.service';
import { Comida } from '../model/comida';
import { Router, ActivatedRoute, Route } from '@angular/router';
import { Plato } from '../model/plato';
import { ModalController } from '@ionic/angular';
import { PlatodetailsPage } from '../platodetails/platodetails.page';

@Component({
  selector: 'app-comidadetalle',
  templateUrl: './comidadetalle.page.html',
  styleUrls: ['./comidadetalle.page.scss'],
})
export class ComidadetallePage implements OnInit {
  comida: Comida = new Comida() ;



  constructor(private authService: AuthService, private comidaService: ComidaService, private router: ActivatedRoute,
              public modalController: ModalController,private route:Router) { }

  ngOnInit() {
    this.comidaService.getComidaByid(Number(this.router.snapshot.paramMap.get('id')))
    .subscribe(response => this.comida = response);

  }
  async viewChanges(plato: Plato) {
   this.route.navigate(['tabs/tab3/cambioplato/', plato.id]);

  }
  async viewDetails(plato: Plato) {
    const modal: HTMLIonModalElement =
       await this.modalController.create({
          component: PlatodetailsPage,
          componentProps: { plato: plato }
    });


    await modal.present();
    modal.onDidDismiss().then(data=>{
     console.log(data)
    });
  }

}
