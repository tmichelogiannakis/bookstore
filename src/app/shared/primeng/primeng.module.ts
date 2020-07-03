import { NgModule } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { ChipsModule } from 'primeng/chips';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DataViewModule } from 'primeng/dataview';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { InputTextModule } from 'primeng/inputtext';

const modules = [ButtonModule, ChipsModule, ConfirmDialogModule, DataViewModule, InputTextModule, InputTextareaModule];

@NgModule({
  declarations: [],
  imports: [...modules],
  exports: [...modules]
})
export class PrimengModule {}
