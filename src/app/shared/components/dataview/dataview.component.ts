import {
  Component,
  Input,
  OnChanges,
  SimpleChanges,
  TemplateRef,
  ContentChildren,
  QueryList,
  ChangeDetectionStrategy,
  AfterContentInit
} from '@angular/core';
import { isEmptyInputValue } from '../../utils';
import { PrimeTemplate } from 'primeng/api';

@Component({
  selector: 'app-dataview',
  templateUrl: './dataview.component.html',
  styleUrls: ['./dataview.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DataviewComponent implements OnChanges, AfterContentInit {
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

  // filters for fields
  // only 'in' and '<>' matchmodes implemented
  @Input()
  filters: {
    [field: string]: {
      value: any;
      matchMode: 'in' | '<>';
    };
  };

  @ContentChildren(PrimeTemplate) templates: QueryList<any>;

  listItemTemplate: TemplateRef<any>;

  gridItemTemplate: TemplateRef<any>;

  // selected template to display
  itemTemplate: TemplateRef<any>;

  filteredItems: any[];

  constructor() {}

  ngOnChanges(changes: SimpleChanges): void {
    if ('layout' in changes) {
      this.updateItemTemplate();
    }

    if ('items' in changes || 'globalFilter' in changes || 'filters' in changes) {
      let items = [...this.items];
      if (this.globalFilter) {
        const { value, fields } = this.globalFilter;
        if (value && fields) {
          items = this.evaluateGlobalFilter(value, fields, items);
        }
      }

      Object.entries(this.filters).forEach(([field, metadata]) => {
        const { value, matchMode } = metadata;
        if (!isEmptyInputValue(value) && matchMode) {
          items = this.evaluateFilter(value, field, matchMode, items);
        }
      });

      this.filteredItems = [...items];
    }
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

  // toggle layouts
  changeLayout(layout: string) {
    this.layout = layout;
    this.updateItemTemplate();
  }

  private evaluateGlobalFilter(value: string, fields: string[], items: any[]) {
    return items.filter((item) => {
      return fields.some((field) => item[field].toLowerCase().includes(value.toLowerCase()));
    });
  }

  private evaluateFilter(value: string, field: string, matchMode: 'in' | '<>', items: any[]) {
    switch (matchMode) {
      case 'in':
        return items.filter((item) => {
          const prop = item[field];
          if (Array.isArray(prop)) {
            return prop.some((i) => value.includes(i));
          } else {
            return value.includes(prop);
          }
        });
      case '<>':
        return items.filter((item) => {
          const prop = item[field];
          return prop >= value[0] && prop <= value[1];
        });
      default:
        return items;
    }
  }
}
