import { Component } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { Router } from '@angular/router';
import { routerNgProbeToken } from '@angular/router/src/router_module';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {

  constructor(private authservice: AuthService,private route:Router) {
    if(this.authservice.isAuthenticated() !== true){
      this.route.navigateByUrl('/login');
    }
  }

  logout(){
    this.authservice.logout();
    this.route.navigateByUrl('/login');
  }

}
