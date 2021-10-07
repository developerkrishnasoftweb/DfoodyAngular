import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AddressReqModel } from '@core/models/customer';
import { AddressService } from '@core/services/customer/address.service';
import { ValidationMsg } from '@core/utils/enum';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-customer-address',
  templateUrl: './customer-address.component.html',
  styleUrls: ['./customer-address.component.scss']
})
export class CustomerAddressComponent implements OnInit {

  addressForm: FormGroup;

  validationMsgEnum = ValidationMsg;


  isBtnDisabled: boolean = false;

  constructor(private addressService: AddressService, private formBuilder: FormBuilder) { }

  get formControl() { return this.addressForm.controls; }

  modelBeforeEdit: AddressReqModel = new AddressReqModel();
  modelAfterEdit: AddressReqModel = new AddressReqModel();

  getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        if (position) {
          console.log("Latitude: " + position.coords.latitude +
            "Longitude: " + position.coords.longitude);
          this.modelAfterEdit.latitude = position.coords.latitude;
          this.modelAfterEdit.longitude = position.coords.longitude;
        }
      },
        (error) => console.log(error));
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  }

  ngOnInit(): void {
    this.createForm();
    this.getLocation();
    this.getAddressList();
    Object.keys(this.addressForm.controls)
      .forEach(key => {
        if (key)
          this.onValueChanges(key);
      });
  }


  //for update model value after form value change
  onValueChanges(key): void {
    this.addressForm.get(key).valueChanges.subscribe((value) => {
      if (key && (this.addressForm.controls[key].dirty || this.addressForm.controls[key].touched)) {
        this.modelAfterEdit[key] = value;
      }
    });
  }

  getAddressList(): void {
    this.addressService.getAddressList()
      .pipe(finalize(() => {
        // tslint:disable-next-line: deprecation
      })).subscribe((response) => {
        console.log(response);
      }, error => {
        if (error instanceof HttpErrorResponse) {
          console.log(error);
        }
      });
  }

  createForm(): void {
    this.addressForm = this.formBuilder.group({
      address1: ['', [Validators.required, Validators.maxLength(100)]],
      address2: ['', [Validators.required, Validators.maxLength(100)]],
      area: ['', [Validators.required, Validators.maxLength(100)]],
      city: ['', [Validators.required, Validators.maxLength(20)]],
      state: ['', [Validators.required, Validators.maxLength(20)]],
      country: ['', [Validators.required, Validators.maxLength(20)]],
      landmark: ['', [Validators.required, Validators.maxLength(200)]],
      contactPerson: ['', [Validators.required, Validators.maxLength(100)]],
      contactNumber: ['', [Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]],
      contactAddress: ['', [Validators.required, Validators.maxLength(500)]],
      remark: ['', [Validators.required, Validators.maxLength(500)]]
    });
  }

  onSubmit() {
    console.log('AddressReqModel ', this.modelAfterEdit);
    this.addressForm.markAllAsTouched();
    if (this.addressForm.invalid)
      return;
    this.addressService.addAddress(this.modelAfterEdit)
      .pipe(finalize(() => {
        // tslint:disable-next-line: deprecation
      })).subscribe((response) => {
        console.log(response);
      }, error => {
        if (error instanceof HttpErrorResponse) {
          console.log(error);
        }
      });
  }

  resetForm() {
    this.addressForm.reset();
  }

}
