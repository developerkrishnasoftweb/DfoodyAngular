import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Brand } from '@core/models/customer';
import { MenuService } from '@core/services/customer/menu.service';
import { finalize } from 'rxjs/operators';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  brandList = new Array<Brand>();

  items = new Array<Brand>();

  size = 3;

  constructor(private menuService: MenuService) { }

  ngOnInit(): void {
    this.getBrands();
  }

  getBrands(): void {
    this.menuService.getBrands()
      .pipe(finalize(() => {
        // tslint:disable-next-line: deprecation
      })).subscribe((response: any) => {
        this.brandList = response.items;
        this.items = this.brandList.slice(0, this.size)
      }, error => {
        if (error instanceof HttpErrorResponse) {
          console.log(error);
        }
      });
  }

  displayBranch(item) {
    console.log('item ', item);
    this.menuService.GetBranches({'brandId':item.id})
    .pipe(finalize(() => {
      // tslint:disable-next-line: deprecation
    })).subscribe((response: any) => {
      console.log('response ', response);
    }, error => {
      if (error instanceof HttpErrorResponse) {
        console.log(error);
      }
    });
  }

}
