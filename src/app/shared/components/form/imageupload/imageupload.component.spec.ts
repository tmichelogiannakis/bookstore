import { async, ComponentFixture, TestBed, fakeAsync } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA, Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { ImageuploadComponent } from './imageupload.component';

@Component({
  template: `<app-imageupload [formControl]="formControl"> </app-imageupload>`
})
class TestImageUploadComponent {
  formControl = new FormControl();
}

describe('ImageuploadComponent', () => {
  let component: ImageuploadComponent;
  let nestedComponent: ImageuploadComponent;
  let wrapperComponent: TestImageUploadComponent;
  let fixture: ComponentFixture<ImageuploadComponent>;
  let wrapperFixture: ComponentFixture<TestImageUploadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      declarations: [ImageuploadComponent, TestImageUploadComponent],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImageuploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    wrapperFixture = TestBed.createComponent(TestImageUploadComponent);
    wrapperComponent = wrapperFixture.componentInstance;
    nestedComponent = wrapperFixture.debugElement.children[0].componentInstance;
    wrapperFixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should update the value when file upload', fakeAsync(() => {
    const file = new File([''], 'filename', { type: 'image/jpeg' });
    nestedComponent.uploadHandler({ files: [file] });
    expect(wrapperComponent.formControl.value).toEqual(file);
  }));

  it('should update the imageUrl attr value is supplied and not empty', () => {
    wrapperComponent.formControl.patchValue('');
    expect(nestedComponent.imageUrl).toEqual('./assets/images/missing-image.png');

    const testImageUrl = 'https://domain.com/testimage.jpng';
    wrapperComponent.formControl.patchValue(testImageUrl);
    wrapperFixture.detectChanges();
    expect(nestedComponent.imageUrl).toEqual(testImageUrl);
  });

  it('supports the disabled attribute as binding', fakeAsync(() => {
    wrapperComponent.formControl.disable();
    wrapperFixture.detectChanges();
    expect(nestedComponent.disabled).toEqual(true);
    wrapperComponent.formControl.enable();
    wrapperFixture.detectChanges();
    expect(nestedComponent.disabled).toEqual(false);
  }));
});
