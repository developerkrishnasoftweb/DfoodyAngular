import { Injectable } from '@angular/core';
import { ConfigurationModel } from '@core/models/customer';

@Injectable({
  providedIn: 'root'
})
export class CustomerDataPreFillService {

  private fullname: any;

  public configurationData: ConfigurationModel;

  constructor() { }

  set userFullName(value) {
    this.fullname = value;
  }

  get userFullName() {
    return this.fullname;
  }

  set userConfigurationData(value) {
    this.configurationData = value;
  }

  get userConfigurationData() {
    return this.configurationData;
  }
}
