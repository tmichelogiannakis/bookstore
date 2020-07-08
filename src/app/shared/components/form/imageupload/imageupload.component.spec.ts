import { async, ComponentFixture, TestBed, fakeAsync } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA, Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { ImageuploadComponent } from './imageupload.component';

const defaultImageUrl = './assets/images/missing-image.png';
const testImageUrl = 'https://example.com/test-image.jpg';

@Component({
  template: `<app-imageupload [formControl]="formControl"></app-imageupload>`
})
class HostComponent {
  formControl = new FormControl();
}

describe('ImageuploadComponent', () => {
  let component: ImageuploadComponent;
  let fixture: ComponentFixture<ImageuploadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule,],
      declarations: [ImageuploadComponent, HostComponent],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImageuploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should update the value when file uploaded', fakeAsync(() => {
    spyOn(component, 'onChange');
    const file = new File([''], 'filename', { type: 'image/jpeg' });
    component.uploadHandler({ files: [file] });
    expect(component.onChange).toHaveBeenCalled();
  }));

  describe('using FormControl', () => {
    let nestedComponent: ImageuploadComponent;
    let hostComponent: HostComponent;
    let hostFixture: ComponentFixture<HostComponent>;

    beforeEach(fakeAsync(() => {
      hostFixture = TestBed.createComponent(HostComponent);
      hostComponent = hostFixture.componentInstance;
      nestedComponent = hostFixture.debugElement.children[0].componentInstance;
      hostFixture.detectChanges();
    }));

    it('should toggle the disabled state', () => {
      hostComponent.formControl.disable();
      expect(nestedComponent.disabled).toEqual(true);
      hostComponent.formControl.enable();
      expect(nestedComponent.disabled).toEqual(false);
    });

    it('should set the value', () => {
      // empty values are ignored
      hostComponent.formControl.patchValue('');
      hostFixture.detectChanges();
      expect(nestedComponent.imageUrl).toEqual(defaultImageUrl);

      hostComponent.formControl.patchValue(testImageUrl);
      hostFixture.detectChanges();
      expect(nestedComponent.imageUrl).toEqual(testImageUrl);
    });

    it('should call writeValue', () => {
      spyOn(nestedComponent, 'writeValue');
      hostComponent.formControl.patchValue(testImageUrl);
      hostFixture.detectChanges();
      expect(nestedComponent.writeValue).toHaveBeenCalled();
    });

    it('should register the on change callback', () => {
      let spy = jasmine.createSpy('onChange callback');
      hostComponent.formControl.registerOnChange(spy);
      hostComponent.formControl.setValue(testImageUrl);
      expect(spy).toHaveBeenCalled();
    });
  });
});
