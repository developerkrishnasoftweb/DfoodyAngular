import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { CustomerInfo } from '@core/models/customer';
import { MyprofileService } from '@core/services/customer/myprofile.service';
import { UserLoginService } from '@core/services/user-login.service';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.scss']
})
export class MyProfileComponent implements OnInit {

  customerInfo: CustomerInfo;

  constructor(private myprofileService: MyprofileService, private userLoginService: UserLoginService) { }

  ngOnInit(): void {
    this.getProfileData();
  }

  getProfileData(): void {
    this.myprofileService.getMyProfile()
      .pipe(finalize(() => {
        // tslint:disable-next-line: deprecation
      })).subscribe((response: CustomerInfo) => {
        console.log(response);
        this.customerInfo = response;
        if (this.customerInfo) {
          this.customerInfo.fullName = this.customerInfo.firstName + ' ' + this.customerInfo.lastName;
          this.myprofileService.userFullName = this.customerInfo.fullName;
        }
      }, error => {
        if (error instanceof HttpErrorResponse) {
          console.log(error);
        }
      });
  }

}
