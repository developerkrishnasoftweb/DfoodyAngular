import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
// import { Constants } from '../../client-maintenance/client-maintenance-contants';
import { ApiService } from './api.service';
import { Observable, Subject } from 'rxjs';
// import { UtilService } from './util.service';
import jwt_decode from 'jwt-decode';
import 'rxjs';

@Injectable({
  providedIn: 'root',
})

export class UserLoginService {
  jwtTokenValue: any;

  private isUserLoggedInFlag = new Subject();
  isUserLoggedInFlag_ = this.isUserLoggedInFlag.asObservable();
  userLoginDetails: any;



  constructor(private _apiService: ApiService, private _router: Router) {
  }

  setUserLoginData(data: any) {
    this.userLoginDetails = data;
  }

  getUesrLoginData() {
    return this.userLoginDetails;
  }

  login(UserLoginModel: any): Observable<any> {
    return this._apiService.userLoginloginmgmt.create(UserLoginModel, null, null).map(response => response)
  }

  isLoggedIn() {
    this.decodeJwt();
    if (this.jwtTokenValue) {
      this.userLoginUpdateBool(this.tokenIsExpired());
      return this.tokenIsExpired();
    } else {
      return false;
    }
  }

  storeJwtToken(userLoginData: any) {
    if (userLoginData != null) {
      if (userLoginData.jwtToken) {
        localStorage.setItem('Authorization', userLoginData.jwtToken);
        localStorage.setItem('operatingBranch', userLoginData.operatingBranch);
        localStorage.setItem('displayName', userLoginData.displayName);
        localStorage.setItem('firstName', userLoginData.firstName);
        localStorage.setItem('surname', userLoginData.surname);
        localStorage.setItem('branchCode', userLoginData.branchCode);
      }
    }
  }

  getCurrentUser() {
    this.decodeJwt();
    if (this.jwtTokenValue) {
      return this.getUserDetails();
    } else {
      return null;
    }
  }

  getUserDisplayDetails() {
    if (this.jwtTokenValue) {
      return { displayName: localStorage.getItem('displayName'), country: localStorage.getItem('country') };
    }
  }
  decodeJwt() {
    var token = null;
    this.jwtTokenValue = null;
    token = localStorage.getItem('Authorization');
    // let token = environment.tokenNAR;
   // this.storeJwtToken(token);
    if (!token)
      return false;

    this.jwtTokenValue = jwt_decode(token);
  }

  tokenIsExpired() {
    if (Date.now() >= this.jwtTokenValue.exp * 1000) {
      return false;
    } else {
      return true;
    }
  }

  getUserDetails() {
    if (this.jwtTokenValue.family_name == 'undefined' && this.jwtTokenValue.unique_name == 'undefined'
      && this.jwtTokenValue.iss == 'undefined') return null;

    return this.jwtTokenValue;
  }

  logout() {
    localStorage.removeItem('Authorization');
    localStorage.removeItem('displayName');
    localStorage.removeItem('country');
    localStorage.removeItem('userName');
    localStorage.removeItem('branchCode');
    this.jwtTokenValue = null;
    this.userLoginUpdateBool(false);
    this.getCurrentUser();
    return false;
  }

  userLogin() {
    this._router.navigateByUrl('/login');
  }

  userLoginUpdateBool(value) {
    this.isUserLoggedInFlag.next(value);
  }

}
