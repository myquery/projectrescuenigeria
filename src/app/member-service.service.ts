import { Injectable } from '@angular/core';
import { AngularFireObject, AngularFireList, AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import {Member} from './member.model';
import {Http, Headers, RequestOptions} from '@angular/http';
import {HttpClient} from '@angular/common/http';

import {Observable} from 'rxjs/Rx';
import 'rxjs/add/operator/catch';

import {Config} from './api'


@Injectable()
export class MemberService{
  participant: AngularFireList<any>;

  member : Member = new Member();
  authState :any = null;
  constructor(private afDB : AngularFireDatabase,
              private loginAuth : AngularFireAuth,
              private http: HttpClient) { 
    this.participant = this.afDB.list('/registrants');
    this.loginAuth.authState.subscribe(auth=>{
      this.authState = auth;
    })
  }

  getMembers(){
  this.participant = this.afDB.list('/registrants');
  return this.participant;
  }

  insertMembers(members : Member){
    const {$key, surname, firstname, email, phone, gender, lga, state, voters_reg_number} = members;
    const date = Date();
    const pinId = Math.floor(Math.random()*9000000 + 1000000);
    const html = `
    <div style="backgroud-color: #f9f9f9; padding: 10px; margin: 10px; font-size: 12px; border: 1px solid #ccc; border-radius: 5px">
    <h3>From: Admin. <noreply@projectrescuenigeria.com></h3>
    <h2>Your Registration Code is: ${pinId}</h2>
    <hr>
     <h3>Welcome onboard!</h3>
     <p>
     You made the right choice to join the movement. 
     
     </p>
   
    </div>
  `;

  let formRequest = {members, date, pinId, html };
  this.participant.push(formRequest);

  }

  loginMembers(email : string, password : string){
   this.loginAuth.auth.signInWithEmailAndPassword(email, password)
  }

  getState(){

    var url =`${Config.api}/states`;
    return this.http.get(url) 


  }

  getLga(state : string){
    let _state = state.toLowerCase()
    var url =`${Config.api}/states/${_state}/lgas`;
    return this.http.get(url)


  }

}
