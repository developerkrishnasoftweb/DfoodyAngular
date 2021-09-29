import { HttpErrorResponse } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { CustomerInfo } from '@core/models/customer';
import { CustomerDataPreFillService } from '@core/services/customer/customer-data-pre-fill.service';
import { MyprofileService } from '@core/services/customer/myprofile.service';
import { UserLoginService } from '@core/services/user-login.service';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  isUserLogin;

  constructor(public userLoginService: UserLoginService,
    public preFillService: CustomerDataPreFillService,
    private router: Router) { }

  @ViewChild('loginButton') private loginButton: ElementRef;

  ngOnInit(): void {
    this.userLoginService.isUserLoggedInFlag_.subscribe(value => {
      this.isUserLogin = value;
    });
  }

  menuClick() {
    if (this.isUserLogin)
      this.router.navigate(['/foodmenu']);
    else {
      if (this.loginButton)
        this.loginButton.nativeElement.click();
    }
  }

  logout() {
    this.userLoginService.logout();
    this.router.navigate(['home']);
  }

}
