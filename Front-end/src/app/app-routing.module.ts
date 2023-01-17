import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ProfileComponent} from './profile/profile.component'
import {TablePartComponent} from './table-part/table-part.component'

const routes: Routes = [
  {
    path:'',
    pathMatch:'full',
    redirectTo:'table-part'
  },
  {
    component : ProfileComponent,
    path: 'profile/:employeeId'
  },
  {
    path:'table-part',
    component:TablePartComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
