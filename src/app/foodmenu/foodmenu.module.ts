import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FoodmenuComponent } from './foodmenu.component';
import { TranslateKeyModule } from '@core/pipes/translate-key/translate-key.module';

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
    TranslateKeyModule
  ],
  declarations: [FoodmenuComponent],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
  exports: [RouterModule]
})
export class FoodmenuModule { }
