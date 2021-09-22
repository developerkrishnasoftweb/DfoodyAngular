import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.createForm();
  }

  get formControl()  { return this.loginForm.controls;}

  createForm(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, ValidationService.emailValidator]],
      fullName: ['', [Validators.required, Validators.maxLength(50)]],
      password: ['', [Validators.required, Validators.maxLength(20)]]
    });
  }

  onSubmit() {
    this.loginForm.markAllAsTouched();
    if (this.loginForm.invalid)
      return;
  }

  resetForm() {
    this.loginForm.markAsUntouched();
    this.loginForm.reset();
  }

}
