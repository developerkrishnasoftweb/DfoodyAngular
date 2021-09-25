import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CustomerLoginReqModel } from '@core/models/customer';
import { CustomerLoginService } from '@core/services/customer/customer-login.service';
import { UserLoginService } from '@core/services/user-login.service';
import { ValidationService } from '@core/services/validation.service';
import { HttpResponseStatusCode, ValidationMsg } from '@core/utils/enum';

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

  constructor(private formBuilder: FormBuilder,
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
    this.customerLoginService.login(model).subscribe(res => {
      this.isBtnDisabled = false;
      if (res.email && res.token) {
        localStorage.setItem('Authorization', res.token);
      }
    }, errRes => {
      this.isBtnDisabled = false;
      debugger
      if (errRes.error && errRes.error.error && errRes.error.responseCode && errRes.error.responseCode.statusCode === HttpResponseStatusCode.NotFound) {
        this.apiErrorMsg = errRes.error.responseMessage;
        console.log('this.apiErrorMsg ', this.apiErrorMsg);
      }
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
