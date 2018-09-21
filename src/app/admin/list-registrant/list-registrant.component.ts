import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router, ActivatedRoute} from '@angular/router'
import { AngularFireObject, AngularFireList, AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs/Observable';
import * as firebase from 'firebase/app';
import {SlimLoadingBarService} from 'ng2-slim-loading-bar';

import {MemberService} from '../../member-service.service';
import {Member} from '../../member.model';

//import {ComposeMessageComponent} from '../compose-message/compose-message.component'

@Component({
  selector: 'app-list-registrant',
  templateUrl: './list-registrant.component.html',
  styleUrls: ['./list-registrant.component.css']
})
export class ListRegistrantComponent implements OnInit {

  registeredMembers : Member[];
  participant : Observable<any>;
  regUsers : any
  callme  : any
  smsme : any  
  mailForm : FormGroup
  mailSubject: string
  mailBody: string
  mailCount:number = 0
  idx: string
  mailName : string

  @Input('show-modal') showModal: boolean;
  @Input('title') title: string;
  @Input('sub-title') subTitle: string;
  @Input('cancel-label') cancelLabel: string;
  @Input('positive-label') positiveLabel: string;

  @Output('closed') closeEmitter: EventEmitter < ModalResult > = new EventEmitter < ModalResult > ();
  //@Output('loaded') loadedEmitter: EventEmitter < Modal > = new EventEmitter < Modal > ();
  @Output() positiveLabelAction = new EventEmitter();
      
  constructor(private afDB : AngularFireDatabase, 
              private router: Router, 
              private loader: SlimLoadingBarService,
              private route : ActivatedRoute,
              private fb: FormBuilder,
              private listMembers : MemberService
              ) {

  }
  

  ngOnInit() {

    this.mailForm = this.fb.group({
      mailSubject : '',
      mailBody: ''
    })

    this.loadIndicator()

    let members = this.listMembers.getMembers()
                                  .snapshotChanges()
                                  .subscribe(items =>{
                                    this.registeredMembers = [];
                                    items.forEach(item =>{
                                      let itemJson = item.payload.toJSON();
                                      itemJson["$key"] = item.key;
                                      this.registeredMembers.push(itemJson as Member);
                                      this.endIndicator()
                                    })
                                  })
    
    // this.participant = this.afDB.list('/participants').valueChanges()
    //   this.participant.map(users => {
    //     users 
    //     //console.log(users.$key)
      
    //   } )
    //   .subscribe((user) => {
    //     console.log(user)
    //     this.regUsers = user
    //     //this.mailName = this.regUsers[this.idx].name
        
    //     this.endIndicator()
      
    //   })

      //this.participant = this.afDB.list('/participants')
    }


    sendMail(value){
      this.mailSubject = value.mailSubject;
      this.mailBody = value.mailBody;
      const {subject, compose} = value;
      const html = `
      <div style="backgroud-color: #f9f9f9; padding: 10px; margin: 10px; font-size: 12px; border: 1px solid #ccc; border-radius: 5px">
      <h3>From: Rosaline Obianuju. <noreply@moneybasic.net></h3>
      <h2>Subject: ${subject}</h2>
      <hr>
      ${compose}
      </div>
    `;

    let formRequest = { subject, compose,  html };
    const mailSending = this.afDB.object('/participants'+ this.idx)
          mailSending.update(formRequest )
    }

  signOut (){
  localStorage.removeItem('money-token');
  this.router.navigate(['/'])
  
  }

 loadIndicator(){
  this.loader.start()
  }
  endIndicator(){
  this.loader.complete() 
    }
   
    show(id) {
      console.log(id)
      this.showModal = true;
    }
  
    hide() {
      this.showModal = false;
      this.closeEmitter.next({
        action: ModalAction.POSITIVE
      });
    }
  
    positiveAction() {
      this.positiveLabelAction.next(this);
      return false;
    }
  
    cancelAction() {
      this.showModal = false;
      this.closeEmitter.next({
        action: ModalAction.CANCEL
      });
      return false;
    }
  
  


}
  export enum ModalAction { POSITIVE, CANCEL }
  
  export interface ModalResult {
    action: ModalAction;
  }
 