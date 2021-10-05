import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AddressService } from '@core/services/customer/address.service';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-customer-address',
  templateUrl: './customer-address.component.html',
  styleUrls: ['./customer-address.component.scss']
})
export class CustomerAddressComponent implements OnInit {

  addressForm: FormGroup;

  isBtnDisabled:boolean = false;

  constructor(private addressService: AddressService, private formBuilder: FormBuilder) { }

  get formControl() { return this.addressForm.controls; }


  ngOnInit(): void {
    this.createForm();
    this.getAddressList();
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
    this.addressForm.markAllAsTouched();
    if (this.addressForm.invalid)
      return;
  }

  resetForm() {

  }

}
