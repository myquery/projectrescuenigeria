import { BrowserModule } from '@angular/platform-browser';
import {LocationStrategy, HashLocationStrategy} from '@angular/common'
import { NgModule} from '@angular/core';
import { HttpModule} from "@angular/http";
import {ReactiveFormsModule} from '@angular/forms';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import {SlimLoadingBarModule} from 'ng2-slim-loading-bar';


import { AngularFireModule } from 'angularfire2';

//New imports to update based on AngularFire2 version 4
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';

import {HttpClientModule} from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegistrantComponent } from './registrant/registrant.component';
import { AdminloginComponent } from './adminlogin/adminlogin.component';
import {AdminModule} from './admin/admin.module';
import {AuthGuardService} from './auth-guard.service';
import {MemberService} from './member-service.service';

import {environment } from '../environments/environment'

@NgModule({
  declarations: [
    AppComponent,
    RegistrantComponent,
    AdminloginComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    AngularFontAwesomeModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    HttpModule,
    AppRoutingModule,
    AdminModule,
    HttpClientModule,
    SlimLoadingBarModule.forRoot()

  ],
  providers: [{
    provide: LocationStrategy, useClass : HashLocationStrategy
  }, AuthGuardService, MemberService],
  bootstrap: [AppComponent]
})
export class AppModule { }
