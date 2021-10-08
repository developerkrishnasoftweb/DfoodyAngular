import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ReservationReqModel, TimeList } from '@core/models/customer';
import { CustomerDataPreFillService } from '@core/services/customer/customer-data-pre-fill.service';
import { ReservationService } from '@core/services/customer/reservation.service';
import { ValidationService } from '@core/services/validation.service';
import { ValidationMsg } from '@core/utils/enum';
import { SnackBarService } from '@shared/snack-bar/snack-bar.service';
import { Subscription } from 'rxjs/internal/Subscription';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.scss']
})
export class ReservationComponent implements OnInit {


  reservationForm: FormGroup;

  validationMsgEnum = ValidationMsg;

  TimeList = TimeList;

  branchId: number = null;

  querySubcription: Subscription;

  isSubmitDisable: boolean = false;


  constructor(private formBuilder: FormBuilder, private snackBarService: SnackBarService,
    private preFillService: CustomerDataPreFillService,
    private reservationService: ReservationService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.createForm();
    this.querySubcription = this.route.queryParams.subscribe(params => {
      let id = params["branchId"];
      this.branchId = params['branchId'];
      console.log('params ', params);
      console.log('this.branchId ', this.branchId);
    });
  }

  get formControl() { return this.reservationForm.controls; }

  createForm(): void {
    this.reservationForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.maxLength(50)]],
      email: ['', [Validators.required, ValidationService.emailValidator]],
      mobile: ['', [Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]],
      seat: ['', [Validators.required, Validators.maxLength(15)]],
      message: ['', [Validators.required]],
      date: ['', [Validators.required]],
      time: ['', [Validators.required]]
    });
  }

  onSubmit(): void {
    this.reservationForm.markAllAsTouched();
    if (this.reservationForm.invalid)
      return;
    this.isSubmitDisable = true;
    const model = new ReservationReqModel();
    model.branchId = +this.branchId;
    model.tableId = +this.reservationForm.value.seat;
    model.timeSlotId = +this.reservationForm.value.time;
    model.date = new Date(this.reservationForm.value.date);
    model.customerId = this.preFillService.id;
    this.reservationService.booATable(model).
      pipe(finalize(() => {
        this.isSubmitDisable = false;
        // tslint:disable-next-line: deprecation
      })).subscribe((response: boolean) => {
        if (response) {
          this.snackBarService.show("Table booked Successfully");
          this.resetForm();
        }
      }, error => {
        if (error instanceof HttpErrorResponse) {
          console.log(error);
        }
      });
  }

  resetForm() {
    this.reservationForm.reset();
  }

  ngOnDestroy(): void {
    this.querySubcription.unsubscribe();
  }
}
