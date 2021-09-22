import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.createForm();
  }

  get formControl()  { return this.registrationForm.controls;}

  createForm(): void {
    this.registrationForm = this.formBuilder.group({
      email: ['', [Validators.required, ValidationService.emailValidator]],
      fullName: ['', [Validators.required, Validators.maxLength(50)]],
      password: ['', [Validators.required, Validators.maxLength(20)]]
    });
  }

  onSubmit() {
    this.registrationForm.markAllAsTouched();
    if (this.registrationForm.invalid)
      return;
  }

  resetForm() {
    this.registrationForm.markAsUntouched();
    this.registrationForm.reset();
  }
}
