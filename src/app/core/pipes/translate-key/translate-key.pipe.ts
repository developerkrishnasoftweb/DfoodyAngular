import { Pipe, PipeTransform } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Pipe({
  name: 'translateKey'
})
export class TranslateKeyPipe implements PipeTransform {

  constructor(private translate: TranslateService) {
  }

  transform(value: any, object: any): unknown {
    let displayValue = this.translate.instant(value);
    if (object)
      return displayValue && object[displayValue] ? object[displayValue] : null;
    else 
      return displayValue
  }

}
