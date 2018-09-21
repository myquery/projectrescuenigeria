import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Router, NavigationStart, NavigationEnd, NavigationError, NavigationCancel } from '@angular/router'
import {SlimLoadingBarService} from 'ng2-slim-loading-bar';
import {MemberService} from './member-service.service';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers :[MemberService]

})
export class AppComponent implements OnInit, AfterViewInit {
 
  
  constructor(private loader : SlimLoadingBarService, private memberService : MemberService){
    //this.setUser();
  }
  ngOnInit() {
    
    this.loadIndicator();
   
  }

  ngAfterViewInit(){
   this.endIndicator()
  }


  loadIndicator(){
    this.loader.start()
  }
  endIndicator(){
   this.loader.complete() 
  }

   navigationInterceptor(event): void {
    if (event instanceof NavigationStart) {
      this.loadIndicator();
    }
    if (event instanceof NavigationEnd) {
      this.endIndicator();    }
    if (event instanceof NavigationCancel) {
      this.endIndicator();
    }
    if (event instanceof NavigationError) {
      this.endIndicator();
    }
  }

    
}
