import { ActionReducerMap } from '@ngrx/store';
import * as fromStore from './store.reducers';

export interface HttpErrorResponse {
  error: {
    error: string;
    status: number;
    statusText: string;
    url: string;
  };
  headers: any;
  message: string;
  name: string;
  ok: boolean;
  status: number;
  statusText: string;
  url: string;
}

export interface AppState {
  prices: fromStore.IMarketState;
}

export const reducers: ActionReducerMap<AppState> = {
  prices: fromStore.priceReducer,
};
