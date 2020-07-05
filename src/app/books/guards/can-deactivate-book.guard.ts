import { Injectable } from '@angular/core';
import { CanDeactivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, Observer } from 'rxjs';
import { AddEditBookComponent } from '../pages/add-edit-book/add-edit-book.component';

@Injectable({
  providedIn: 'root'
})
export class CanDeactivateBookGuard implements CanDeactivate<AddEditBookComponent> {
  canDeactivate(
    component: AddEditBookComponent,
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
