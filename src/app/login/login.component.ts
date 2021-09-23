import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CustomerLoginReqModel } from '@core/models/customer';
import { CustomerLoginService } from '@core/services/customer/customer-login.service';
import { ValidationService } from '@core/services/validation.service';
import { ValidationMsg } from '@core/utils/enum';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;

  validationMsgEnum = ValidationMsg;

  constructor(private formBuilder: FormBuilder, 
    private customerLoginService: CustomerLoginService) { }

  ngOnInit(): void {
    this.createForm();
  }

  get formControl()  { return this.loginForm.controls;}

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
    this.customerLoginService.login(model).subscribe(res => {
      console.log(res);
    });
  }

  createResModel() : CustomerLoginReqModel {
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
