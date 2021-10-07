import { HttpErrorResponse } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AddressDisplayModel, AddressModel } from '@core/models/customer';
import { AddressService } from '@core/services/customer/address.service';
import { ConstantMessage, ValidationMsg } from '@core/utils/enum';
import { SnackBarService } from '@shared/snack-bar/snack-bar.service';
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

  @ViewChild('closeButton') private closeButton: ElementRef;
  @ViewChild('addButton') private addButton: ElementRef;

  addressList = new Array<AddressDisplayModel>();


  constructor(private addressService: AddressService, private formBuilder: FormBuilder,
    private snackBarService: SnackBarService) { }

  get formControl() { return this.addressForm.controls; }

  modelBeforeEdit: AddressModel = new AddressModel();
  modelAfterEdit: AddressModel = new AddressModel();

  isEdit: boolean = false;
  addressId: string = "";

  getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        if (position) {
          console.log("Latitude: " + position.coords.latitude +
            "Longitude: " + position.coords.longitude);
          this.modelAfterEdit.latitude = position.coords.latitude.toString();
          this.modelAfterEdit.longitude = position.coords.longitude.toString();
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
        if (response && response.items) {
          this.addressList = response.items;
          this.addressList = this.addressList.map(data => ({
            ...data, fullAddress: this.getFullAddress(data)
          }))
        }
      }, error => {
        if (error instanceof HttpErrorResponse) {
          console.log(error);
        }
      });
  }

  getFullAddress(address: AddressDisplayModel): string {
    let fullAddress = "";
    if (address) {
      fullAddress = address.address1 + ", " + address.address2 + ", " + address.area + ", " + address.city + ", " + address.state + ", " + address.country;
    }
    return fullAddress;
  }

  onEdit(address) {
    this.isEdit = true;
    this.modelAfterEdit = new AddressModel();
    this.modelBeforeEdit = new AddressModel();
    this.modelBeforeEdit = Object.assign(address);
    this.modelAfterEdit = JSON.parse(JSON.stringify(this.modelBeforeEdit));
    this.addressId = address.id;
    if (this.addButton)
      this.addButton.nativeElement.click();
    this.addressForm.patchValue(this.modelBeforeEdit);
  }

  createForm(): void {
    this.addressForm = this.formBuilder.group({
      address1: ['', [Validators.required, Validators.maxLength(100)]],
      address2: ['', [Validators.required, Validators.maxLength(100)]],
      area: ['', [Validators.required, Validators.maxLength(100)]],
      type: ['', [Validators.required, Validators.maxLength(50)]],
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
    this.isBtnDisabled = true;
    if (this.isEdit)
      this.updateAddress();
    else
      this.addAddress();
  }

  addAddress() {
    this.addressService.addAddress(this.modelAfterEdit)
      .pipe(finalize(() => {
        // tslint:disable-next-line: deprecation
      })).subscribe((response) => {
        if (response) {
          this.isBtnDisabled = false;
          this.closeButton.nativeElement.click();
          this.getAddressList();
          this.snackBarService.show(ConstantMessage.AddressSaved);
        }
      }, error => {
        if (error instanceof HttpErrorResponse) {
          console.log(error);
        }
      });
  }

  updateAddress() {
    this.addressService.updateAddress(this.modelAfterEdit, this.addressId)
      .pipe(finalize(() => {
        // tslint:disable-next-line: deprecation
      })).subscribe((response) => {
        if (response) {
          this.isBtnDisabled = false;
          this.getAddressList();
          this.closeButton.nativeElement.click();
          this.snackBarService.show(ConstantMessage.AddressUpdated);
        }
      }, error => {
        if (error instanceof HttpErrorResponse) {
          console.log(error);
        }
      });
  }

  resetForm() {
    console.log('closeButton');
    this.addressForm.reset();
    this.modelAfterEdit = new AddressModel();
    this.modelBeforeEdit = new AddressModel();
    this.addressForm.markAsPristine();
    this.addressForm.markAsUntouched();
    this.isEdit = false;
    this.addressId = "";
  }

}
