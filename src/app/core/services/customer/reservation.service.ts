import { Injectable } from '@angular/core';
import { ReservationReqModel } from '@core/models/customer';
import { Observable } from 'rxjs';
import { ApiService } from '../api.service';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {

  constructor(private _apiService: ApiService) { }

  booATable(ReservationReqModel: ReservationReqModel): Observable<any> {
    return this._apiService.BookaTable.create(ReservationReqModel, null, null).map(response => response)
  }

  GetTimeSlot(id) {
    return this._apiService.TimeSlot(id).getAll().map(response => response);
  }

  GetTableList(obj) {
    return this._apiService.GetTableList.getAll(obj).map(response => response);
  }

  GetPaymentType() {
    return this._apiService.GetPaymentType.getAll().map(response => response);
  }
}
