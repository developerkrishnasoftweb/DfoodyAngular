import { Injectable } from '@angular/core';
import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ValidationService {

  static emailValidator(control: any) {
    if (control.value === null || control.value === "") return null;
    var ctrl = control.value.trim();
    if (ctrl.match(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/) || ctrl.match(/^[A-Z-a-z]+@[a-zA-Z0-9:\[\]]{3,50}$/)) {
      return null;
    } else {
      return { 'invalidEmailAddress': true };
    }
  }

}



