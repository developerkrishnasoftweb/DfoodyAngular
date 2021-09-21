import { TestBed, inject } from '@angular/core/testing';
import { AuthorizationService } from './authorization.service';
import { of } from 'rxjs';
import { ApiService } from './api.service';
import { HttpClient, HttpHandler } from '@angular/common/http';

const mockauthorisationStub: any = {
   data: {
      verificationId: 'asdasd',
   },
   resultsets: [
      {
         resultCode: 'R00',
         resultDescription: 'SUCCESSFUL',
         status: 'SUCCESS'
      }
   ]
};
const authorisationStub = jasmine
   .createSpy('getAll')
   .and.returnValue(of(mockauthorisationStub));
describe('AuthorizationService', () => {
   beforeEach(() => {
      TestBed.configureTestingModule({
         providers: [AuthorizationService,
            HttpClient,
            HttpHandler,
            {
               provide: ApiService,
               useValue: {
                  getVerificationId: {
                     getAll: authorisationStub
                  },
                  verifyApproveIt: {
                     getAll: authorisationStub
                  },
                  sendOtp: {
                     getAll: authorisationStub
                  },
                  verifyOtp: {
                     getAll: authorisationStub
                  }
               }
            }]
      });
   });

   it('should be created', inject([AuthorizationService], (service: AuthorizationService) => {
      expect(service).toBeTruthy();
   }));
});
