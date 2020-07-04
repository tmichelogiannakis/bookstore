import { Injectable } from '@angular/core';
import { CanDeactivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, Observer } from 'rxjs';
import { AddBookComponent } from '../pages/add-book/add-book.component';

@Injectable({
  providedIn: 'root'
})
export class CanDeactivateBookGuard implements CanDeactivate<AddBookComponent> {
  canDeactivate(
    component: AddBookComponent,
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot,
    nextState?: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (component.form.dirty) {
      return new Observable((observer: Observer<boolean>) => {
        component.confirmationService.confirm({
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
      });
    }
    return true;
  }
}
