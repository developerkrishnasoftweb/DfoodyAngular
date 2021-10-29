import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateKeyPipe } from './translate-key.pipe';



@NgModule({
  declarations: [TranslateKeyPipe],
  imports: [
    CommonModule
  ],
  exports: [TranslateKeyPipe]
})
export class TranslateKeyModule { }
