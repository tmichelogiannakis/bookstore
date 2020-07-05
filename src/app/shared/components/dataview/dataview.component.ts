import { Component, Input, OnChanges, SimpleChanges, TemplateRef, ContentChildren, QueryList } from '@angular/core';
import { isEmptyInputValue } from '../../utils';
import { PrimeTemplate } from 'primeng/api';

@Component({
  selector: 'app-dataview',
  templateUrl: './dataview.component.html',
  styleUrls: ['./dataview.component.scss']
})
export class DataviewComponent implements OnChanges {
  @Input()
  layout: string = 'grid';

  @Input() 
  emptyMessage: string = 'No records found';

  @Input()
  items: any[];

  @Input()
  trackBy: (index: number, item: any) => any;

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

  @ContentChildren(PrimeTemplate) templates: QueryList<any>;

  listItemTemplate: TemplateRef<any>;

  gridItemTemplate: TemplateRef<any>;

  itemTemplate: TemplateRef<any>;

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

  ngAfterContentInit() {
    this.templates.forEach((item) => {
      switch (item.getType()) {
        case 'listItem':
          this.listItemTemplate = item.template;
          break;

        case 'gridItem':
          this.gridItemTemplate = item.template;
          break;
      }
    });

    this.updateItemTemplate();
  }

  updateItemTemplate() {
    switch (this.layout) {
      case 'list':
        this.itemTemplate = this.listItemTemplate;
        break;

      case 'grid':
        this.itemTemplate = this.gridItemTemplate;
        break;
    }
  }

  changeLayout(layout: string) {
    this.layout = layout;
    this.updateItemTemplate();
  }
}
