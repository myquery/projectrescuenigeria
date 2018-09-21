import { Injectable } from '@angular/core';
import { 
        CanActivate,
        Router,
        ActivatedRouteSnapshot,
        RouterStateSnapshot }    from '@angular/router';
import {userList} from './users'


@Injectable()
export class AuthGuardService  implements CanActivate{
  private username: string;
  private password : string;

  constructor(private router: Router){
    
    userList.map(users => {
      this.username = users.username;
      this.password = users.password
    })
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean  {
    console.log('AuthGuard#canActivate called');
    let url: string = state.url;
    
    
    return this.checkLogin(url);
  }

  checkLogin(url: string): boolean {
  let userInfo = JSON.parse(localStorage.getItem('money-token'))
  //console.log(userInfo)
  if(userInfo === null){
    throw "You must login to access the admin area";
    

  }
   if (this.username === userInfo.username  && this.password === userInfo.password  ) { 
        return true; 
       }
    
      // Store the attempted URL for redirecting
      //this.authService.redirectUrl = url;
      
      // Navigate to the login page with extras 
     this.router.navigate(['/adminlogin']);
         
     return false;
      
    
      
   
  }

}
