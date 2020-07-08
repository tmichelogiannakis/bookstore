import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute, NavigationEnd, Params } from '@angular/router';
import { ConfirmationService, SelectItem } from 'primeng/api';
import { Subject, Observable, Observer } from 'rxjs';
import { takeUntil, filter, map } from 'rxjs/operators';
import { CustomValidators } from '../../../shared/custom.validators';
import { BooksService } from '../../services/books.service';
import { BookGenre } from '../../../core/models/book-genre.model';
import { BreadcrumbService } from '../../../core/services/breadcrumb.service';
import { CanDeactivateGuarded } from '../../../core/models/can-deactivate-guarded';

@Component({
  selector: 'app-add-edit-book',
  templateUrl: './add-edit-book.component.html',
  styleUrls: ['./add-edit-book.component.scss'],
  providers: [ConfirmationService]
})
export class AddEditBookComponent implements OnInit, OnDestroy, CanDeactivateGuarded {
  private unsubscribe: Subject<void> = new Subject();
  form: FormGroup;
  isEditMode: boolean;
  genreSelectItems: SelectItem[];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private confirmationService: ConfirmationService,
    private booksService: BooksService,
    private breadcrumbService: BreadcrumbService
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
      author: this.fb.control([], [Validators.required]),
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
      website: this.fb.control(null, Validators.pattern(`(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?`)),
      image: this.fb.control(null)
    });
  }

  canDeactivate() {
    return (
      this.form.pristine ||
      new Observable((observer: Observer<boolean>) => {
        this.confirmationService.confirm({
          message: 'You have unsaved changes. Do you want to leave this page and discard your changes?',
          accept: () => {
            observer.next(true);
            observer.complete();
          },
          reject: () => {
            observer.next(false);
            observer.complete();
          }
        });
      })
    );
  }

  ngOnInit(): void {
    // If it is a NavigationEnd event re-initalise the component
    this.router.events
      .pipe(
        filter((e) => e instanceof NavigationEnd),
        takeUntil(this.unsubscribe)
      )
      .subscribe(() => {
        this.form.markAsPristine();
      });

    this.route
      .parent!.data.pipe(
        map((data) => data.bookGenres),
        takeUntil(this.unsubscribe)
      )
      .subscribe((bookGenres: BookGenre[]) => {
        this.genreSelectItems = bookGenres.map((g) => ({ label: g.label, value: g.id }));
      });

    this.route.params.pipe(takeUntil(this.unsubscribe)).subscribe((params: Params) => {
      if (params && params.isbn) {
        const { isbn } = params;
        this.isEditMode = true;

        const { book } = this.route.snapshot.data;

        this.breadcrumbService.pushItem({
          id: 'books-edit',
          label: book.isbn,
          routerLink: ['/books', book.isbn]
        });

        let published = book.published;
        if (isNaN(Number(published))) {
          published = new Date(published).getFullYear();
        }
        let author = book.author;
        if (!Array.isArray(author)) {
          author = [author];
        }
        this.form.patchValue({ ...book, published, author });
        this.form.get('isbn')?.disable();
      } else {
        this.breadcrumbService.pushItem({
          id: 'books-add',
          label: 'New',
          routerLink: ['/books', 'add']
        });
      }
    });
  }

  ngOnDestroy(): void {
    this.breadcrumbService.removeItem(this.isEditMode ? 'books-edit' : 'books-add');
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

  submit(): void {
    this.form.markAllAsTouched();
    if (this.form.valid) {
      const value = this.form.getRawValue();
      if (this.isEditMode) {
        this.booksService
          .updateBook(value.isbn, value)
          .pipe(takeUntil(this.unsubscribe))
          .subscribe(() => {
            this.form.markAsPristine();
            this.router.navigate(['../'], { relativeTo: this.route });
          });
      } else {
        this.booksService
          .createBook(value)
          .pipe(takeUntil(this.unsubscribe))
          .subscribe(() => {
            this.form.markAsPristine();
            this.router.navigate(['../'], { relativeTo: this.route });
          });
      }
    }
  }
}
