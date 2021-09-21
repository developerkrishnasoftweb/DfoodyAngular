import { NgForm, FormControl } from '@angular/forms';

export class CommonUtility {

   public static markFormControlsTouched(form: NgForm) {
      const controls = form.controls;
      for (const control in controls) {
         if (controls[control] instanceof FormControl) {
            controls[control].markAsTouched();
         }
      }
   }

   /* Method used to generateField ID in HTML */
   public static generateFieldId(key: string) {
      return key ? key.replace(/\s+/g, '-').toLowerCase() : '';
   }

   public static checkForNullOrEmpty(value) {
      return (value === undefined || value === null || value === '');
   }

   public static propertyComparator = (propName) => (a, b) => a[propName] == b[propName] ? 0 : a[propName] < b[propName] ? -1 : 1;
}
