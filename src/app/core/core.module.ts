import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ApiService } from './services/api.service';
import { UserLoginService } from './services/user-login.service';
import { AuthInterceptorService } from './interceptors/auth-interceptor.service';
import { AuthGuard } from './guards/auth-guard.service';



@NgModule({
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [
    HttpClientModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true
    },
    ApiService,
    UserLoginService,
    AuthGuard,
  //  PreFillService
  ]
})
export class CoreModule { }
