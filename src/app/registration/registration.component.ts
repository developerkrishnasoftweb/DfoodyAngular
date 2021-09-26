import { HttpErrorResponse } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CustomerRegistrationReqModel } from '@core/models/customer';
import { CustomerRegistrationService } from '@core/services/customer/customer-registration.service';
import { ValidationService } from '@core/services/validation.service';
import { ValidationMsg } from '@core/utils/enum';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {

  registrationForm: FormGroup;

  validationMsgEnum = ValidationMsg;

  isEmailExist: boolean = false;
  isMobileExist: boolean = false;

  isSubmitDisable: boolean = false;

  @ViewChild('closeButton') private closeButton: ElementRef;


  constructor(private formBuilder: FormBuilder,
    private customerRegistrationService: CustomerRegistrationService) { }

  ngOnInit(): void {
    this.createForm();
    // this.getIPAddress();
  }

  get formControl() { return this.registrationForm.controls; }

  createForm(): void {
    this.registrationForm = this.formBuilder.group({
      email: ['', [Validators.required, ValidationService.emailValidator]],
      mobile: ['', [Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]],
      firstName: ['', [Validators.required, Validators.maxLength(50)]],
      lastName: ['', [Validators.required, Validators.maxLength(50)]],
      password: ['', [Validators.required, Validators.maxLength(20)]],
    });
  }



  onSubmit(): void {
    this.registrationForm.markAllAsTouched();
    if (this.registrationForm.invalid)
      return;
    else if (this.isEmailExist || this.isMobileExist)
      return;
    const model = this.createResModel();
    this.isSubmitDisable = true;

    this.customerRegistrationService.registration(model)
    .pipe(finalize(() => {
      this.isSubmitDisable = false;
    })).subscribe(response => {
      if (response && response.id) {
        this.closeButton.nativeElement.click();
        this.resetForm();
      }
    }, error => {
      if (error instanceof HttpErrorResponse) {
       console.log(error);
      }
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


  //Check email valid or not 
  checkIsEmailExist() {
    this.customerRegistrationService.checkIsEmailExist(this.registrationForm.value.mobile)
    .pipe(finalize(() => {
     
    })).subscribe(response => {
      this.isEmailExist = response;
    }, error => {
      if (error instanceof HttpErrorResponse) {
        console.log(error);
      }
    });
  }

  //Check email valid or not 
  checkIsMobileExist() {
    this.customerRegistrationService.checkIsMobileExist(this.registrationForm.value.mobile)
    .pipe(finalize(() => {
     
    })).subscribe(response => {
      this.isMobileExist = response;
    }, error => {
      if (error instanceof HttpErrorResponse) {
        console.log(error);
      }
    });
  }
}
