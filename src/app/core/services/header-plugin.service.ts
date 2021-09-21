import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { IHeaderMenuObserver } from 'src/app/core/models/controls';
import { Constants } from '../utils/constants';


@Injectable()
export class HeaderPluginService {
   hideWorkflowHeader = false;
   backNavigation = false;
   backNavigationListener = new Subject<boolean>();
   crossNavigation = false;
   crossNavigationListener = new Subject<boolean>();
   headerMenuConfiguration = new Subject<IHeaderMenuObserver>();
   chatOpenedValue: boolean;
   headerMenuHeight = Constants.headerHeight;
}

