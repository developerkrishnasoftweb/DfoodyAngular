import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/';
import { Subject } from 'rxjs/';

export interface IDatePickerProperties {
   minDate?: Date;
   maxDate?: Date;
   disabledDates?: any;
   selectedDate?: Date;
   disableWeekends?: boolean;
}

@Injectable()
export class DatePickerService {
   defaultProperties: IDatePickerProperties = {
      minDate: new Date("0001-01-01"),
      maxDate: null,
      selectedDate: null,
      disabledDates: null
   };

   currentRef: string;

   private datepickerProperties = new Subject<IDatePickerProperties>();

   private dateEmitter = new Subject<any>();

   constructor() { }

   getDatePickerProperties(): Observable<IDatePickerProperties> {
      return this.datepickerProperties.asObservable();
   }

   getdateEmitter(): Observable<any> {
      return this.dateEmitter.asObservable();
   }

   setDateEmitter(value) {
      var obj = {
         elemRef: this.currentRef,
         value: value
      }
      this.dateEmitter.next(obj);
   }

   getDefaultProperties() {
      return this.defaultProperties;
   }

   setProperties(properties: IDatePickerProperties) {
      this.defaultProperties = Object.assign({}, this.defaultProperties, properties);
      this.datepickerProperties.next(this.defaultProperties);
   }

}
