import { Component } from '@angular/core';
import { ConfigurationModel } from '@core/models/customer';
import { ConfigurationService } from '@core/services/customer/configuration.service';
import { CustomerDataPreFillService } from '@core/services/customer/customer-data-pre-fill.service';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'hotelUae';

  constructor(
    private configurationService: ConfigurationService,
    private preFillService: CustomerDataPreFillService) {
    this.getConfiguration();
  }

  getConfiguration() {
    this.configurationService.getConfiguration()
      .pipe(finalize(() => {
      })).subscribe((response: ConfigurationModel) => {
        this.preFillService.userConfigurationData = response;
      });
  }
}
