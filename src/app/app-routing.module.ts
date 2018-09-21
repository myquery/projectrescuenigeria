import { CommonModule } from '@angular/common';
import { RouterModule, PreloadAllModules} from '@angular/router';
import { NgModule } from '@angular/core';
import {RegistrantComponent} from './registrant/registrant.component';
import {AdminloginComponent} from './adminlogin/adminlogin.component';

@NgModule({
  imports: [
    RouterModule.forRoot([
      { path: '', redirectTo: 'registrant', pathMatch: 'full' },
      { path: 'registrant', component: RegistrantComponent },
      {path: 'adminlogin',  component: AdminloginComponent}
    ], {
      useHash: Boolean(history.pushState) === false,
      preloadingStrategy: PreloadAllModules
    })
  ],
  declarations: [],
  exports: [ RouterModule]
})
export class AppRoutingModule { }