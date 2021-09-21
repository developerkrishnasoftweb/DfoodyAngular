import { Injectable } from '@angular/core';
import { ICurrentUser } from '@core/models/account';
import { IJwtInfo } from '@core/models/jwt-auth.model';
import { JwtAuthService } from 'src/app/core/services/jwt-auth.service';
import { Constants } from 'src/app/core/utils/constants';

@Injectable({
  providedIn: 'root'
})
export class GetUserDetailsService {
  decodeJWT: IJwtInfo;
  // userDetail = ConstantsAnalytics.getUserDetails;


  constructor(private readonly jwtAuthService: JwtAuthService) { }

  userDetails(): ICurrentUser {
    const userDetail = {} as ICurrentUser;
    userDetail.userId = this.getUserCCID();
    // userDetail.branchType = this.CheckForNCCRole();
    // userDetail.branchCode = this.getUserOpratBranch();
    userDetail.branchName = '';
    return userDetail;
  }

  getUserCCID(): string {
    this.decodeJWT = this.jwtAuthService.getDecodedCurUserJWTToken();
    return this.decodeJWT != null ? this.decodeJWT.sub : '';
  }


  getTokenISS(): string {
    this.decodeJWT = this.jwtAuthService.getDecodedCurUserJWTToken();
    // using role array
    // const country = this.decodeJWT.role[0].substring(this.decodeJWT.role[0].length - 3);
    return this.decodeJWT.countryId != null ? this.decodeJWT.countryId : '';
  }

  // CheckForNCCRole(): string {
  //    let userRole =  this.userDetail.branch;
  //    const staffRole =  this.decodeJWT.scopes;
  //    if (staffRole.length > 0) {
  //       const filterRole = staffRole.filter(role => role === Constants.staffRoles.ncc);
  //       userRole = filterRole.length > 0 ?  this.userDetail.ncc :  this.userDetail.branch ;
  //    }
  //    return userRole;
  // }

  // getUserOpratBranch(): string {
  //   let branch = '';
  //   if (localStorage.hasOwnProperty(this.userDetail.staffOpeBranch)) {
  //     branch = localStorage.getItem(this.userDetail.staffOpeBranch);
  //   }
  //   return branch ;
  // }
}
