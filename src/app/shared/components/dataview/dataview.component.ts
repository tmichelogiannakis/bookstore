import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { isEmptyInputValue } from '../../utils';

@Component({
  selector: 'app-dataview',
  templateUrl: './dataview.component.html',
  styleUrls: ['./dataview.component.scss']
})
export class DataviewComponent implements OnChanges {


  @Input()
  items: any[];

  @Input()
  globalFilter: {
    fields: string[];
    value: string;
  };

  @Input()
  filters: {
    [field: string]: {
      value: any;
      matchMode?: string;
    };
  };

  filteredItems: any[];

  constructor() {}

  ngOnChanges(changes: SimpleChanges): void {
    this.filteredItems = [...this.items];

    if (this.globalFilter) {
      const { value, fields } = this.globalFilter;
      if (value && fields) {
        this.filteredItems = this.filteredItems.filter((item) => {
          return fields.some((field) => item[field].toLowerCase().includes(value.toLowerCase()));
        });
      }
    }

    Object.entries(this.filters).forEach(([field, metadata]) => {
      const { value, matchMode } = metadata;
      if (!isEmptyInputValue(value) && matchMode) {
        switch (matchMode) {
          case 'in':
            this.filteredItems = this.filteredItems.filter((item) => {
              const prop = item[field];
              if (Array.isArray(prop)) {
                return prop.some((i) => value.includes(i));
              } else {
                return value.includes(prop);
              }
            });
            break;
          default:
        }
      }
    });
  }
}
