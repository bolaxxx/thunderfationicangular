import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComidaComponent } from './comida/comida.component';
import { IonicModule } from '@ionic/angular';

@NgModule({
  declarations: [ComidaComponent],
  imports: [
    CommonModule,
    IonicModule
  ],
  exports: [ComidaComponent]
})
export class SharedComponentModule { }
