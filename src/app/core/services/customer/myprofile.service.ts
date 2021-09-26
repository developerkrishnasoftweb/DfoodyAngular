import { Injectable } from '@angular/core';
import { MyProfileModel } from '@core/models/customer';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ApiService } from '../api.service';

@Injectable({
  providedIn: 'root'
})
export class MyprofileService {

  private fullname: any;

  constructor(private _apiService: ApiService) { }

  set userFullName(value) {
    this.fullname = value;
  }
  get userFullName() {
    return this.fullname;
  }

  getMyProfile(): Observable<any> {
    return this._apiService.MyProfile.getAll(null, null).pipe(map(response => response));
  }


  updateProfileInfo(MyProfileModel: MyProfileModel): Observable<any> {
    return this._apiService.UpdateProfile.update(MyProfileModel, null, null).map(response => response)
  }

}
