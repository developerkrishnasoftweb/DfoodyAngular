import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ApiService } from '../api.service';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private _apiService: ApiService) { }

  getOrderList(): Observable<any> {
    return this._apiService.GetOrderList.getAll(null, null).pipe(map(response => response));
  }
}
