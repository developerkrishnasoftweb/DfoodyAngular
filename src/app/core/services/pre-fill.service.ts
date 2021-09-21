import { Injectable } from "@angular/core";
import { INote } from 'src/app/front-office/front-office.model';

@Injectable({
   providedIn: 'root'
})

export class PreFillService {
   private SelectedApplicationType: any;
   private CurrentClientSnapshotID: any;
   private ApplicationStatusList: Array<any> = [];
   private AssetTypeList: Array<any> = [];
   private ApplicationTypes: Array<any> = [];
   private ClientDetailId: any;
   private ApplicationResumeDetailStr: any;
   private ApplicationStatus: any;
   private IsResumeApplicationApplicable: boolean;
   private CanProcessPersonalInfoConsent: boolean;
   private objNote: INote;

   constructor() {
   }

   get clientSnapshotDetails() {
      return {
         selectedApplicationType: this.SelectedApplicationType,
         currentClientSnapshotId: this.CurrentClientSnapshotID,
         currentClientDetailId: this.ClientDetailId,
         applicationResumeDetailStr: this.ApplicationResumeDetailStr,
         currentApplicationStatus: this.ApplicationStatus,
         branchCode: this.getBrachCode(),
         canProcessPersonalInfoConsent: this.CanProcessPersonalInfoConsent
      };
   }

   set selectedApplicationType(value) {
      this.SelectedApplicationType = value;
   }
   get selectedApplicationType() {
      return this.SelectedApplicationType;
   }

   set currentClientSnapshotId(value) {
      this.CurrentClientSnapshotID = value;
   }
   get currentClientSnapshotId() {
      return this.CurrentClientSnapshotID;
   }

   set applicationStatusList(value) {
      this.ApplicationStatusList = value;
   }
   get applicationStatusList() {
      return this.ApplicationStatusList;
   }

   set applicationTypeList(value) {
      this.ApplicationTypes = value;
   }
   get applicationTypeList() {
      return this.ApplicationTypes;
   }

   set currentClientDetailId(value) {
      this.ClientDetailId = value;
   }
   get currentClientDetailId() {
      return this.ClientDetailId;
   }

   set applicationResumeDetailStr(value) {
      this.ApplicationResumeDetailStr = value;
   }
   get applicationResumeDetailStr() {
      return this.ApplicationResumeDetailStr;
   }

   set currentApplicationStatus(value) {
      this.ApplicationStatus = value;
   }
   get currentApplicationStatus() {
      return this.ApplicationStatus;
   }

   set isResumeApplicationApplicable(value) {
      this.IsResumeApplicationApplicable = value;
   }
   get isResumeApplicationApplicable() {
      return this.IsResumeApplicationApplicable;
   }

   set canProcessPersonalInfoConsent(value) {
      this.CanProcessPersonalInfoConsent = value;
   }
   get canProcessPersonalInfoConsent() {
      return this.CanProcessPersonalInfoConsent;
   }

   set assetTypeList(value) {
      this.AssetTypeList = value;
   }
   get assetTypeList(){
      return this.AssetTypeList;
   }

   set setNotesToAssessor(objNote: INote) {
      this.objNote = objNote;
   }
   get getNotesToAssessor(): INote{
      return this.objNote;
   }

   getBrachCode(): any {
      if (localStorage.getItem('branchCode') !== null) {
         return parseInt(localStorage.getItem('branchCode'));
      } else {
         return null;
      }
   }

   getBankerUsername(): any {
      if (localStorage.getItem('firstName') !== null && localStorage.getItem('surname')) {
         return localStorage.getItem('firstName') + ' ' + localStorage.getItem('surname');
      } else {
         return null;
      }
   }


}
