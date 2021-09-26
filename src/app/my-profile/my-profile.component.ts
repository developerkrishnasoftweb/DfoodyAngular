import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
// import { MyProfileReqModel } from '@core/models/customer';
import { MyprofileService } from '@core/services/customer/myprofile.service';
import { UserLoginService } from '@core/services/user-login.service';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.scss']
})
export class MyProfileComponent implements OnInit {

  constructor(private myprofileService: MyprofileService, private userLoginService: UserLoginService) { }

  ngOnInit(): void {
    this.getProfileData();
  }

  getProfileData(): void {
    // this.myprofileService.getMyProfile().subscribe(res => {
    //   console.log('res ', res);
    // });

    this.myprofileService.getMyProfile()
      .pipe(finalize(() => {
        // tslint:disable-next-line: deprecation
      })).subscribe(response => {
        console.log(response);
      }, error => {
        if (error instanceof HttpErrorResponse) {
         console.log(error);
        }
      });
  }

  createResModel() {
    this.userLoginService.decodeJwt();
    // let myProfileReqModel = new MyProfileReqModel();
    // myProfileReqModel.id = this.userLoginService.jwtTokenValue.nameid;
    // return myProfileReqModel;
  }


}
