import { HttpErrorResponse } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AddressDisplayModel, AddressModel } from '@core/models/customer';
import { AddressService } from '@core/services/customer/address.service';
import { ConstantMessage, ValidationMsg } from '@core/utils/enum';
import { ConfirmDialogService } from '@shared/confirm-dialog/confirm-dialog.service';
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

  get formControl() { return this.addressForm.controls; }

  modelBeforeEdit: AddressModel = new AddressModel();
  modelAfterEdit: AddressModel = new AddressModel();

  isEdit: boolean = false;
  addressId: string = "";

  locationState;

  isAPIResponseCome: boolean = false;


  constructor(private addressService: AddressService, private formBuilder: FormBuilder,
    private snackBarService: SnackBarService, private confirmDialogService: ConfirmDialogService) { }


  ngOnInit(): void {
    this.createForm();
    this.getLocation();
    this.getAddressList();
    this.handlePermission();
    Object.keys(this.addressForm.controls)
      .forEach(key => {
        if (key)
          this.onValueChanges(key);
      });
  }

  handlePermission() {
    navigator.permissions.query({ name: 'geolocation' }).then((result: PermissionStatus) => {
      this.locationState = result.state;
    });
  }


  getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        if (position) {;
          this.modelAfterEdit.latitude = position.coords.latitude.toString();
          this.modelAfterEdit.longitude = position.coords.longitude.toString();
        }
      },
        (error) => console.log(error));
    } else {
      alert("Geolocation is not supported by this browser.");
    }
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
    this.isAPIResponseCome = false;
    this.addressList = new Array<AddressDisplayModel>();
    this.addressService.getAddressList()
      .pipe(finalize(() => {
        this.isAPIResponseCome = true;
        // tslint:disable-next-line: deprecation
      })).subscribe((response) => {
        if (response && response.items && response.items.length > 0) {
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
    if (address)
      fullAddress = address.address1 + ", " + address.address2 + ", " + address.area + ", " + address.city + ", " + address.state + ", " + address.country;

    return fullAddress;
  }

  onEdit(address) {
    this.handlePermission();
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
    this.addressForm.reset();
    this.modelAfterEdit = new AddressModel();
    this.modelBeforeEdit = new AddressModel();
    this.addressForm.markAsPristine();
    this.addressForm.markAsUntouched();
    this.isEdit = false;
    this.addressId = "";
  }


  //Check form value is changed or not
  isObjectChange() {
    return JSON.stringify(this.modelAfterEdit) === JSON.stringify(this.modelBeforeEdit);
  }

  deleteConfirmDialog(id) {
    this.confirmDialogService.confirmThis(ConstantMessage.DeleteConfirm, () => {
      //yes click
      this.deleteAddress(id)
    }, () => {
      //No click
    })
  }

  deleteAddress(id) {
    this.addressService.deleteAddress(id)
      .pipe(finalize(() => {
        // tslint:disable-next-line: deprecation
      })).subscribe((response) => {
        if (response) {
          this.getAddressList();
          this.snackBarService.show(ConstantMessage.AddressDeleted);
        }
      }, error => {
        if (error instanceof HttpErrorResponse) {
          console.log(error);
        }
      });
  }

  ngOnDestroy() {
    this.modelAfterEdit = null;
    this.modelBeforeEdit = null;
    this.addressId = null;
    this.isEdit = null;
  }
}
