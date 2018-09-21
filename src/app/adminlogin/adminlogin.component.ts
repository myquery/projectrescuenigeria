import { Component, OnInit } from '@angular/core';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import {Router} from '@angular/router';

import {Member} from '../member.model'
import {MemberService} from '../member-service.service';

import {userList} from '../users'


@Component({
  selector: 'app-adminlogin',
  templateUrl: './adminlogin.component.html',
  styleUrls: ['./adminlogin.component.css']
})
export class AdminloginComponent implements OnInit {
  login : FormGroup
  username : string
  password : string
  userList : string
  errMsg: string
  

  constructor(private fb : FormBuilder, private router : Router) {
  
    userList.map(users => {
      this.username = users.username;
      this.password = users.password;
    })

  //this.userList = localStorage.getItem('money-token')
  }

  ngOnInit() {

    this.login = this.fb.group({
      username: ['', Validators.required],
      password : ['', Validators.required]
    })

    
  }

  loginAdmin(value){
   try{
    if(value.username === this.username && value.password === this.password){
      localStorage.setItem('money-token', JSON.stringify({ username: this.username, password : this.password }));
      this.router.navigate(['/admin'])
      
      //localStorage.setItem('money-token', value )
    }
  }catch(ex){
      this.errMsg = ex
    }
    

    

  }




}
