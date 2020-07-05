import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-dataview',
  templateUrl: './dataview.component.html',
  styleUrls: ['./dataview.component.scss']
})
export class DataviewComponent implements OnInit {
  @Input()
  items: any[];

  constructor() {}

  ngOnInit(): void {}
}
