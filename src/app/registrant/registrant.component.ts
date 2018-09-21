import { Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs/Observable';
import * as firebase from 'firebase/app';
import {Member} from '../member.model'
import {SlimLoadingBarService} from 'ng2-slim-loading-bar';

import {MemberService } from '../member-service.service'


@Component({
  selector: 'app-registrant',
  templateUrl: './registrant.component.html',
  styleUrls: ['./registrant.component.css']
})



export class RegistrantComponent  implements OnInit {
  projectrescuenigeriaForm: FormGroup
 
  regMembers : Member[] = [];

  allStates : any;
  stateLga : any;
  isLga : boolean = false;

 
  $key= null;
  surname = '';
  firstname = '';
  email = '';
  phone = null;
  gender = '';
  state='';
  lga = '';
  voters_reg_number='';
  


  constructor(public fb: FormBuilder, 
              private loader: SlimLoadingBarService,
              private selectedMember : MemberService){
                this.loadIndicator()  
         this.$key = selectedMember.member.$key;
         this.surname = selectedMember.member.surname;
         this.firstname = selectedMember.member.firstname;
         this.email = selectedMember.member.email;
         this.phone = selectedMember.member.phone;
         this.gender = selectedMember.member.gender;
         this.lga = selectedMember.member.lga;
         this.state = selectedMember.member.state;
         this.voters_reg_number = selectedMember.member.voters_reg_number;
   
  }

  

  ngOnInit(){
    this.endIndicator()
    this.getState();
   this.projectrescuenigeriaForm = this.fb.group({
      
    surname: ['', Validators.required],
    firstname: ['', Validators.required],
    email: ['', Validators.required],
    phone : ['', Validators.required],
    gender: ['', Validators.required],
    lga : ['', Validators.required],
    state: ['', Validators.required],
    voters_reg_number: ['', Validators.required],

  
  
  })

  
 
  }

  addParticipant(value){
    let emailPattern = "\^[0-9A-Za-z]+\(@)\^[A-Za-z]+\\.\^[a-z]";
    
    this.surname = value.surname;
    this.firstname = value.firstname

    let validEmail;

    this.selectedMember.insertMembers(value)
    
  }

  getState(){
    this.selectedMember.getState()
    .subscribe(stateItem =>{
      this.allStates = stateItem;

      console.log(stateItem)
    })
  }

  getStateLga(event){
     this.selectedMember.getLga(event)
    .subscribe((lga) => {
      this.stateLga = lga
      this.isLga = true;
     console.log(lga)
    })
  }


 loadIndicator(){
  this.loader.start()
}
endIndicator(){
 this.loader.complete() 
}

  
}

