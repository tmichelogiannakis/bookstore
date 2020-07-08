import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { AddEditBookComponent } from './add-edit-book.component';
import { MultiSelectModule } from 'primeng/multiselect';
import { ChipsModule } from 'primeng/chips';
import { BookGenre } from '../../../core/models/book-genre.model';
import { ArrayPipe } from '../../../shared/pipes/array.pipe';
import { of, Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { ImageuploadComponent } from '../../../shared/components/form/imageupload/imageupload.component';
import { ConfirmDialog } from 'primeng/confirmDialog';
import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

const bookGenres: BookGenre[] = [
  {
    label: 'Classic',
    id: 'c1'
  },
  {
    label: 'Crime/detective',
    id: 'c2'
  }
];

describe('AddEditBookComponent', () => {
  let component: AddEditBookComponent;
  let fixture: ComponentFixture<AddEditBookComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientTestingModule, ReactiveFormsModule, NoopAnimationsModule, ChipsModule, MultiSelectModule],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            data: of(null),
            snapshot: { data: null },
            params: of(null),
            parent: { data: of({ bookGenres }), snapshot: { data: { bookGenres } }, params: of(null) }
          } as any
        }
      ],
      declarations: [AddEditBookComponent, ArrayPipe, ImageuploadComponent, ConfirmDialog],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEditBookComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('canDeactivate() should return form pristine', () => {
    component.form.markAsPristine();
    expect(component.canDeactivate()).toBeTrue();
  });

  it('canDeactivate() should open confirmation dialog if unsaved changes', () => {
    component.form.markAsDirty();
    (component.canDeactivate() as Observable<boolean>).subscribe(() => {
      const confirmDialog: ConfirmDialog = fixture.debugElement.query(By.directive(ConfirmDialog)).componentInstance;
      expect(confirmDialog.visible).toBeTrue();
    });
  });
});
