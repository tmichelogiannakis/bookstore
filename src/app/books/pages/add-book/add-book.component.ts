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
    this.form = this.fb.group({
      title: this.fb.control(null, Validators.required),
      subtitle: this.fb.control(null, Validators.required),
      description: this.fb.control(null, Validators.required),
      isbn: this.fb.control(null, Validators.required),
      pages: this.fb.control(null, Validators.required),
      published: this.fb.control(null, Validators.required),
      publisher: this.fb.control(null, Validators.required),
      author: this.fb.control(null, Validators.required),
      website: this.fb.control(null, Validators.required)
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
