import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TimeList } from '@core/models/customer';
import { ValidationService } from '@core/services/validation.service';
import { ValidationMsg } from '@core/utils/enum';

@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.scss']
})
export class ReservationComponent implements OnInit {

  
  reservationForm: FormGroup;

  validationMsgEnum = ValidationMsg;

  TimeList = TimeList;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.createForm();
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
  }
}
