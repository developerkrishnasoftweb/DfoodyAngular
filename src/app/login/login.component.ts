import { HttpErrorResponse } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CustomerLoginReqModel } from '@core/models/customer';
import { ConfigurationService } from '@core/services/customer/configuration.service';
import { CustomerDataPreFillService } from '@core/services/customer/customer-data-pre-fill.service';
import { CustomerLoginService } from '@core/services/customer/customer-login.service';
import { UserLoginService } from '@core/services/user-login.service';
import { ValidationService } from '@core/services/validation.service';
import { HttpResponseStatusCode, ValidationMsg } from '@core/utils/enum';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;

  validationMsgEnum = ValidationMsg;
  apiErrorMsg = "";

  isBtnDisabled: boolean = false;

  @ViewChild('closeButton') private closeButton: ElementRef;


  constructor(private formBuilder: FormBuilder,
    private router: Router,
    private userLoginService: UserLoginService,
    private configurationService: ConfigurationService,
    private preFillService: CustomerDataPreFillService,
    private customerLoginService: CustomerLoginService) { }

  ngOnInit(): void {
    this.createForm();
  }

  get formControl() { return this.loginForm.controls; }

  createForm(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, ValidationService.emailValidator]],
      password: ['', [Validators.required, Validators.maxLength(20)]]
    });
  }

  onSubmit(): void {
    this.loginForm.markAllAsTouched();
    if (this.loginForm.invalid)
      return;
    const model = this.createResModel();
    this.isBtnDisabled = true;
    this.customerLoginService.login(model)
      .pipe(finalize(() => {
        this.isBtnDisabled = false;
      })).subscribe(response => {
        if (response.email && response.token) {
          localStorage.setItem('Authorization', response.token);
          this.customerLoginService
          this.closeButton.nativeElement.click();
          this.userLoginService.userLoginUpdateBool(true);
          this.getConfiguration();
        }
        this.router.navigate(['myprofile']);
      }, errRes => {
        if (errRes instanceof HttpErrorResponse) {
          if (errRes.error && errRes.error.error && errRes.error.responseCode && errRes.error.responseCode.statusCode === HttpResponseStatusCode.NotFound) {
            this.apiErrorMsg = errRes.error.responseMessage;
          }
        }
      });
  }

  getConfiguration() {
    this.configurationService.getConfiguration()
      .pipe(finalize(() => {
        this.isBtnDisabled = false;
      })).subscribe(response => {
        this.preFillService.userConfigurationData = response;
      });
  }

  createResModel(): CustomerLoginReqModel {
    const model = new CustomerLoginReqModel();
    model.userName = this.loginForm.value.email;
    model.password = this.loginForm.value.password;
    return model;
  }

  resetForm(): void {
    this.loginForm.markAsUntouched();
    this.loginForm.reset();
  }

}
