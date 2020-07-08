import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA, Component, SimpleChange } from '@angular/core';
import { By } from '@angular/platform-browser';
import { PrimeTemplate } from 'primeng/api';
import { DataviewComponent } from './dataview.component';

@Component({
  template: `<app-dataview
    [items]="items"
    [globalFilter]="globalFilter"
    [filters]="filters"
    [emptyMessage]="emptyMessage"
    [trackBy]="trackBy"
    [layout]="layout"
  >
    <ng-template let-item pTemplate="listItem">
      <pre>{{ items | json }}</pre>
    </ng-template>
    <ng-template let-item pTemplate="gridItem">
      <pre>{{ items | json }}</pre>
    </ng-template>
  </app-dataview>`
})
class HostComponent {
  items: any[] = [];

  setItems(value: any[]) {
    this.items = value;
  }

  layout: string = 'grid';

  setLayout(value: string) {
    this.layout = value;
  }

  trackBy: (index: number, item: any) => any = (index, item) => index;

  setTrackByFn(value: (index: number, item: any) => any) {
    this.trackBy = value;
  }

  globalFilter: {
    fields: string[];
    value: string;
  } = {
    fields: ['title'],
    value: ''
  };

  setGlobalFilter(value: { fields: string[]; value: string }) {
    this.globalFilter = value;
  }

  filters: {
    [field: string]: {
      value: any;
      matchMode?: string;
    };
  } = {
    categories: {
      value: null,
      matchMode: 'in'
    },
    published: {
      value: [],
      matchMode: '<>'
    },
    author: {
      value: null,
      matchMode: 'in'
    }
  };

  setFilters(value: {
    [field: string]: {
      value: any;
      matchMode?: string;
    };
  }) {
    this.filters = value;
  }

  emptyMessage: string = 'emptyMessage';

  setEmptyMessage(value: string) {
    this.emptyMessage = value;
  }
}

