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
    return this._apiService.CustomerLogin.create(CustomerRegistrationReqModel, null, null).map(response => response)
  }

  getIPAddress() {
    return this._apiService.IPAddress.getAll().map(response => response)
  }

}
