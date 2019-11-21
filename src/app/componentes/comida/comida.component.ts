import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-comida',
  templateUrl: './comida.component.html',
  styleUrls: ['./comida.component.scss'],
})

export class ComidaComponent implements OnInit {
 
  @Input('product') product: any;
 
  constructor() { }

  ngOnInit() {}
  async buyItem(product) {
    //
    console.log(product);
  }

}
