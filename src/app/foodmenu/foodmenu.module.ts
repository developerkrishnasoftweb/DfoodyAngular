import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FoodmenuComponent } from './foodmenu.component';

const routes: Routes = [
  {
    path: '',
    component: FoodmenuComponent
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
  ],
  declarations: [FoodmenuComponent],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
  exports: [RouterModule]
})
export class FoodmenuModule { }
