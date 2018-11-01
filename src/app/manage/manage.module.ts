import { NgModule } from '@angular/core';
import { AuthGuard } from './../auth/shared/auth.guard';
import { Routes , RouterModule} from '@angular/router';
import { ManageComponent } from './manage.component';
import { ManageBookingsComponent } from './manage-bookings/manage-bookings.component';
import { ManageRentalsComponent } from './manage-rentals/manage-rentals.component';
import { CommonModule } from '@angular/common';

const routes: Routes = [
    {path: 'manage', component: ManageComponent , children : [
        {path : 'bookings', component: ManageBookingsComponent,canActivate: [AuthGuard]},
        {path : 'rentals', component: ManageRentalsComponent ,canActivate: [AuthGuard]}
    ]},
  ]

@NgModule({
    declarations:[
        ManageComponent,
        ManageBookingsComponent, 
        ManageRentalsComponent
    ],
    imports:[
        RouterModule.forChild(routes),
        CommonModule
    ],
    providers:[]
})
export class ManageModule {}
