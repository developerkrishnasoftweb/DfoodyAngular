import { IApiResponse } from './../utils/models';
import { Inject, Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/Rx';

@Injectable({
   providedIn: 'root',
 })
export class Api<T> {

   constructor(protected http: HttpClient, @Inject(String) protected actionUrl, @Inject(Object) protected TModel?: new (...args) => T) {

   }

   get(id: number): Observable<IApiResponse> {
      const req = this.http.get<IApiResponse>(`${this.actionUrl}/${id}`);

      if (this.TModel) {
         return req.map(response => {
            const objTModel = new this.TModel();
            response.data = this.fromJson(objTModel, response.data);
            return response;
         });
      }

      return req;
   }

   /**
    * Get all
    * @param query Query params
    * @param routeParams Route params
    */
   getAll(query: any = {}, routeParams?: any, header?: any): Observable<IApiResponse> {
      const queryParams = this.createQueryParams(query);
      const routeURL = this.createRouteURL(routeParams);

      const req = this.http.get<IApiResponse>(routeURL, {
         params: queryParams,
         headers: header
      });

      if (this.TModel) {
         return req.map(response => {
            response.data = response.data.map(data => {
               const objTModel = new this.TModel();
               return this.fromJson(objTModel, data);
            });
            return response;
         });
      }

      return req;
   }

   getBlob(fileType: any, query: any = {}): Observable<any> {
      const queryParams = this.createQueryParams(query);

      return this.http.get(this.actionUrl, {
         params: queryParams,
         responseType: 'blob',
      }).map((res) => {
         return new Blob([res], { type: fileType });
      });
   }

   create(payload: T, query: any = {}, routeParams?: any, header?: any) {
      const queryParams = this.createQueryParams(query);
      const routeURL = this.createRouteURL(routeParams);

      return this.http.post<IApiResponse>(routeURL, payload, {
         params: queryParams,
         headers: header
      });
   }

   // update(payload: T, query: any = {}, routeParams?: any) {
   //    const queryParams = this.createQueryParams(query);
   //    const routeURL = this.createRouteURL(routeParams);

   //    return this.http.put<IApiResponse>(routeURL, payload, {
   //       params: queryParams
   //    });
   // }

   update(payload: T, query: any = {}, routeParams?: any, observe = true) {
      let observeStr;
      if(observe) {
         observeStr = 'response';
      }
      const queryParams = this.createQueryParams(query);
      const routeURL = this.createRouteURL(routeParams);
      return this.http.put<any>(routeURL, payload, {
         params: queryParams,
         observe: observeStr
      });
   }

   updateById(id, payload: T, query: any = {}) {
      const queryParams = this.createQueryParams(query);
      return this.http.put<IApiResponse>(`${this.actionUrl}/${id}`, payload, {
         params: queryParams
      });
   }

   remove(id, query: any = {}) {
      const queryParams = this.createQueryParams(query);
      return this.http.delete<IApiResponse>(`${this.actionUrl}/${id}`, { params: queryParams });
   }


   removeWithRouteParams(routeParams, requestData) {
      const routeURL = this.createRouteURL(routeParams);
      return this.http.request('DELETE', routeURL, { body: requestData });
   }

   private fromJson(toObject, json: any): T {
      return Object.assign(toObject, json);
   }

   private createQueryParams(query: any): HttpParams {
      let params = new HttpParams();

      for (const key in query) {
         params = params.append(key, query[key]);
      }

      return params;
   }

   private createRouteURL(routeParams: any): string {
      let urlResult = this.actionUrl;
      if (routeParams) {
         for (const param in routeParams) {
            const myRegExp = new RegExp(':' + param);
            urlResult = urlResult.replace(myRegExp, routeParams[param]);
         }
      }
      return urlResult;
   }
 }
