import { Component } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
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
export class AppComponent {
  opened: boolean = true;

  toggleSidebar() {
    this.opened = !this.opened;
  }
}
