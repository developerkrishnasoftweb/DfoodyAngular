import { Injectable } from '@angular/core';
import { CustomerRegistrationReqModel } from '@core/models/customer';
import { Observable } from 'rxjs';
import { ApiService } from '../api.service';

@Injectable({
  providedIn: 'root'
})
export class CustomerRegistrationService {

  constructor(private _apiService: ApiService) { }

  registration(CustomerRegistrationReqModel: CustomerRegistrationReqModel): Observable<any> {
    return this._apiService.CustomerRegistration.create(CustomerRegistrationReqModel, null, null).map(response => response)
  }

  getIPAddress() {
    return this._apiService.IPAddress.getAll().map(response => response)
  }

  checkIsEmailExist(email: string): Observable<any> {
    return this._apiService.IsEmailExist(email).create(null, null, null).map(response => response)
  }

  checkIsMobileExist(mobile: string): Observable<any> {
    return this._apiService.IsMobileNoExist(mobile).create(null, null, null).map(response => response)
  }

}
