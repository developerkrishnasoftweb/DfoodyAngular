import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CustomerDataPreFillService {

  private fullname: any;

  constructor() { }

  set userFullName(value) {
    this.fullname = value;
  }

  get userFullName() {
    return this.fullname;
  }
}
