import { Injectable } from '@angular/core';
import { ChangePasswordReqModel, MyProfileModel } from '@core/models/customer';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ApiService } from '../api.service';

@Injectable({
  providedIn: 'root'
})
export class MyprofileService {

  constructor(private _apiService: ApiService) { }

  getMyProfile(): Observable<any> {
    return this._apiService.MyProfile.getAll(null, null).pipe(map(response => response));
  }

  updateProfileInfo(MyProfileModel: MyProfileModel): Observable<any> {
    return this._apiService.UpdateProfile.update(MyProfileModel, null, null).map(response => response)
  }

  changePassword(ChangePasswordReqModel: ChangePasswordReqModel): Observable<any> {
    return this._apiService.CustomerChangePassword.create(ChangePasswordReqModel, null, null).map(response => response)
  }

}
