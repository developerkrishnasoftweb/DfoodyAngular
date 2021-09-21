import { Injectable } from '@angular/core';
import { Constants } from 'src/app/core/utils/constants';

@Injectable()
export class WindowRefService {
   constructor() { }
   /**
    * Returns window object
    *
    * @readonly
    * @type {*}
    * @memberof WindowRefService
    */
   get nativeWindow(): any {
      return this._window();
   }

   private _window() {
      return window;
   }
   /**
    * Function vaidates is screen small or not
    *
    * @memberof WindowRefService
    */
   isSmallScreen() {
      return (window.innerHeight < Constants.disablePoUpMin.height ||
         window.innerWidth < Constants.disablePoUpMin.width);
   }
}
