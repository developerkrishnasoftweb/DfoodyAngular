import { Injectable } from '@angular/core';
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
}
