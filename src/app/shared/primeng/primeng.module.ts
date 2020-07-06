import { NgModule } from '@angular/core';
import { BlockUIModule } from 'primeng/blockui';
import { ButtonModule } from 'primeng/button';
import { ChipsModule } from 'primeng/chips';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DropdownModule } from 'primeng/dropdown';
import { FileUploadModule } from 'primeng/fileupload';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { InputTextModule } from 'primeng/inputtext';
import { MultiSelectModule } from 'primeng/multiselect';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { SliderModule } from 'primeng/slider';

const modules = [
  ButtonModule,
  BlockUIModule,
  ChipsModule,
  ConfirmDialogModule,
  DropdownModule,
  FileUploadModule,
  InputTextModule,
  InputTextareaModule,
  MultiSelectModule,
  ProgressSpinnerModule,
  SliderModule
];

@NgModule({
  declarations: [],
  imports: [...modules],
  exports: [...modules]
})
export class PrimengModule {}
