import { HttpErrorResponse } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CustomerInfo, MyProfileModel } from '@core/models/customer';
import { CustomerDataPreFillService } from '@core/services/customer/customer-data-pre-fill.service';
import { CustomerRegistrationService } from '@core/services/customer/customer-registration.service';
import { MyprofileService } from '@core/services/customer/myprofile.service';
import { ValidationMsg } from '@core/utils/enum';
import { SnackBarComponent } from '@shared/snack-bar/snack-bar.component';
import { SnackBarService } from '@shared/snack-bar/snack-bar.service';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.scss']
})
export class MyProfileComponent implements OnInit {

  customerInfo: CustomerInfo;

  userForm: FormGroup;

  validationMsgEnum = ValidationMsg;

  isMobileExist: boolean = false;

  isSubmitDisable: boolean = false;

  modelBeforeEdit: MyProfileModel;
  modelAfterEdit: MyProfileModel;


  get formControl() { return this.userForm.controls; }

  constructor(private myprofileService: MyprofileService, private formBuilder: FormBuilder,
    private customerRegistrationService: CustomerRegistrationService,
    private snackBarService: SnackBarService,
    private preFillService: CustomerDataPreFillService) { }

  ngOnInit(): void {
    this.createForm();
    this.getProfileData();
    Object.keys(this.userForm.controls)
      .forEach(key => {
        if (key)
          this.onValueChanges(key);
      });
  }


  //for update model value after form value change
  onValueChanges(key): void {
    this.userForm.get(key).valueChanges.subscribe((value) => {
      if (key && (this.userForm.controls[key].dirty || this.userForm.controls[key].touched)) {
        this.modelAfterEdit[key] = value;
      }
    });
  }

  createForm(): void {
    this.userForm = this.formBuilder.group({
      mobile: ['', [Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]],
      firstName: ['', [Validators.required, Validators.maxLength(50)]],
      lastName: ['', [Validators.required, Validators.maxLength(50)]],
    });
  }


  resetForm(): void {
    this.userForm.markAsUntouched();
    this.userForm.reset();
  }

  getProfileData(): void {
    this.myprofileService.getMyProfile()
      .pipe(finalize(() => {
        // tslint:disable-next-line: deprecation
      })).subscribe((response: CustomerInfo) => {
        console.log(response);
        this.customerInfo = response;
        if (this.customerInfo) {
          this.customerInfo.fullName = this.customerInfo.firstName + ' ' + this.customerInfo.lastName;
          this.preFillService.userFullName = this.customerInfo.fullName;
          this.setFormData();
        }
      }, error => {
        if (error instanceof HttpErrorResponse) {
          console.log(error);
        }
      });
  }

  setFormData(): void {
    // this.userForm.controls.email.setValue(this.customerInfo.email);
    this.userForm.controls.mobile.setValue(this.customerInfo.mobile);
    this.userForm.controls.firstName.setValue(this.customerInfo.firstName);
    this.userForm.controls.lastName.setValue(this.customerInfo.lastName);

    //set model value
    this.modelBeforeEdit = new MyProfileModel();
    this.modelAfterEdit = new MyProfileModel();
    this.modelBeforeEdit.mobile = this.customerInfo.mobile;
    // this.modelBeforeEdit.email = this.customerInfo.email;
    this.modelBeforeEdit.firstName = this.customerInfo.firstName;
    this.modelBeforeEdit.lastName = this.customerInfo.lastName;
    this.modelAfterEdit = JSON.parse(JSON.stringify(this.modelBeforeEdit));
  }

  //Check email valid or not 
  checkIsMobileExist(): void {
    this.customerRegistrationService.checkIsMobileExist(this.userForm.value.mobile)
      .pipe(finalize(() => {

      })).subscribe(response => {
        this.isMobileExist = response;
      }, error => {
        if (error instanceof HttpErrorResponse) {
          console.log(error);
        }
      });
  }


  //Check form value is changed or not
  isObjectChange() {
    return JSON.stringify(this.modelAfterEdit) === JSON.stringify(this.modelBeforeEdit);
  }

  onSubmit(): void {
    this.userForm.markAllAsTouched();
    if (this.userForm.invalid)
      return;
    else if (this.isMobileExist)
      return;
    this.isSubmitDisable = true;
    this.myprofileService.updateProfileInfo(this.modelAfterEdit)
      .pipe(finalize(() => {
        this.isSubmitDisable = false;
      })).subscribe(response => {
        if (response) {
          // this.resetForm();
          this.customerInfo = response.body;
          this.customerInfo.fullName = this.customerInfo.firstName + ' ' + this.customerInfo.lastName;
          this.preFillService.userFullName = this.customerInfo.fullName;
          this.modelBeforeEdit = JSON.parse(JSON.stringify(this.modelAfterEdit));
          this.snackBarService.show("Data is Updated Successfully");
        }
      }, error => {
        if (error instanceof HttpErrorResponse) {
          console.log(error);
        }
      });
  }
}
