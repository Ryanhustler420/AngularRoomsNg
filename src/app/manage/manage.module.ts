import { NgModule } from '@angular/core';
import { AuthGuard } from './../auth/shared/auth.guard';
import { Routes , RouterModule} from '@angular/router';
import { ManageComponent } from './manage.component';
import { ManageBookingsComponent } from './manage-bookings/manage-bookings.component';
import { ManageRentalsComponent } from './manage-rentals/manage-rentals.component';
import { CommonModule } from '@angular/common';
import { RentalService } from './../rental/Shared/rental.service';
import { BookingService } from './../booking/shared/booking.service';
import { NgPipesModule } from 'ngx-pipes';
import { FormatDatePipe } from './../common/pipes/format-date.pipe';
import { ManageRentalBookingComponent } from './manage-rentals/manage-rental-booking/manage-rental-booking.component';

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
        ManageRentalsComponent,
        FormatDatePipe,
        ManageRentalBookingComponent
    ],
    imports:[
    RouterModule.forChild(routes),
        CommonModule,
        NgPipesModule
    ],
    providers:[RentalService,BookingService]
})
export class ManageModule {}