describe('DataviewComponent', () => {
  let component: DataviewComponent;
  let fixture: ComponentFixture<DataviewComponent>;
  let hostComponent: HostComponent;
  let nestedComponent: DataviewComponent;
  let hostFixture: ComponentFixture<HostComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DataviewComponent, HostComponent, PrimeTemplate],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DataviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    hostFixture = TestBed.createComponent(HostComponent);
    hostComponent = hostFixture.componentInstance;
    nestedComponent = hostFixture.debugElement.children[0].componentInstance;
    hostFixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('supports the emptymessage attribute as binding', () => {
    const newMessage = 'new empty message';
    hostComponent.setEmptyMessage(newMessage);
    hostFixture.detectChanges();
    expect(nestedComponent.emptyMessage).toEqual(newMessage);
  });

  it('supports the filters attribute as binding', () => {
    const newFilters: {
      [field: string]: {
        value: any;
        matchMode: 'in' | '<>';
      };
    } = {
      published: {
        value: [2005, 2010],
        matchMode: '<>'
      },
      author: {
        value: null,
        matchMode: 'in'
      }
    };
    hostComponent.setFilters(newFilters);
    hostFixture.detectChanges();
    expect(nestedComponent.filters).toEqual(newFilters);
  });

  it('supports the globalFilter attribute as binding', () => {
    const newGlobalFilter = {
      fields: ['title'],
      value: 'searchstring'
    };
    hostComponent.setGlobalFilter(newGlobalFilter);
    hostFixture.detectChanges();
    expect(nestedComponent.globalFilter).toEqual(newGlobalFilter);
  });

  it('supports the items attribute as binding', () => {
    const newItems = [1, 2, 3];
    hostComponent.setItems(newItems);
    hostFixture.detectChanges();
    expect(nestedComponent.items).toEqual(newItems);
  });

  it('supports the layout attribute as binding', () => {
    const newLayout = 'list';
    hostComponent.setLayout(newLayout);
    hostFixture.detectChanges();
    expect(nestedComponent.layout).toEqual(newLayout);
  });

  it('supports the trackBy attribute as binding', () => {
    const newTrachByFn = (index: number, item: any) => item.id;
    hostComponent.setTrackByFn(newTrachByFn);
    hostFixture.detectChanges();
    expect(nestedComponent.trackBy).toEqual(newTrachByFn);
  });

  it('should have grid items template set', () => {
    expect(nestedComponent.gridItemTemplate).toBeTruthy();
  });

  it('should have list items template set', () => {
    expect(nestedComponent.listItemTemplate).toBeTruthy();
  });

  it('should have item template set', () => {
    expect(nestedComponent.itemTemplate).toBeTruthy();
  });

  it('should trigger updateItemTemplate on change layouts and set new layout', () => {
    spyOn(nestedComponent, 'updateItemTemplate');
    nestedComponent.changeLayout('list');
    hostFixture.detectChanges();
    expect(nestedComponent.layout).toBe('list');
    expect(nestedComponent.updateItemTemplate).toHaveBeenCalled();
  });

  it('should trigger change layouts', () => {
    spyOn(nestedComponent, 'changeLayout');
    const button = hostFixture.debugElement.query(By.css('.ui-button-list')).nativeElement;
    button.click();
    expect(nestedComponent.changeLayout).toHaveBeenCalled();
  });

  describe('using filters', () => {
    const items = [
      {
        title: 'Alpha',
        users: 1478,
        tags: ['tag#1', 'tag#2']
      },
      {
        title: 'Subin',
        users: 4834,
        tags: ['tag#1']
      },
      {
        title: 'Holdlamis',
        users: 9150,
        tags: ['tag#1', 'tag#3']
      },
      {
        title: 'Zathin',
        users: 9995,
        tags: 'tag#1'
      },
      {
        title: 'Bamity',
        users: 1238,
        tags: ['tag#1']
      },
      {
        title: 'Job',
        users: 4732,
        tags: 'tag#1'
      },
      {
        title: 'Fix San',
        users: 5700,
        tags: ['tag#1']
      },
      {
        title: 'Vagram',
        users: 1032,
        tags: ['tag#1']
      },
      {
        title: 'Ventosanzap',
        users: 6387,
        tags: ['tag#1']
      },
      {
        title: 'Alpha',
        users: 4366,
        tags: ['tag#1', 'tag#2']
      }
    ];

    beforeEach(() => {
      hostComponent.setItems(items);
    });

    it('should filter nothing', () => {
      hostFixture.detectChanges();
      expect(nestedComponent.filteredItems).toEqual(items);
    });

    it('should filter matchMode "in"', () => {
      hostComponent.setFilters({
        tags: {
          value: ['tag#1', 'tag#2', 'tag#3', 'tag#4'],
          matchMode: 'in'
        }
      });
      hostFixture.detectChanges();
      expect(nestedComponent.filteredItems).toEqual(items);

      hostComponent.setFilters({
        tags: {
          value: ['tag#1'],
          matchMode: 'in'
        }
      });
      hostFixture.detectChanges();
      expect(nestedComponent.filteredItems).toEqual(items);

      hostComponent.setFilters({
        tags: {
          value: ['tag#2'],
          matchMode: 'in'
        }
      });
      hostFixture.detectChanges();
      expect(nestedComponent.filteredItems).toEqual([items[0], items[9]]);

      hostComponent.setFilters({
        tags: {
          value: ['tag#3'],
          matchMode: 'in'
        }
      });
      hostFixture.detectChanges();
      expect(nestedComponent.filteredItems).toEqual([items[2]]);
    });

    it('should filter matchMode "<>"', () => {
      hostComponent.setFilters({
        users: {
          value: [1000, 10000],
          matchMode: '<>'
        }
      });
      hostFixture.detectChanges();
      expect(nestedComponent.filteredItems).toEqual(items);

      hostComponent.setFilters({
        users: {
          value: [3000, 6000],
          matchMode: '<>'
        }
      });
      hostFixture.detectChanges();
      expect(nestedComponent.filteredItems).toEqual([items[1], items[5], items[6], items[9]]);
    });

    it('should filter with global filter', () => {
      hostComponent.setGlobalFilter({
        fields: ['title'],
        value: 'Alp'
      });
      hostFixture.detectChanges();
      expect(nestedComponent.filteredItems).toEqual([items[0], items[9]]);

      hostComponent.setGlobalFilter({
        fields: ['title'],
        value: ''
      });
      hostFixture.detectChanges();
      expect(nestedComponent.filteredItems).toEqual(items);
    });

    it('should combine filter matchMode "<>" and "in and global filter', () => {
      hostComponent.setFilters({
        users: {
          value: [3000, 6000],
          matchMode: '<>'
        },
        tags: {
          value: ['tag#2'],
          matchMode: 'in'
        }
      });
      hostComponent.setGlobalFilter({
        fields: ['title'],
        value: 'Alp'
      });
      hostFixture.detectChanges();
      expect(nestedComponent.filteredItems).toEqual([items[9]]);
    });
  });
});
