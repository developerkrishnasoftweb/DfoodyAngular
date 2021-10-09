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

   /*configuration*/
   GetConfiguration = new Api<any>(this.http, this.apiEndpointUrl + '​/api/Configuration/getConfiguration');

   /*Get Brands*/
   GetBrands = new Api<any>(this.http, this.apiEndpointUrl + '​​/api/Brand/getList');

   /*Get Branches*/
   GetBranches = new Api<any>(this.http, this.apiEndpointUrl + '​​/api/Branches/getList');

   /*Get Categories*/
   GetCategories = new Api<any>(this.http, this.apiEndpointUrl + '​​/api/Categorie/getList');

   /*Get Combo meal*/
   GetCombomeal = new Api<any>(this.http, this.apiEndpointUrl + '​​/api/Combomeal/getList');

   /*Get menu item*/
   GetMenuItem = new Api<any>(this.http, this.apiEndpointUrl + '​​/api/Item/getList');

   /*Add to card Combo meal*/
   AddCombomealToCart = new Api<any>(this.http, this.apiEndpointUrl + '​​/api/Cart/AddCombomealToCart');

   /*Add to card Menu meal*/
   AddItemToCart = new Api<any>(this.http, this.apiEndpointUrl + '​​/api/Cart/AddItemToCart');

   /*Get Customer Address*/
   GetCustomerAddress = new Api<any>(this.http, this.apiEndpointUrl + '​​/api/Customer_address/getList');

   /*Add Customer Address*/
   AddCustomerAddress = new Api<any>(this.http, this.apiEndpointUrl + '​​/api/Customer_address/AddAddress');

   /*Update Customer Address*/
   UpdateCustomerAddress = new Api<any>(this.http, this.apiEndpointUrl + '​​/api/Customer_address/UpdateAddress');


   /*Address delete*/
   DeleteCustomerAddress = new Api<any>(this.http, this.apiEndpointUrl + '​/api/Customer_address/RemoveAddress/');

   /*Get Branches*/
   GetCartList = new Api<any>(this.http, this.apiEndpointUrl + '/api/Cart/getList');

   /*Delete Cart Item*/
   DeleteCartItem = new Api<any>(this.http, this.apiEndpointUrl + '​/api/Cart/Delete/');

   /*Update Quantity*/
   UpdateQuantity = new Api<any>(this.http, this.apiEndpointUrl + '​​/api/Cart/UpdateQuantity');

   /*Add order*/
   AddOrder = new Api<any>(this.http, this.apiEndpointUrl + '​​/api/Order/AddOrder');

   /*get order list*/
   GetOrderList = new Api<any>(this.http, this.apiEndpointUrl + '​​/api/Order/getList');

   /*book table*/
   BookaTable = new Api<any>(this.http, this.apiEndpointUrl + '​/api/BookaTable/Add');

   /*get Time Slot*/
   TimeSlot = (id) => new Api<any>(this.http, this.apiEndpointUrl + '​/api/TimeSlot/getListById/' + id);

   /*get Time Slot*/
   GetTableList = new Api<any>(this.http, this.apiEndpointUrl + '​/api/Table/getFullList');

   
   /*Payment Type*/
   GetPaymentType = new Api<any>(this.http, this.apiEndpointUrl + '​/api/PaymentType/getList');
}
