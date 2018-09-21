import { NgModule, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent} from './admin.component'

import {ListRegistrantComponent} from './list-registrant/list-registrant.component';
import {ComposeMessageComponent} from './compose-message/compose-message.component'
import {AuthGuardService} from '../auth-guard.service'


const rootRoutes : Routes = [
    {path: 'admin', 
     component: AdminComponent,
     canActivate :  [AuthGuardService],
     children: [
        {
            path: '',
            redirectTo: 'listregistrant',
            pathMatch: 'full'
          },
          {
            path: 'listregistrant',
            component: ListRegistrantComponent
          }
         
          
     ]

},

{
  path: 'admin/compose',
  component: ComposeMessageComponent,
  outlet: 'popup'
}

]

@NgModule({
    imports: [
      RouterModule.forChild(rootRoutes)
    ],
    exports: [
      RouterModule
    ]
  })
  export class AdminRoutingModule { }