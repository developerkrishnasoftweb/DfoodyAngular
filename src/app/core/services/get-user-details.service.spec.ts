import { ICurrentUser } from './../models/account';
import { TestBed, async, inject} from '@angular/core/testing';
import { GetUserDetailsService } from './get-user-details.service';
import { componentFactoryName } from '@angular/compiler';
import { JwtAuthService } from './jwt-auth.service';


 const mockUser: ICurrentUser  = {
  userId: '',
  branchType: 'NCC',
  branchCode: 'cc314601',
  branchName: ''
};

const getUserDetailsServiceStub = {
  userDetails: jasmine.createSpy('userDetails').and.returnValue({mockUser})
};

describe('GetUserDetailsService', () => {

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [ GetUserDetailsService,
     JwtAuthService
    ]
    })
       .compileComponents();
 }));

  it('should be created', () => {
    const service: GetUserDetailsService = TestBed.get(GetUserDetailsService);
    expect(service).toBeTruthy();
  });

  it('should return getUserCCID ', inject([GetUserDetailsService], (service: GetUserDetailsService) => {
    spyOn(service, 'getUserCCID');
    service.getUserCCID();
    expect(service.getUserCCID).toHaveBeenCalled();

  }));

  it('should return getUserOpratBranch', inject([GetUserDetailsService], (service: GetUserDetailsService) => {
    spyOn(service, 'getUserOpratBranch');
    service.getUserOpratBranch();
    expect(service.getUserOpratBranch).toHaveBeenCalled();
  }));

});
