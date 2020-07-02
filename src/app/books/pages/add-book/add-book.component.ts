import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.scss']
})
export class AddBookComponent implements OnInit {
  form: FormGroup;

  constructor(private fb: FormBuilder) {
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

  ngOnInit(): void {}

  submit() {
    this.form.markAllAsTouched();
    if (this.form.valid) {
      const value = this.form.value;
      console.log({ value });
    }
  }
}
