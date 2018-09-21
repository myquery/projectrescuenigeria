import { Component, OnInit } from '@angular/core';
import { Router, NavigationStart, NavigationEnd, NavigationError, NavigationCancel } from '@angular/router'



@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  body: HTMLBodyElement = document.getElementsByTagName('body')[0];

  constructor( private router : Router) {
      
   }

  ngOnInit() {
   
   
  }
  
 
}
