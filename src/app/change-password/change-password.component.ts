import { HttpErrorResponse } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ChangePasswordReqModel, CustomerLoginReqModel } from '@core/models/customer';
import { CustomerLoginService } from '@core/services/customer/customer-login.service';
import { MyprofileService } from '@core/services/customer/myprofile.service';
import { ConfirmedValidator } from '@core/services/validation.service';
import { ConstantMessage, ValidationMsg } from '@core/utils/enum';
import { SnackBarService } from '@shared/snack-bar/snack-bar.service';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {

  changePasswordForm: FormGroup;

  validationMsgEnum = ValidationMsg;
  apiErrorMsg = "";

  isBtnDisabled: boolean = false;

  @ViewChild('closeButton') private closeButton: ElementRef;


  constructor(private formBuilder: FormBuilder,
    private snackBarService: SnackBarService,
    private router: Router, private myprofileService: MyprofileService) { }

  ngOnInit(): void {
    this.createForm();
  }

  get formControl() { return this.changePasswordForm.controls; }

  createForm(): void {
    this.changePasswordForm = this.formBuilder.group({
      oldpassword: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(20)]],
      newPassword: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(20)]],
      confirmPassword: ['', [Validators.required, Validators.maxLength(20)]]
    }, { validator: ConfirmedValidator('newPassword', 'confirmPassword') });
  }

  onSubmit(): void {
    this.changePasswordForm.markAllAsTouched();
    if (this.changePasswordForm.invalid)
      return;
    const model = this.createResModel();
    this.isBtnDisabled = true;
    this.myprofileService.changePassword(model)
      .pipe(finalize(() => {
        this.isBtnDisabled = false;
      })).subscribe(response => {
        if (response) {
          this.resetForm();
          this.closeButton.nativeElement.click();
          this.snackBarService.show(ConstantMessage.PasswordUpdated);
        }
        else
          this.apiErrorMsg = ConstantMessage.oldPasswordNotMatched;
      }, errRes => {
        if (errRes instanceof HttpErrorResponse) {
          if (errRes.error && errRes.error.errors) {
            this.apiErrorMsg = errRes.error.errors.NewPassword;
          }
        }
      });
  }

  createResModel(): ChangePasswordReqModel {
    const model = new ChangePasswordReqModel();
    model.oldPassword = this.changePasswordForm.value.oldpassword;
    model.newPassword = this.changePasswordForm.value.newPassword;
    return model;
  }

  resetForm(): void {
    this.changePasswordForm.markAsUntouched();
    this.changePasswordForm.reset();
    this.apiErrorMsg = "";
  }


}
