import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ApiService } from './api.service';

describe('ApiService', () => {
   beforeEach(() => {
      TestBed.configureTestingModule({
         providers: [ApiService],
         imports: [HttpClientTestingModule]
      });
   });

   it('should be created', inject([ApiService], (service: ApiService) => {
      expect(service).toBeTruthy();
   }));

   it('should have getAll method', inject([ApiService], (service: ApiService) => {
      expect(service.UploadDocPost.getAll).toBeDefined();
      expect(service.UploadDocPut.get).toBeDefined();
      // expect(service.AccountTransactions.get).toBeDefined();
      // expect(service.PlasticInfo.get).toBeDefined();
      // expect(service.PlasticList.get).toBeDefined();
      // expect(service.TransactionDetails.get).toBeDefined();
      // expect(service.CrmAutoCaseLog.create).toBeDefined();
      // expect(service.EmailStatement.create).toBeDefined();
      // expect(service.RolesAndPermission.getAll).toBeDefined();
      // expect(service.getCardsBranchList.get).toBeDefined();
      // expect(service.AddStopOrder.get).toBeDefined();
      // expect(service.MaintainAccountStatus.get).toBeDefined();
      // expect(service.TaxFreeTransferOutNotice.get).toBeDefined();
      // expect(service.EarlyReleaseDetails).toBeDefined();
      // expect(service.OutstandingAuthorization.getAll).toBeDefined();
      // expect(service.getCardDetails.getAll).toBeDefined();
      // expect(service.verifoneReset.getAll).toBeDefined();
      // expect(service.verifoneConnectionCheck.getAll).toBeDefined();
      // expect(service.CalculatePayoff.getAll).toBeDefined();
      // expect(service.maintainFunding.getAll).toBeDefined();
      // expect(service.Arrangement.getAll).toBeDefined();
   }));
});
