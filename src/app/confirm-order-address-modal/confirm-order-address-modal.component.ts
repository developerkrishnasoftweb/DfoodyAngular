import { HttpErrorResponse } from '@angular/common/http';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AddOrderReqModel, AddressDisplayModel } from '@core/models/customer';
import { AddressService } from '@core/services/customer/address.service';
import { MenuService } from '@core/services/customer/menu.service';
import { ConstantMessage, ValidationMsg } from '@core/utils/enum';
import { SnackBarService } from '@shared/snack-bar/snack-bar.service';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-confirm-order-address-modal',
  templateUrl: './confirm-order-address-modal.component.html',
  styleUrls: ['./confirm-order-address-modal.component.scss']
})
export class ConfirmOrderAddressModalComponent implements OnInit {

  isAddressBtnDisable: boolean = false;

  @ViewChild('closeButton1') private closeButton1: ElementRef;

  @Input('branchDetail') branchDetail: any;

  @Output() getCartListEmit = new EventEmitter<any>();


  addressList = [];
  confirmOrderForm: FormGroup;

  validationMsgEnum = ValidationMsg;

  constructor(private menuService: MenuService, private snackBarService: SnackBarService,
    private addressService: AddressService, private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.createForm();
    this.getAddressList();
    this.formControlValueChanged();
  }

  get formControl() { return this.confirmOrderForm.controls; }


  createForm(): void {
    this.confirmOrderForm = this.formBuilder.group({
      address_id: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(20)]],
      isFutureDate: [false, [Validators.required, Validators.minLength(6), Validators.maxLength(20)]],
      date: ['']
    });
  }

  //for validation of date
  formControlValueChanged() {
    const dateCtrl = this.confirmOrderForm.get('date');
    dateCtrl.setValue(new Date());
    this.confirmOrderForm.get('isFutureDate').valueChanges.subscribe(
      (mode: boolean) => {
        if (mode) {
          dateCtrl.setValidators([Validators.required]);
          this.confirmOrderForm.controls.date.setValue(null);
        }
        else {
          dateCtrl.clearValidators();
          this.confirmOrderForm.controls.date.setValue(new Date());
        }
        dateCtrl.updateValueAndValidity();
      });
  }


  //address 
  getAddressList(): void {
    this.addressService.getAddressList()
      .pipe(finalize(() => {
        // tslint:disable-next-line: deprecation
      })).subscribe((response) => {
        console.log('address ', response);
        if (response && response.items && response.items.length > 0) {
          this.addressList = response.items;
          this.addressList = this.addressList.map(data => ({
            ...data, fullAddress: this.getFullAddress(data), IsChecked: false
          }));
          this.setFormDefaultValue();
        }
      }, error => {
        if (error instanceof HttpErrorResponse) {
          console.log(error);
        }
      });
  }

  setFormDefaultValue() :void {
    if (this.addressList && this.addressList.length > 0) {
      this.confirmOrderForm.controls.address_id.setValue(this.addressList[0].id);
    }
    this.confirmOrderForm.controls.isFutureDate.setValue(false);
  }

  getFullAddress(address: AddressDisplayModel): string {
    let fullAddress = "";
    if (address) {
      fullAddress = address.address1 + ", " + address.address2 + ", " + address.area + ", " + address.city + ", " + address.state + ", " + address.country;
    }
    return fullAddress;
  }


  onSaveAddress(): void {
    this.confirmOrderForm.markAllAsTouched();
    if (this.confirmOrderForm.invalid)
      return;
    this.addOrder();
  }

  addOrder(): void {
    this.isAddressBtnDisable = true;
    const model = this.createOrderModel();
    this.menuService.AddOrder(model)
      .pipe(finalize(() => {
        this.isAddressBtnDisable = false;
        // tslint:disable-next-line: deprecation
      })).subscribe((response: any) => {
        if (response) {
          this.snackBarService.show(ConstantMessage.ItemSaved);
          this.getCartListEmit.emit();
          this.closeAddressModel();
        }
      }, error => {
        if (error instanceof HttpErrorResponse) {
          console.log(error);
        }
      });
  }

  createOrderModel(): AddOrderReqModel {
    const model = new AddOrderReqModel();
    model.branchId = this.branchDetail.id;
    model.address_id = +this.confirmOrderForm.value.address_id;
    model.orderdate = this.confirmOrderForm.value.isFutureDate ? new Date(this.confirmOrderForm.value.date) : this.confirmOrderForm.value.date;
    model.isFutureOrder = this.confirmOrderForm.value.isFutureDate;
    return model;
  }


  closeAddressModel(): void {
    this.closeButton1.nativeElement.click();
    this.confirmOrderForm.reset();
    this.setFormDefaultValue();
  }

}
