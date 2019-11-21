
import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AuthService } from '../service/auth.service';
import { ComidaService } from '../service/comida.service';
import { ActivatedRoute } from '@angular/router';
import { PlatoPredeterminado } from '../model/plato-predeterminado';
import { PlatodetailsPage } from '../platodetails/platodetails.page';

@Component({
  selector: 'app-cambioplato',
  templateUrl: './cambioplato.page.html',
  styleUrls: ['./cambioplato.page.scss'],
})
export class CambioplatoPage implements OnInit {

  constructor(private authService: AuthService, private comidaService: ComidaService, private router: ActivatedRoute,
              public modalController: ModalController) { }

            cambiosPosibles: PlatoPredeterminado[];
  ngOnInit() {
    this.comidaService.getPosiblesCambios(Number(this.router.snapshot.paramMap.get('id'))).subscribe(
      element=>this.cambiosPosibles=element);
  }
  async viewDetails(plato: PlatoPredeterminado) {
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
