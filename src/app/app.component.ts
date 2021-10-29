import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { ConfigurationModel, CustomerInfo } from '@core/models/customer';
import { ConfigurationService } from '@core/services/customer/configuration.service';
import { CustomerDataPreFillService } from '@core/services/customer/customer-data-pre-fill.service';
import { MyprofileService } from '@core/services/customer/myprofile.service';
import { UserLoginService } from '@core/services/user-login.service';
import { TranslateService } from '@ngx-translate/core';
import { finalize } from 'rxjs/operators';
import defaultLanguage from "../assets/i18n/en.json";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'hotelUae';

  constructor(
    private configurationService: ConfigurationService,
    private myprofileService: MyprofileService,
    public userLoginService: UserLoginService,
    private translate: TranslateService,
    private preFillService: CustomerDataPreFillService) {
    translate.setTranslation('en', defaultLanguage);
    translate.setDefaultLang('en');
    if (this.userLoginService.isLoggedIn()) {
      this.getProfileData();
      this.getConfiguration();
    }
  }


  getConfiguration() {
    this.configurationService.getConfiguration()
      .pipe(finalize(() => {
      })).subscribe((response: ConfigurationModel) => {
        this.preFillService.userConfigurationData = response;
      });
  }

  getProfileData(): void {
    this.myprofileService.getMyProfile()
      .pipe(finalize(() => {
        // tslint:disable-next-line: deprecation
      })).subscribe((response: CustomerInfo) => {
        if (response)
          this.preFillService.userFullName = response.firstName + ' ' + response.lastName;

      }, error => {
        if (error instanceof HttpErrorResponse) {
          console.log(error);
        }
      });
  }


}
