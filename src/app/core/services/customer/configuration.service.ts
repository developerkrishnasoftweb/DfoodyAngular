import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ApiService } from '../api.service';

@Injectable({
  providedIn: 'root'
})
export class ConfigurationService {

  constructor(private _apiService: ApiService) { }

  getConfiguration(): Observable<any> {
    return this._apiService.GetConfiguration.getAll(null, null).pipe(map(response => response));
  }
}
