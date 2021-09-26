import { Injectable } from '@angular/core';
import { MyProfileReqModel } from '@core/models/customer';
import { Observable } from 'rxjs';
import { ApiService } from '../api.service';

@Injectable({
  providedIn: 'root'
})
export class MyprofileService {

  constructor(private _apiService: ApiService) { }

  getMyProfile(): Observable<any> {
    return this._apiService.MyProfile.create(null, null, null).map(response => response)
  }
}
