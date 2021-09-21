import { TestBed, inject } from '@angular/core/testing';
// import { assertModuleFactoryCaching } from '../../test-util';
import { HeaderPluginService } from './header-plugin.service';

describe('HeaderPluginService', () => {
  // assertModuleFactoryCaching();
   beforeEach(() => {
      TestBed.configureTestingModule({
         providers: [HeaderPluginService]
      });
   });

   it('should be created', inject([HeaderPluginService], (service: HeaderPluginService) => {
      expect(service).toBeTruthy();
   }));

});
