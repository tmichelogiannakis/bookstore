import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-sidebar-container',
  templateUrl: './sidebar-container.component.html',
  styleUrls: ['./sidebar-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SidebarContainerComponent {
  isLarge$: Observable<boolean>;

  @Input()
  opened: boolean;

  constructor(private breakpointObserver: BreakpointObserver) {
    this.isLarge$ = this.breakpointObserver.observe(Breakpoints.Large).pipe(map((state) => state.matches));
  }
}
