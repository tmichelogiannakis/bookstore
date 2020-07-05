import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { DataviewComponent } from './dataview.component';

describe('DataviewComponent', () => {
  let component: DataviewComponent;
  let fixture: ComponentFixture<DataviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DataviewComponent],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DataviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
