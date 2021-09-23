import { Injectable } from '@angular/core';
import { CustomerLoginReqModel } from '@core/models/customer';
import { Observable } from 'rxjs';
import { ApiService } from '../api.service';

@Injectable({
  providedIn: 'root'
})
export class CustomerLoginService {

  constructor(private _apiService: ApiService) { }

  login(CustomerLoginReqModel: CustomerLoginReqModel): Observable<any> {
    return this._apiService.CustomerLogin.create(CustomerLoginReqModel, null, null).map(response => response)
  }

}
