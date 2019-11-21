import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { PlatoPlanDieta } from '../model/plato-plan-dieta';

@Component({
  selector: 'app-platodetails',
  templateUrl: './platodetails.page.html',
  styleUrls: ['./platodetails.page.scss'],
})
export class PlatodetailsPage implements OnInit {
plato:PlatoPlanDieta;
  constructor(private navParams: NavParams, public viewCtrl: ModalController) { }

  ngOnInit() {
   this.plato = this.navParams.get('plato');
  }
  dismiss() {
     this.viewCtrl.dismiss({plato: this.plato});
    }
}
