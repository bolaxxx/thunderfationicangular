import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', loadChildren: './tabs/tabs.module#TabsPageModule' },
  { path: 'login', loadChildren: './login/login.module#LoginPageModule' },
  { path: 'comidadetalle/:id', loadChildren: './comidadetalle/comidadetalle.module#ComidadetallePageModule' },
  { path: 'platodetails', loadChildren: './platodetails/platodetails.module#PlatodetailsPageModule' },
  { path: 'cambioplato/:id', loadChildren: './cambioplato/cambioplato.module#CambioplatoPageModule' },
  { path: 'detallecambio', loadChildren: './detallecambio/detallecambio.module#DetallecambioPageModule' }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
}) 
export class AppRoutingModule {}
