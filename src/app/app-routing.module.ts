import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '@core/guards/auth-guard.service';
import { AboutUsComponent } from './about-us/about-us.component';
import { BranchComponent } from './branch/branch.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { MenuComponent } from './menu/menu.component';
import { MyProfileComponent } from './my-profile/my-profile.component';
import { ReservationComponent } from './reservation/reservation.component';
import { ShopComponent } from './shop/shop.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'about', component: AboutUsComponent },
  { path: 'reservation', component: ReservationComponent, canActivate: [AuthGuard] },
  {
    path: 'brands',
    loadChildren: () => import('../app/foodmenu/foodmenu.module').then(m => m.FoodmenuModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'branch',
    component: BranchComponent, canActivate: [AuthGuard]
  },
  {
    path: 'menu',
    component: MenuComponent, canActivate: [AuthGuard]
  },
  { path: 'shop', component: ShopComponent },
  { path: 'myprofile', component: MyProfileComponent, canActivate: [AuthGuard] },
  { path: '**', component: HomeComponent }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
