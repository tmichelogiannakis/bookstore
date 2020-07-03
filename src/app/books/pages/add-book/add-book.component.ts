import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { Subject } from 'rxjs';
import { BooksService } from '../../services/books.service';
import { takeUntil, filter } from 'rxjs/operators';
import { ConfirmationService } from 'primeng/api';

@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.scss'],
  providers: [ConfirmationService]
})
export class AddBookComponent implements OnInit, OnDestroy {
  private unsubscribe: Subject<void> = new Subject();
  form: FormGroup;

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
        Validators.required,
        Validators.maxLength(120),
        // allow letters, digits and @"#&*! special chars up to 120 length
        Validators.pattern(`^(?!d+$)(?:[a-zA-Z0-9][a-zA-Z0-9 @"#&*!]*)?$`)
      ]),
      description: this.fb.control(null, [Validators.required, Validators.maxLength(512)]),
      categories: this.fb.array([]),
      authors: this.fb.control([], [Validators.required]),
      isbn: this.fb.control(null, [
        Validators.required,
        // validate numeric value 13 digits long
        Validators.pattern('^[0-9]{13}')
      ]),
      isbn10: this.fb.control(null, [
        Validators.required,
        // validate numeric value 10 digits long
        Validators.pattern('^[0-9]{10}')
      ]),
      // validate numeric value up to 9999
      pages: this.fb.control(null, [Validators.required, Validators.pattern('^[0-9]{1,4}$')]),
      // validate from 1900 until today
      published: this.fb.control(null, [Validators.required, Validators.min(1900), Validators.max(dt.getFullYear())]),
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

  submit() {
    this.form.markAllAsTouched();
    if (this.form.valid) {
      const value = this.form.value;
      console.log({ value });
      this.router.navigate(['../'], { relativeTo: this.activatedRoute });
    }
  }
}
