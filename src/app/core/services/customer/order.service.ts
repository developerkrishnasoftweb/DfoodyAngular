import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ApiService } from '../api.service';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private _apiService: ApiService) { }

  getOrderList(model): Observable<any> {
    return this._apiService.GetOrderList.getAll(model).pipe(map(response => response));
  }

  getOrderDetail(id: number): Observable<any> {
    return this._apiService.GetOrderDetail(id).getAll().pipe(map(response => response));
  }
}
