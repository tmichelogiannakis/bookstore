import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ActivatedRoute, RouterStateSnapshot } from '@angular/router';
import { Observable, of, Subject } from 'rxjs';
import { CanDeactivateGuarded } from '../../core/models/can-deactivate-guarded';
import { CanDeactivateGuard } from './can-deactivate.guard';

class MockComponent implements CanDeactivateGuarded {
  returnValue: boolean | Observable<boolean>;

  constructor() {}

  canDeactivate(): boolean | Observable<boolean> {
    return this.returnValue;
  }
}

describe('CanDeactivateGuard', () => {
  let guard: CanDeactivateGuard;
  let route: ActivatedRoute;
  let mockSnapshot: RouterStateSnapshot;
  let mockComponent: MockComponent;

  beforeEach(() => {
     TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers: [
        MockComponent,
        {
          provide: ActivatedRoute,
          useValue: {
            data: of(null),
            snapshot: { data: null },
            params: of(null)
          } as any
        }
      ]
    });
    guard = TestBed.inject(CanDeactivateGuard);
    route = TestBed.get(ActivatedRoute);
    mockComponent = TestBed.get(MockComponent);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });

  it('be able to leave route when form is pristine', () => {
    mockComponent.returnValue = true;
    expect(guard.canDeactivate(mockComponent, route.snapshot, mockSnapshot)).toBeTruthy();
  });

  it('can leave route if unguarded', () => {
    // MockComponent.canDeactivate returns true
    mockComponent.returnValue = true;
    expect(guard.canDeactivate(mockComponent, route.snapshot, mockSnapshot)).toBeTruthy();
  });

  it('can leave route if guarded and user accepted the dialog', () => {
    // MockComponent.canDeactivate returns Observable<boolean>
    const subject$ = new Subject<boolean>();
    mockComponent.returnValue = subject$.asObservable();
    const canDeactivate$ = <Observable<boolean>>guard.canDeactivate(mockComponent, route.snapshot, mockSnapshot);
    canDeactivate$.subscribe((deactivate) => {
      expect(deactivate).toBeTruthy();
    });
    // emulate the accept()
    subject$.next(true);
  });

  it('will not leave the route if guarded and user rejected the dialog', () => {
    // MockComponent.canDeactivate returns Observable<boolean>
    const subject$ = new Subject<boolean>();
    mockComponent.returnValue = subject$.asObservable();

    const canDeactivate$ = <Observable<boolean>>guard.canDeactivate(mockComponent, route.snapshot, mockSnapshot);
    canDeactivate$.subscribe((deactivate) => {
      expect(deactivate).toBeFalsy();
    });

    // emulate the reject()
    subject$.next(false);
  });
});
