import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ApiService } from '../api.service';

@Injectable({
  providedIn: 'root'
})
export class AddressService {

  constructor(private _apiService: ApiService) { }

  getAddressList(): Observable<any> {
    return this._apiService.GetCustomerAddress.getAll(null, null).pipe(map(response => response));
  }

 
}
