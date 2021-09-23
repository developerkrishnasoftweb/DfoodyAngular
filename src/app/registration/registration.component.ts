import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CustomerRegistrationReqModel } from '@core/models/customer';
import { CustomerRegistrationService } from '@core/services/customer/customer-registration.service';
import { ValidationService } from '@core/services/validation.service';
import { ValidationMsg } from '@core/utils/enum';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {

  registrationForm: FormGroup;

  validationMsgEnum = ValidationMsg;

  constructor(private formBuilder: FormBuilder,
    private customerRegistrationService: CustomerRegistrationService) { }

  ngOnInit(): void {
    this.createForm();
    this.getIPAddress();
  }

  get formControl() { return this.registrationForm.controls; }

  createForm(): void {
    this.registrationForm = this.formBuilder.group({
      email: ['', [Validators.required, ValidationService.emailValidator]],
      mobile: ['', [Validators.required, Validators.maxLength(10), Validators.minLength(10)]],
      firstName: ['', [Validators.required, Validators.maxLength(50)]],
      lastName: ['', [Validators.required, Validators.maxLength(50)]],
      password: ['', [Validators.required, Validators.maxLength(20)]],
    });
  }

  onSubmit(): void {
    this.registrationForm.markAllAsTouched();
    if (this.registrationForm.invalid)
      return;
    const model = this.createResModel();
    this.customerRegistrationService.registration(model).subscribe(res => {
      console.log(res);
    });
  }

  createResModel(): CustomerRegistrationReqModel {
    const model = new CustomerRegistrationReqModel();
    model.firstName = this.registrationForm.value.firstName;
    model.lastName = this.registrationForm.value.lastName;
    model.mobile = this.registrationForm.value.mobile;
    model.email = this.registrationForm.value.email;
    model.password = this.registrationForm.value.password;
    return model;
  }


  resetForm(): void {
    this.registrationForm.markAsUntouched();
    this.registrationForm.reset();
  }

  //get IP Address
  getIPAddress(): void {
    this.customerRegistrationService.getIPAddress().subscribe(res => {
      console.log('res ', res);
    })
  }
}
