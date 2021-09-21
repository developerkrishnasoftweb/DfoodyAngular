import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from '@core/services/api.service';


@Injectable()
export class CommonApiService {

    constructor(private readonly apiService: ApiService) {
    }

    GetMDMReferenceDataByMasterCode(referenceDataMasterCode: string): Observable<any> {
        const routeParams = {
            referenceDataMasterCode
        };
        const queryParams = {};
        return this.apiService.ReferenceDataGetByMaserCode.getAll(queryParams, routeParams).map(response => response ? response : []);
    }
}
