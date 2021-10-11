import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmOrderAddressModalComponent } from './confirm-order-address-modal.component';

describe('ConfirmOrderAddressModalComponent', () => {
  let component: ConfirmOrderAddressModalComponent;
  let fixture: ComponentFixture<ConfirmOrderAddressModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfirmOrderAddressModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmOrderAddressModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
