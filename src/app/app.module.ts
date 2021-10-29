import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { MenuComponent } from './menu/menu.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { SharedModule } from '@shared/shared.module';
import { CoreModule } from '@core/core.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomeComponent } from './home/home.component';
import { ReservationComponent } from './reservation/reservation.component';
import { ShopComponent } from './shop/shop.component';
import { MyProfileComponent } from './my-profile/my-profile.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { CustomerAddressComponent } from './customer-address/customer-address.component';
import { LoaderModule } from '@shared/loader/loader.module';
import { ConfirmDialogModule } from '@shared/confirm-dialog/confirm-dialog.module';
import { OrderComponent } from './order/order.component';
import { OrderDetailComponent } from './order-detail/order-detail.component';
import { ConfirmOrderAddressModalComponent } from './confirm-order-address-modal/confirm-order-address-modal.component';
import { BranchComponent } from './branch/branch.component';
import { ErrorComponent } from './error/error.component';
import { SmallLoaderComponent } from './small-loader/small-loader.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateKeyModule } from '@core/pipes/translate-key/translate-key.module';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegistrationComponent,
    MenuComponent,
    AboutUsComponent,
    ContactUsComponent,
    HomeComponent,
    ReservationComponent,
    ShopComponent,
    MyProfileComponent,
    ChangePasswordComponent,
    CustomerAddressComponent,
    OrderComponent,
    OrderDetailComponent,
    ConfirmOrderAddressModalComponent,
    BranchComponent,
    ErrorComponent,
    SmallLoaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    CoreModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    LoaderModule,
    ConfirmDialogModule,
    HttpClientModule,
    TranslateKeyModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

// required for AOT compilation
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}
