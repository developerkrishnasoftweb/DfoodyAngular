import { HttpErrorResponse } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CustomerRegistrationReqModel } from '@core/models/customer';
import { CustomerRegistrationService } from '@core/services/customer/customer-registration.service';
import { ValidationService } from '@core/services/validation.service';
import { ValidationMsg } from '@core/utils/enum';
import { finalize } from 'rxjs/operators';
import { ConfigurationService } from '@core/services/customer/configuration.service';
import { CustomerDataPreFillService } from '@core/services/customer/customer-data-pre-fill.service';
import { UserLoginService } from '@core/services/user-login.service';
@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {

  registrationForm: FormGroup;

  validationMsgEnum = ValidationMsg;

  isEmailExist: boolean = true;
  isMobileExist: boolean = true;

  isEmailExistApiCall: boolean = false;
  isMobileExistApiCall: boolean = false;

  isSubmitDisable: boolean = false;

  @ViewChild('closeButton') private closeButton: ElementRef;


  constructor(private formBuilder: FormBuilder,
    private router: Router,
    private userLoginService: UserLoginService, 
    private configurationService: ConfigurationService,
    private preFillService: CustomerDataPreFillService,
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
      password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(20)]],
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
        if (response.token) {
          localStorage.setItem('Authorization', response.token);
          this.userLoginService.userLoginUpdateBool(true);
          this.getConfiguration();
          this.closeButton.nativeElement.click();
          this.resetForm();
        }
        
      }, error => {
        if (error instanceof HttpErrorResponse) {
          console.log(error);
        }
      });
  }

  getConfiguration() {
    this.configurationService.getConfiguration()
      .pipe(finalize(() => {
      })).subscribe(response => {
        if (response) {
          this.preFillService.userConfigurationData = response;
          this.preFillService.userConfigurationData.enterpriseLogo = this.preFillService.userConfigurationData.enterpriseLogo + "?date=" + new Date().toDateString();

        }

      });
  }

  signInLinkClick() {
    this.closeButton.nativeElement.click();
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
    this.isMobileExist = false;
    this.isEmailExist = false;
  }


  //Check email valid or not 
  checkIsEmailExist() {
    if (this.registrationForm.controls.email.invalid)
      return;
    this.isEmailExistApiCall = false;
    this.customerRegistrationService.checkIsEmailExist(this.registrationForm.value.email)
      .pipe(finalize(() => {
        this.isEmailExistApiCall = true;
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
    if (this.registrationForm.controls.mobile.invalid)
      return;
    this.isMobileExistApiCall = false;
    this.customerRegistrationService.checkIsMobileExist(this.registrationForm.value.mobile)
      .pipe(finalize(() => {
        this.isMobileExistApiCall = true;
      })).subscribe(response => {
        this.isMobileExist = response;
      }, error => {
        if (error instanceof HttpErrorResponse) {
          console.log(error);
        }
      });
  }
}
