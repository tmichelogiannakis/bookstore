import { Component, Input, ChangeDetectionStrategy, Output, EventEmitter } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('menuButtonState', [
      state(
        'right',
        style({
          transform: 'rotate(0)'
        })
      ),
      state(
        'left',
        style({
          transform: 'rotate(-180deg)'
        })
      ),
      transition('left => right', animate('250ms ease-in')),
      transition('right => left', animate('250ms ease-out'))
    ])
  ]
})
export class HeaderComponent {
  @Input()
  opened: boolean;

  @Output()
  toggleSidebar: EventEmitter<void> = new EventEmitter();

  constructor() {}

  onClick() {
    this.toggleSidebar.emit();
  }
}
