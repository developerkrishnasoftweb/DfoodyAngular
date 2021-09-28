import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Api } from './api';
import { IApiResponse } from '@core/utils/models';

/**
 * Usage example:
 *
 * In this service add the below:
 * whereDidYouHearAboutUsList = new Api<any>(this.http, this.apiUrl + 'brokeringandadvisory/referencedatamgmt/v1/referencedata?mastercode=HAU');
 *
 * In another service add the below:
 * getClientWhereDoYouHearAboutListItems(): Observable<any> {
      return this.apiService.whereDidYouHearAboutUsList.getAll().map(response => response ? response : []);
   }
 */

@Injectable({
   providedIn: 'root',
})
export class ApiService {

   apiEndpointUrl: string = environment.narAPIEndpointURL;
   apiUrl = environment.narAPIEndpointURL;
   constructor(private http: HttpClient) { }
   /*login Operation*/
   userLoginloginmgmt = new Api<any>(this.http, this.apiEndpointUrl + 'roa/creditdecision/loginmgmt/v1/users/logins');

   /*Customer login*/
   CustomerLogin = new Api<any>(this.http, this.apiEndpointUrl + '/api/Customer/Login/authenticate');

   /*Customer Registration*/
   CustomerRegistration = new Api<any>(this.http, this.apiEndpointUrl + '/api/Register/add');

   /*Is Email Exist*/
   IsEmailExist = (email) => new Api<any>(this.http, this.apiEndpointUrl + '​/api/Register/isEmailExist/' + email);

   /*Is Mobile No Exist*/
   IsMobileNoExist = (mobile) => new Api<any>(this.http, this.apiEndpointUrl + '​/api/Register/isMobileNoExist/' + mobile);

   /*My Profile */
   MyProfile = new Api<any>(this.http, this.apiEndpointUrl + '​/api/Customer/MyProfile');

   /*My Profile */
   UpdateProfile = new Api<any>(this.http, this.apiEndpointUrl + '​/api/Customer/UpdateProfile');


   /*IP Address*/
   IPAddress = new Api<any>(this.http, 'http://api.ipify.org/?format=json');

   /*Change Password*/
   CustomerChangePassword = new Api<any>(this.http, this.apiEndpointUrl + '​/api/Customer/ChangePassword');

   /*Change Password*/
   GetConfiguration = new Api<any>(this.http, this.apiEndpointUrl + '​/api/Configuration/getConfiguration');
}
