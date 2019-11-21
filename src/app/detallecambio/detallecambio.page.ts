import { Component, OnInit } from '@angular/core';
import { PlatoPredeterminado } from '../model/plato-predeterminado';
import { NavParams, ModalController } from '@ionic/angular';

@Component({
  selector: 'app-detallecambio',
  templateUrl: './detallecambio.page.html',
  styleUrls: ['./detallecambio.page.scss'],
})
export class DetallecambioPage implements OnInit {
  plato: PlatoPredeterminado;
  constructor(private navParams: NavParams, public viewCtrl: ModalController) { }

  ngOnInit() {
    this.plato = this.navParams.get('plato');
  }
  dismiss() {
    this.viewCtrl.dismiss({plato: this.plato});
   }
}
