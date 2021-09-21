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

   /* MDM Operations */
   Unique = new Api<any>(this.http, this.apiEndpointUrl + 'roa/creditdecision/clientmgmt/v1/clientdetailsearch');
   mdmAllReferenceData = new Api<any>(this.http, this.apiEndpointUrl + 'roa/card/mdmmgmt/v1/mdm/refdata/all');
   version = '1';

   /* Debt */
   DebtsPost = new Api<any>(this.http, `${this.apiEndpointUrl}roa/creditdecision/clientmgmt/v${this.version}/client/debt/:clientDetailId/:clientSnapshotId`);
   DebtDetail = new Api<any>(this.http, `${this.apiEndpointUrl}roa/creditdecision/clientmgmt/v${this.version}/client/debt/:clientDetailId/:clientSnapshotId`);
   DebtsGet = new Api<any>(this.http, `${this.apiEndpointUrl}roa/creditdecision/clientmgmt/v${this.version}/client/debt/:clientDetailId/:clientSnapshotId`);

   /* Household Expenses */
   HouseholdExpensesPost = new Api<any>(this.http, `${this.apiEndpointUrl}roa/creditdecision/clientmgmt/v${this.version}/client/householdExpense/:clientDetailId/:clientSnapshotId`);
   HousehodlExpenseDetailPut = new Api<any>(this.http, `${this.apiEndpointUrl}roa/creditdecision/clientmgmt/v${this.version}/client/householdExpense/:clientDetailId/:clientSnapshotId`);
   HouseholdExpensesGet = new Api<any>(this.http, `${this.apiEndpointUrl}roa/creditdecision/clientmgmt/v${this.version}/client/householdexpense/:clientDetailId/:clientSnapshotId`);

   /* Income Details */
   IncomeDetail = new Api<any>(this.http, `${this.apiEndpointUrl}roa/creditdecision/clientmgmt/v${this.version}/client/income/:clientDetailId/:clientSnapshotId`);

   /* Your Assets */
   AssetDetailsGetOrPost = new Api<any>(this.http, `${this.apiEndpointUrl}roa/creditdecision/clientmgmt/v${this.version}/client/asset/:clientDetailId/:clientSnapshotId`);
   AssetDetailsPut = new Api<any>(this.http, `${this.apiEndpointUrl}roa/creditdecision/clientmgmt/v${this.version}/client/asset/:clientDetailId/:clientAppAssetNoteDetailId`);
   AssetDetailsDelete = new Api<any>(this.http, `${this.apiEndpointUrl}roa/creditdecision/clientmgmt/v${this.version}/client/asset`);

   /* Your Product */
   /* Your Need */
   ProudctDetailsPost = new Api<any>(this.http, `${this.apiEndpointUrl}roa/creditdecision/client/v${this.version}/product/detail/:clientDetailId/:clientSnapshotId`);
   ProductDetail = new Api<any>(this.http, `${this.apiEndpointUrl}roa/creditdecision/client/v${this.version}/product/detail/:clientDetailId/:clientSnapshotId`);
   ProductDetailsGet = new Api<any>(this.http, `${this.apiEndpointUrl}roa/creditdecision/client/v${this.version}/product/detail/:clientDetailId`);

   /* Application Detail */
   ApplicationDetailPost = new Api<any>(this.http, `${this.apiEndpointUrl}roa/creditdecision/clientmgmt/v${this.version}/client/detail/:clientDetailId/:clientSnapshotId`);
   ApplicationDetailPut = new Api<any>(this.http, `${this.apiEndpointUrl}roa/creditdecision/clientmgmt/v${this.version}/client/detail/:clientDetailId/:clientAppDetailId`);
   ApplicationDetailsGet = new Api<any>(this.http, `${this.apiEndpointUrl}roa/creditdecision/clientmgmt/v${this.version}/client/detail/:clientDetailId`);

   /* Client Identity */
   ClientIdentityDetail = new Api<any>(this.http, `${this.apiEndpointUrl}roa/creditdecision/client/v${this.version}/client/identity/:clientDetailId/:clientIdentityId`);
   ClientIdentityGet = new Api<any>(this.http, `${this.apiEndpointUrl}roa/creditdecision/client/v${this.version}/client/identity/:clientDetailId`);

   /*Finalisation - Upload Document*/
   UploadDocPost = new Api<any>(this.http, `${this.apiEndpointUrl}roa/creditdecision/clientmgmt/v${this.version}/client/documentUpload/:clientDetailId/:clientApplicationId`);
   UploadDocPut = new Api<any>(this.http, `${this.apiEndpointUrl}roa/creditdecision/clientmgmt/v${this.version}/client/documentUpload/:clientDetailId/:clientAppDocumentId`);

   /*Customisation*/
   // CustomisationGet = new Api<any>(this.http, `${this.apiEndpointUrl} + 'roa/creditdecision/clientmgmt/v${this.version}/client/compliance/:clientDetailId`);
   CustomisationPost = new Api<any>(this.http, `${this.apiEndpointUrl}roa/creditdecision/clientmgmt/v${this.version}/client/preference/:clientDetailId/:clientApplicationId`);
   CustomisationPut = new Api<any>(this.http, `${this.apiEndpointUrl}roa/creditdecision/clientmgmt/v${this.version}/client/preference/:clientDetailId/:clientApplicationId`);

   /*Authentication*/
   AuthenticationPost = new Api<any>(this.http, `${this.apiEndpointUrl}roa/creditdecision/clientmgmt/v${this.version}/client/authenticate/:clientDetailId`);
   AuthenticationReferenceGet = new Api<any>(this.http, `${this.apiEndpointUrl}roa/creditdecision/referencemgmt/v${this.version}/reference/data/code/:referenceDataMasterCode`);
   // Snapshot
   SnapShotGet = new Api<any>(this.http, `${this.apiEndpointUrl}roa/creditdecision/clientregistration/v${this.version}/snapshots`);
   SnapShotPost = new Api<any>(this.http, `${this.apiEndpointUrl}roa/creditdecision/clientregistration/v${this.version}/snapshot`);
   SnapShotPut = new Api<any>(this.http, `${this.apiEndpointUrl}roa/creditdecision/clientregistration/v${this.version}/snapshot/:clientSnapshotId`);

   /* Asset Popups */
   FixedPropertyPost = new Api<any>(this.http, `${this.apiEndpointUrl}roa/creditdecision/clientmgmt/v${this.version}/client/asset/property/:clientDetailId/:clientApplicationId`);

   YourAssetPopupPost = new Api<any>(this.http, `${this.apiEndpointUrl}roa/creditdecision/clientmgmt/v${this.version}/client/asset/type/:assetType/:clientDetailId/:clientSnapshotId`);
   YourAssetPopupGetPut = new Api<any>(this.http, `${this.apiEndpointUrl}roa/creditdecision/clientmgmt/v${this.version}/client/asset/type/:assetType/:clientAssetTypeDetailId`);

   /* Reference Data*/
   ReferenceDataGetByMaserCode = new Api<any>(this.http, `${this.apiEndpointUrl}roa/creditdecision/referencemgmt/v${this.version}/reference/data/code/:referenceDataMasterCode`);

   /*  Notes */
   NotesToAssessor = new Api<any>(this.http, `${this.apiEndpointUrl}roa/creditdecision/clientmgmt/v${this.version}/client/notestoassessor/:clientDetailId/:clientSnapshotId`);
   PutNoteToAssessor = new Api<any>(this.http, `${this.apiEndpointUrl}roa/creditdecision/clientmgmt/v${this.version}/client/notestoassessor/:clientDetailId/:clientApplicationNoteDetailId `);
   
}
