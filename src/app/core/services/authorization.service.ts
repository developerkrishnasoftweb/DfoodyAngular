import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class AuthorizationService {

  constructor(private readonly apiService: ApiService) { }

  // getapproveIt(message: string): Observable<any> {
  //   const queryParams = { message };
  //   return this.apiService.getVerificationId.getAll(queryParams, null).pipe(map(response => response));
  // }

  // verifyApproveIt(verificationId: string): Observable<any> {
  //   const queryParams = { ...(verificationId ? { verificationId } : {}) };
  //   return this.apiService.verifyApproveIt.getAll(queryParams, null).pipe(map(response => response));
  // }

  // sendOtp(message: string): Observable<any> {
  //   const queryParams = { message };
  //   return this.apiService.sendOtp.getAll(queryParams, null).pipe(map(response => response));
  // }

  // verifyOtp(verificationId: string, verifyotp: number): Observable<any> {
  //   const queryParams = { ...(verificationId ? { verificationId } : null) };
  //   const routeParams = { ...(verifyotp ? { verifyotp } : null) };
  //   return this.apiService.verifyOtp.getAll(queryParams, routeParams).pipe(map(response => response));
  // }

  // sendTnC(message: string): Observable<any> {
  //   const queryParams = { message };
  //   return this.apiService.sendSMS.getAll(queryParams, null).pipe(map(response => response));
  // }

  // verifySimSwap(): Observable<any> {
  //   return this.apiService.verifySimSwap.getAll(null, null).pipe(map(response => response));
  // }

}
