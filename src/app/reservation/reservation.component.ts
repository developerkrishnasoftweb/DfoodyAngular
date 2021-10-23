import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ReservationReqModel } from '@core/models/customer';
import { CustomerDataPreFillService } from '@core/services/customer/customer-data-pre-fill.service';
import { ReservationService } from '@core/services/customer/reservation.service';
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

  timeList = [];
  paymentList = [];
  tableList = [];

  branchId: number = null;

  querySubcription: Subscription;

  isSubmitDisable: boolean = false;


  constructor(private formBuilder: FormBuilder, private snackBarService: SnackBarService,
    private preFillService: CustomerDataPreFillService,
    private reservationService: ReservationService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.createForm();
    this.querySubcription = this.route.queryParams.subscribe(params => {
      this.branchId = params['branchId'];
    });
    this.getTimeSlot();
    this.GetTableList();
    this.getPaymentType();
  }

  get formControl() { return this.reservationForm.controls; }

  createForm(): void {
    this.reservationForm = this.formBuilder.group({
      tableData: ['', [Validators.required]],
      paymentType: ['', [Validators.required]],
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
    model.tableId = +this.reservationForm.value.tableData;
    model.timeSlotId = +this.reservationForm.value.time;
    model.date = new Date(this.reservationForm.value.date);
    model.paymentTypeId = +this.reservationForm.value.paymentType;
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
    this.reservationForm.controls.paymentType.setValue('');
    this.reservationForm.controls.tableData.setValue('');
    this.reservationForm.controls.time.setValue('');
  }

  getTimeSlot(): void {
    this.reservationService.GetTimeSlot(this.branchId)
      .pipe(finalize(() => {
        // tslint:disable-next-line: deprecation
      })).subscribe((response: any) => {
        if (response) {
          if (response)
            this.timeList = response;
        }
      }, error => {
        if (error instanceof HttpErrorResponse) {
          console.log(error);
        }
      });
  }

  getPaymentType(): void {
    this.reservationService.GetPaymentType()
      .pipe(finalize(() => {
        // tslint:disable-next-line: deprecation
      })).subscribe((response: any) => {
        if (response) {
          if (response)
            this.paymentList = response;
        }
      }, error => {
        if (error instanceof HttpErrorResponse) {
          console.log(error);
        }
      });
  }

  GetTableList(): void {
    this.reservationService.GetTableList({ branchId: this.branchId })
      .pipe(finalize(() => {
        // tslint:disable-next-line: deprecation
      })).subscribe((response: any) => {
        if (response) {
          this.tableList = response;
        }
      }, error => {
        if (error instanceof HttpErrorResponse) {
          console.log(error);
        }
      });
  }

  ngOnDestroy(): void {
    this.querySubcription.unsubscribe();
  }
}
