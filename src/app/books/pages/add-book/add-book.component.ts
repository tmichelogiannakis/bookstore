import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { ConfirmationService, SelectItem } from 'primeng/api';
import { Subject } from 'rxjs';
import { takeUntil, filter } from 'rxjs/operators';
import { CustomValidators } from '../../../shared/custom.validators';
import { BooksService } from '../../services/books.service';

@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.scss'],
  providers: [ConfirmationService]
})
export class AddBookComponent implements OnInit, OnDestroy {
  private unsubscribe: Subject<void> = new Subject();

  form: FormGroup;

  categorySelectItems: SelectItem[] = [
    {
      label: 'Classic',
      value: 1
    },
    {
      label: 'Crime/detective',
      value: 2
    },
    {
      label: 'Epic',
      value: 3
    },
    {
      label: 'Fable',
      value: 4
    },
    {
      label: 'Fairy tale',
      value: 5
    },
    {
      label: 'Fantasy',
      value: 6
    },
    {
      label: 'Folktale',
      value: 7
    },
    {
      label: 'Gothic fiction',
      value: 8
    }
  ];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    public confirmationService: ConfirmationService,
    private booksService: BooksService
  ) {
    const dt = new Date();

    this.form = this.fb.group({
      title: this.fb.control(null, [
        Validators.required,
        Validators.maxLength(120),
        // allow letters, digits and @"#&*! special chars up to 120 length
        Validators.pattern(`^(?!d+$)(?:[a-zA-Z0-9][a-zA-Z0-9 @"#&*!]*)?$`)
      ]),
      subtitle: this.fb.control(null, [
        Validators.maxLength(120),
        // allow letters, digits and @"#&*! special chars up to 120 length
        Validators.pattern(`^(?!d+$)(?:[a-zA-Z0-9][a-zA-Z0-9 @"#&*!]*)?$`)
      ]),
      description: this.fb.control(null, [
        Validators.required,
        Validators.maxLength(512),
        // must start with capital letter
        Validators.pattern(`^[A-Z].*`)
      ]),
      categories: this.fb.control([]),
      authors: this.fb.control([], [Validators.required]),
      isbn: this.fb.control(null, [
        Validators.required,
        // validate numeric value 13 digits long
        Validators.pattern('^[0-9]{13}')
      ]),
      // validate from 1 to 9999
      pages: this.fb.control(null, [Validators.required, CustomValidators.range(1, 9999)]),
      // validate from 1900 to today's year
      published: this.fb.control(null, [Validators.required, CustomValidators.range(1900, dt.getFullYear())]),
      publisher: this.fb.control(null, [Validators.required, Validators.minLength(5), Validators.maxLength(60)]),
      // validate website address
      website: this.fb.control(null, Validators.pattern(`(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?`))
    });
  }

  ngOnInit(): void {
    // If it is a NavigationEnd event re-initalise the component
    this.router.events
      .pipe(
        filter((e) => e instanceof NavigationEnd),
        takeUntil(this.unsubscribe)
      )
      .subscribe(() => {
        this.form.reset();
        this.form.updateValueAndValidity();
      });
  }

  ngOnDestroy(): void {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

  submit(): void {
    this.form.markAllAsTouched();
    if (this.form.valid) {
      const value = this.form.value;
      this.booksService
        .createBook(value)
        .pipe(takeUntil(this.unsubscribe))
        .subscribe(() => {
          this.form.markAsPristine();
          this.router.navigate(['../'], { relativeTo: this.activatedRoute });
        });
    }
  }
}
