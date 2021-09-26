import { Component, OnDestroy, OnInit } from '@angular/core';
import { SnackBarCssClass } from '@core/utils/enum';
import { Subscription } from 'rxjs';
import { SnackBarService } from './snack-bar.service';

@Component({
  selector: 'app-snack-bar',
  templateUrl: './snack-bar.component.html',
  styleUrls: ['./snack-bar.component.scss']
})
export class SnackBarComponent implements OnInit, OnDestroy {

  show: boolean = false;
  private message: string = 'This is snackbar';
  private type: string = SnackBarCssClass.success;
  private snackbarSubscription: Subscription;

  constructor(private snackBarService: SnackBarService) { }

  ngOnInit(): void {
    console.log('test');
    this.snackbarSubscription = this.snackBarService.snackbarState.subscribe(state => {
      console.log('state ', state);

      if (state.type)
        this.type = state.type;
      else
        this.type = SnackBarCssClass.success;;
      this.message = state.message;
      this.show = state.show;
      setTimeout(() => {
        this.show = false;
      }, 3000);
    })
  }

  ngOnDestroy(): void {
    this.snackbarSubscription.unsubscribe();
  }

}
