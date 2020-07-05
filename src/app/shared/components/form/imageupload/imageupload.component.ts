import { Component, Input } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';

@Component({
  selector: 'app-imageupload',
  templateUrl: './imageupload.component.html',
  styleUrls: ['./imageupload.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: ImageuploadComponent,
      multi: true
    }
  ]
})
export class ImageuploadComponent implements ControlValueAccessor {
  @Input() disabled = false;

  @Input()
  imageUrl = './assets/images/missing-image.png';

  onChange = (value: File) => {};

  onTouched = () => {};

  constructor() {}

  writeValue(value: File): void {
    this.onChange(value);
  }

  registerOnChange(fn: (value: any) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  uploadHandler(event: { files: File[] }): void {
    // select first file
    const [file] = event.files;
    this.onChange(file);
  }
}
