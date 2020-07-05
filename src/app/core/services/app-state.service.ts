import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

interface AppStateModel {
  loading: boolean;
}

const defaultState: AppStateModel = {
  loading: false
};

// Treat this service as substate in ngrx/ngxs
@Injectable({
  providedIn: 'root'
})
export class AppStateService {
  private state: BehaviorSubject<AppStateModel> = new BehaviorSubject<AppStateModel>(defaultState);

  loading$: Observable<boolean>;

  constructor() {
    this.loading$ = this.state.asObservable().pipe(map((data: AppStateModel) => data.loading));
  }

  setLoading(loading: boolean) {
    const data = this.state.getValue();
    this.state.next({ ...data, loading });
  }
}
